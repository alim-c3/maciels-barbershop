import { NextRequest, NextResponse } from "next/server";
import { supabase, getServiceClient } from "@/lib/supabase";
import { SERVICES } from "@/lib/data";
import type { BookingFormData } from "@/lib/types";

function sanitize(str: string) {
  return str.replace(/[<>"']/g, "").trim().slice(0, 1000);
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingFormData = await req.json();

    // Validate required fields
    if (
      !body.barberId ||
      !body.serviceId ||
      !body.date ||
      !body.startTime ||
      !body.customerName ||
      !body.customerPhone ||
      !body.customerEmail
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customerEmail)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Validate date is not in the past
    const appointmentDate = new Date(body.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      return NextResponse.json({ error: "Date cannot be in the past." }, { status: 400 });
    }

    // Calculate end time from service duration
    const service = SERVICES.find((s) => s.id === body.serviceId);
    if (!service) {
      return NextResponse.json({ error: "Invalid service." }, { status: 400 });
    }

    const [timeStr, period] = body.startTime.split(" ");
    const [hourStr, minStr] = timeStr.split(":");
    let hour = parseInt(hourStr);
    const min = parseInt(minStr);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const startMinutes = hour * 60 + min;
    const endMinutes = startMinutes + service.durationMinutes;
    const endHour = Math.floor(endMinutes / 60);
    const endMin = endMinutes % 60;
    const endPeriod = endHour >= 12 ? "PM" : "AM";
    const endHour12 = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour;
    const endTime = `${endHour12}:${String(endMin).padStart(2, "0")} ${endPeriod}`;

    // Insert appointment — unique index prevents double-booking at DB level
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        customer_name: sanitize(body.customerName),
        customer_phone: sanitize(body.customerPhone),
        customer_email: sanitize(body.customerEmail),
        barber_id: body.barberId,
        service_id: body.serviceId,
        date: body.date,
        start_time: body.startTime,
        end_time: endTime,
        notes: body.notes ? sanitize(body.notes) : null,
        reminder_opt_in: body.reminderOptIn,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "That time slot is no longer available. Please choose another." },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save booking." }, { status: 500 });
    }

    return NextResponse.json({ success: true, appointmentId: data.id }, { status: 201 });
  } catch (e) {
    console.error("Booking route error:", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin endpoint — protected by service role key check
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  const { searchParams } = new URL(req.url);
  const barber = searchParams.get("barber");
  const date = searchParams.get("date");
  const status = searchParams.get("status");

  let query = supabase
    .from("appointments")
    .select("*")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (barber) query = query.eq("barber_id", barber);
  if (date) query = query.eq("date", date);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ appointments: data });
}

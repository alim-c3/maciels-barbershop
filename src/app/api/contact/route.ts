import { NextRequest, NextResponse } from "next/server";

function sanitize(str: string) {
  return str.replace(/[<>"']/g, "").trim().slice(0, 2000);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    // In production: send email via Resend/Sendgrid or store in Supabase
    console.log("Contact form submission:", {
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : null,
      message: sanitize(message),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";
import { BARBERS, SERVICES } from "@/lib/data";
import type { BookingFormData } from "@/lib/types";

const STEPS = ["Barber", "Service", "Date & Time", "Your Info", "Confirm"];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM",
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < current
                ? "bg-gold text-barber-black"
                : i === current
                ? "bg-gold/20 border-2 border-gold text-gold"
                : "bg-barber-charcoal text-barber-gray border border-zinc-700"
            }`}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-px w-6 sm:w-8 transition-colors ${
                i < current ? "bg-gold" : "bg-zinc-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<BookingFormData>({
    barberId: "",
    serviceId: "",
    date: "",
    startTime: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    notes: "",
    reminderOptIn: false,
  });

  // Pre-select from URL params
  useEffect(() => {
    const barberSlug = searchParams.get("barber");
    const serviceSlug = searchParams.get("service");
    if (barberSlug) {
      const b = BARBERS.find((b) => b.slug === barberSlug);
      if (b) setForm((f) => ({ ...f, barberId: b.id }));
    }
    if (serviceSlug) {
      const s = SERVICES.find((s) => s.slug === serviceSlug);
      if (s) setForm((f) => ({ ...f, serviceId: s.id }));
    }
  }, [searchParams]);

  const selectedBarber = BARBERS.find((b) => b.id === form.barberId);
  const selectedService = SERVICES.find((s) => s.id === form.serviceId);

  function canAdvance() {
    switch (step) {
      case 0: return !!form.barberId;
      case 1: return !!form.serviceId;
      case 2: return !!form.date && !!form.startTime;
      case 3: return !!form.customerName && !!form.customerPhone && !!form.customerEmail;
      default: return true;
    }
  }

  function next() {
    if (canAdvance()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Booking failed");
      }
      setSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
          <Check className="text-green-400" size={28} />
        </div>
        <h2 className="text-gold font-display text-3xl mb-3">You&apos;re booked!</h2>
        <p className="text-zinc-300 mb-2">
          {selectedBarber?.name} · {selectedService?.name}
        </p>
        <p className="text-zinc-300 mb-2">
          {new Date(form.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          at {form.startTime}
        </p>
        <p className="text-barber-gray text-sm mt-4 mb-8">
          We&apos;ll see you at 109 Union Ave, New Rochelle, NY.
          {form.reminderOptIn && " A reminder will be sent to your phone."}
        </p>
        <a
          href="/"
          className="btn-outline"
        >
          Back to Home
        </a>
      </div>
    );
  }

  // Today's date for min
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <StepIndicator current={step} total={STEPS.length} />

      {/* Step label */}
      <p className="text-center text-xs text-barber-gray uppercase tracking-widest mb-6">
        Step {step + 1} of {STEPS.length} — {STEPS[step]}
      </p>

      {/* STEP 0: Choose barber */}
      {step === 0 && (
        <div>
          <h2 className="text-white font-bold text-xl mb-5">Choose Your Barber</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BARBERS.map((barber) => (
              <button
                key={barber.id}
                onClick={() => setForm((f) => ({ ...f, barberId: barber.id }))}
                className={`card p-3 text-left transition-all hover:border-gold/50 ${
                  form.barberId === barber.id
                    ? "border-gold bg-gold/10"
                    : "border-zinc-800"
                }`}
              >
                <div className="relative h-24 rounded overflow-hidden mb-2">
                  <Image
                    src={barber.photo}
                    alt={barber.name}
                    fill
                    className="object-cover object-top"
                  />
                  {form.barberId === barber.id && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                      <Check size={12} className="text-barber-black" />
                    </div>
                  )}
                </div>
                <p className="text-white text-sm font-semibold">{barber.name}</p>
                <p className="text-barber-gray text-xs">{barber.role}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Choose service */}
      {step === 1 && (
        <div>
          <h2 className="text-white font-bold text-xl mb-5">Choose a Service</h2>
          <div className="space-y-3">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => setForm((f) => ({ ...f, serviceId: service.id }))}
                className={`w-full card p-4 text-left flex items-center justify-between transition-all hover:border-gold/50 ${
                  form.serviceId === service.id ? "border-gold bg-gold/10" : "border-zinc-800"
                }`}
              >
                <div>
                  <p className="text-white font-semibold">{service.name}</p>
                  <p className="text-barber-gray text-xs mt-0.5 flex items-center gap-1">
                    <Clock size={11} />
                    {service.durationMinutes} min
                  </p>
                  <p className="text-barber-gray text-xs mt-1">{service.description}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-gold font-bold">from ${service.startingPrice}</p>
                  {form.serviceId === service.id && (
                    <Check size={16} className="text-gold ml-auto mt-1" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Date & Time */}
      {step === 2 && (
        <div>
          <h2 className="text-white font-bold text-xl mb-5">Pick a Date & Time</h2>
          <div className="mb-6">
            <label className="block text-sm text-zinc-300 mb-2">Select Date</label>
            <input
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, startTime: "" }))}
              className="input-field"
            />
          </div>
          {form.date && (
            <div>
              <label className="block text-sm text-zinc-300 mb-3">
                Available Times
                {selectedBarber && (
                  <span className="text-barber-gray ml-1">· {selectedBarber.name}</span>
                )}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setForm((f) => ({ ...f, startTime: slot }))}
                    className={`py-2 px-1 rounded text-sm border transition-colors ${
                      form.startTime === slot
                        ? "border-gold bg-gold text-barber-black font-bold"
                        : "border-zinc-700 text-zinc-300 hover:border-gold/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Customer info */}
      {step === 3 && (
        <div>
          <h2 className="text-white font-bold text-xl mb-5">Your Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.customerName}
                onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                placeholder="Your full name"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1.5">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={form.customerPhone}
                onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
                placeholder="(555) 000-0000"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
                placeholder="you@email.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1.5">
                Special Requests / Notes (optional)
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Preferred style, beard details, running late, photo reference, etc."
                rows={4}
                className="input-field resize-none"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.reminderOptIn}
                onChange={(e) => setForm((f) => ({ ...f, reminderOptIn: e.target.checked }))}
                className="w-4 h-4 accent-[#c9a84c]"
              />
              <span className="text-sm text-zinc-300">
                Send me a reminder before my appointment
              </span>
            </label>
          </div>
        </div>
      )}

      {/* STEP 4: Confirm */}
      {step === 4 && (
        <div>
          <h2 className="text-white font-bold text-xl mb-5">Confirm Your Booking</h2>
          <div className="card p-6 space-y-4 mb-6">
            <Row label="Barber" value={selectedBarber?.name ?? "—"} />
            <Row label="Service" value={`${selectedService?.name} (${selectedService?.durationMinutes} min)`} />
            <Row
              label="Date"
              value={
                form.date
                  ? new Date(form.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"
              }
            />
            <Row label="Time" value={form.startTime} />
            <Row label="Name" value={form.customerName} />
            <Row label="Phone" value={form.customerPhone} />
            <Row label="Email" value={form.customerEmail} />
            {form.notes && <Row label="Notes" value={form.notes} />}
            <div className="pt-2 border-t border-zinc-700">
              <Row
                label="Starting price"
                value={`from $${selectedService?.startingPrice}`}
                highlight
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
          <p className="text-barber-gray text-xs text-center mt-3">
            By confirming, you agree to our{" "}
            <a href="/policies" className="text-gold hover:underline">
              cancellation policy
            </a>
            .
          </p>
        </div>
      )}

      {/* Navigation */}
      {step < 4 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-1 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button
            onClick={next}
            disabled={!canAdvance()}
            className="btn-primary py-2 px-6 flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 3 ? "Review Booking" : "Continue"}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
      {step === 4 && (
        <button
          onClick={prev}
          className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-sm mt-4"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-4 text-sm">
      <span className="text-barber-gray shrink-0">{label}</span>
      <span className={`text-right ${highlight ? "text-gold font-bold" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}

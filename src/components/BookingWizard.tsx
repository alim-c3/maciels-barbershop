"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Clock, Loader2, Star } from "lucide-react";
import { PUBLIC_BARBERS, SERVICES } from "@/lib/data";
import type { BookingFormData } from "@/lib/types";

const STEPS = ["Barber & Service", "Date & Time", "Your Info"];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM",
];

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

  useEffect(() => {
    const barberSlug = searchParams.get("barber");
    const serviceSlug = searchParams.get("service");
    if (barberSlug) {
      const b = PUBLIC_BARBERS.find((b) => b.slug === barberSlug);
      if (b) setForm((f) => ({ ...f, barberId: b.id }));
    }
    if (serviceSlug) {
      const s = SERVICES.find((s) => s.slug === serviceSlug);
      if (s) setForm((f) => ({ ...f, serviceId: s.id }));
    }
  }, [searchParams]);

  const selectedBarber = PUBLIC_BARBERS.find((b) => b.id === form.barberId);
  const selectedService = SERVICES.find((s) => s.id === form.serviceId);

  function canAdvance() {
    switch (step) {
      case 0: return !!form.barberId && !!form.serviceId;
      case 1: return !!form.date && !!form.startTime;
      case 2: return !!form.customerName && !!form.customerPhone && !!form.customerEmail;
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
            weekday: "long", month: "long", day: "numeric",
          })}{" "}at {form.startTime}
        </p>
        <p className="text-barber-gray text-sm mt-4 mb-8">
          We&apos;ll see you at 109 Union Ave, New Rochelle, NY.
          {form.reminderOptIn && " A reminder will be sent to your phone."}
        </p>
        <a href="/" className="btn-outline">Back to Home</a>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col min-h-[60vh]">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 mb-8">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? "bg-gold text-barber-black"
                    : i === step
                    ? "bg-gold/20 border-2 border-gold text-gold"
                    : "bg-barber-charcoal text-barber-gray border border-zinc-700"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs mt-1 hidden sm:block ${i === step ? "text-gold" : "text-zinc-600"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-12 sm:w-16 mx-1 mb-4 transition-colors ${i < step ? "bg-gold" : "bg-zinc-700"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content — grows to fill space */}
      <div className="flex-1">
        {/* STEP 0: Barber + Service */}
        {step === 0 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-white font-bold text-lg mb-4">Choose Your Barber</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PUBLIC_BARBERS.map((barber) => (
                  <button
                    key={barber.id}
                    onClick={() => setForm((f) => ({ ...f, barberId: barber.id }))}
                    className={`card p-3 text-left transition-all hover:border-gold/60 ${
                      form.barberId === barber.id
                        ? "border-gold bg-gold/10"
                        : "border-zinc-800"
                    }`}
                  >
                    <div className="relative h-20 rounded overflow-hidden mb-2">
                      <Image src={barber.photo} alt={barber.name} fill className="object-cover object-top" />
                      {form.barberId === barber.id && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                          <Check size={12} className="text-barber-black" />
                        </div>
                      )}
                    </div>
                    <p className="text-white text-sm font-semibold leading-tight">{barber.name}</p>
                    <p className="text-barber-gray text-xs">{barber.role}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-white font-bold text-lg mb-4">Choose a Service</h2>
              <div className="space-y-2">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setForm((f) => ({ ...f, serviceId: service.id }))}
                    className={`w-full card p-4 text-left flex items-center justify-between transition-all hover:border-gold/60 ${
                      form.serviceId === service.id ? "border-gold bg-gold/10" : "border-zinc-800"
                    }`}
                  >
                    <div>
                      <p className="text-white font-semibold text-sm">{service.name}</p>
                      <p className="text-barber-gray text-xs flex items-center gap-1 mt-0.5">
                        <Clock size={10} />
                        {service.durationMinutes} min
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <p className="text-gold font-bold text-sm">from ${service.startingPrice}</p>
                      {form.serviceId === service.id && (
                        <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                          <Check size={12} className="text-barber-black" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Date & Time */}
        {step === 1 && (
          <div>
            <h2 className="text-white font-bold text-lg mb-5">Pick a Date & Time</h2>
            {selectedBarber && selectedService && (
              <div className="flex items-center gap-3 bg-barber-dark rounded-lg px-4 py-3 mb-6 border border-zinc-800">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image src={selectedBarber.photo} alt={selectedBarber.name} fill className="object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{selectedBarber.name}</p>
                  <p className="text-barber-gray text-xs">{selectedService.name} · {selectedService.durationMinutes} min</p>
                </div>
                <button onClick={() => setStep(0)} className="text-gold text-xs hover:underline shrink-0">
                  Change
                </button>
              </div>
            )}
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
                <label className="block text-sm text-zinc-300 mb-3">Available Times</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setForm((f) => ({ ...f, startTime: slot }))}
                      className={`py-2.5 px-1 rounded-lg text-sm border font-medium transition-colors ${
                        form.startTime === slot
                          ? "border-gold bg-gold text-barber-black"
                          : "border-zinc-700 text-zinc-300 hover:border-gold/50 hover:text-white"
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

        {/* STEP 2: Info + Confirm */}
        {step === 2 && (
          <div>
            <h2 className="text-white font-bold text-lg mb-5">Your Information</h2>

            {/* Booking summary */}
            <div className="bg-barber-dark rounded-xl border border-zinc-800 p-4 mb-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-zinc-500 text-xs mb-0.5">Barber</p>
                <p className="text-white font-semibold">{selectedBarber?.name}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs mb-0.5">Service</p>
                <p className="text-white font-semibold">{selectedService?.name}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs mb-0.5">Date</p>
                <p className="text-white font-semibold">
                  {form.date
                    ? new Date(form.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs mb-0.5">Time</p>
                <p className="text-white font-semibold">{form.startTime || "—"}</p>
              </div>
            </div>

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
                <label className="block text-sm text-zinc-300 mb-1.5">Notes (optional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Style reference, beard details, etc."
                  rows={3}
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
                <span className="text-sm text-zinc-300">Send me a reminder</span>
              </label>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded mt-4">
                {error}
              </div>
            )}

            <div className="flex items-center gap-2 mt-4 p-3 bg-barber-dark rounded-lg border border-zinc-800">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-zinc-400 text-xs">4.9 · 47 Google reviews · No credit card needed</p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom nav — always visible */}
      <div className="sticky bottom-0 bg-barber-black border-t border-zinc-800 pt-4 mt-6 -mx-4 px-4 pb-4 sm:-mx-6 sm:px-6">
        {step < STEPS.length - 1 ? (
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-1 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium py-2 px-3"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <button
              onClick={next}
              disabled={!canAdvance()}
              className={`flex-1 max-w-xs ml-auto flex items-center justify-center gap-1 font-bold py-3 px-6 rounded-lg text-sm transition-all ${
                canAdvance()
                  ? "bg-gold text-barber-black hover:bg-gold-light"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
            >
              Continue
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prev}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-sm font-medium py-2 px-3"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !canAdvance()}
              className={`flex-1 max-w-xs ml-auto flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg text-sm transition-all ${
                canAdvance() && !submitting
                  ? "bg-gold text-barber-black hover:bg-gold-light"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
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
          </div>
        )}
        <p className="text-zinc-600 text-xs text-center mt-2">
          Free to book · Cancel anytime ·{" "}
          <a href="/policies" className="text-zinc-500 hover:text-gold">Cancellation policy</a>
        </p>
      </div>
    </div>
  );
}

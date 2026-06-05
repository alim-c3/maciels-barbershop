"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center border-green-800">
        <div className="text-green-400 text-4xl mb-3">✓</div>
        <h3 className="text-white font-bold text-lg mb-2">Message Sent!</h3>
        <p className="text-barber-gray text-sm">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-zinc-300 mb-1.5">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-zinc-300 mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm text-zinc-300 mb-1.5">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(555) 000-0000"
          className="input-field"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-zinc-300 mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className="input-field resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">
          Something went wrong. Please try calling us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Cancellation, no-show, and late arrival policies at Maciel's Barber Shop. Privacy policy and terms of use.",
};

export default function PoliciesPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-4">
          Policies
        </h1>
        <p className="text-zinc-300 max-w-xl mx-auto px-4">
          Straightforward policies that respect your time and ours.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {[
          {
            title: "Cancellation Policy",
            body: `We ask for at least 2 hours notice if you need to cancel or reschedule your appointment. This allows us to offer your slot to another client.\n\nCancellations made less than 2 hours before the appointment may result in a cancellation fee for future bookings. Repeated last-minute cancellations may limit your ability to book in advance.`,
          },
          {
            title: "No-Show Policy",
            body: `Clients who do not show up for their appointment without notice will be marked as no-shows. After two no-shows, advance booking may be restricted.\n\nIf something comes up, please call us as soon as possible — we understand life happens and we&apos;ll always try to work with you.`,
          },
          {
            title: "Late Arrival Policy",
            body: `If you arrive more than 10 minutes late for your appointment, we may need to shorten your service or reschedule to avoid delays for other clients.\n\nIf you know you'll be running late, give us a call and we&apos;ll do our best to accommodate you.`,
          },
          {
            title: "Privacy Policy",
            body: `Maciel&apos;s Barber Shop collects your name, phone number, and email address to process and confirm appointments. This information is never sold or shared with third parties.\n\nWe may use your contact information to send appointment reminders and, if you opt in, occasional updates about the shop. You can opt out at any time by contacting us.`,
          },
          {
            title: "Terms of Use",
            body: `By using this website and booking system, you agree to provide accurate information when making an appointment. Misuse of the booking system — including intentional duplicate bookings or abuse of the request field — may result in restricted access.\n\nThis website is operated by Maciel&apos;s Barber Shop. Content may not be reproduced without written permission.`,
          },
        ].map(({ title, body }) => (
          <section key={title}>
            <h2 className="text-gold text-xl font-bold mb-4 pb-2 border-b border-zinc-800">
              {title}
            </h2>
            <div className="text-barber-gray text-sm leading-relaxed space-y-3">
              {body.split("\n\n").map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </section>
        ))}

        <div className="pt-6 text-center">
          <p className="text-barber-gray text-sm mb-6">
            Questions about our policies? We&apos;re happy to clarify.
          </p>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

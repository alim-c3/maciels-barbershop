import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Maciel's Barber Shop — bookings, walk-ins, barbers, payment, and more.",
};

const FAQS = [
  {
    q: "Do I need an appointment?",
    a: "Walk-ins are always welcome when chairs are available. For guaranteed availability with your preferred barber, we recommend booking online — it takes less than 60 seconds.",
  },
  {
    q: "Can I book a same-day appointment?",
    a: "Yes! Our online booking system shows real-time availability. If a barber has a slot open today, you can book it right now.",
  },
  {
    q: "What if I'm running late?",
    a: "Please give us a call if you're going to be more than 10 minutes late. We'll do our best to accommodate you, but slots may need to be adjusted depending on the day.",
  },
  {
    q: "Can I request a specific barber?",
    a: "Absolutely. During booking, you choose your barber first. Each barber's real-time availability is shown so you can pick the time that works best for both of you.",
  },
  {
    q: "What services do you offer?",
    a: "We offer Haircuts, Beard Trims, Hot Towel Shaves, Kids Cuts, Lineups, and our popular Cut + Beard combo. See all services and pricing on our Services page.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes. Walk-ins are always welcome. We serve clients in order of arrival when chairs are open. During peak hours (Friday evenings, Saturday mornings), wait times may be longer.",
  },
  {
    q: "What forms of payment do you accept?",
    a: "We accept cash, all major credit/debit cards, and mobile payments (Apple Pay, Google Pay).",
  },
  {
    q: "Do you cut kids' hair?",
    a: "Yes! We have a Kids Cut service (12 and under) with barbers who are patient and experienced with younger clients.",
  },
  {
    q: "Can I leave a note about my haircut?",
    a: "Yes — the booking form includes an optional notes field where you can describe your preferred style, reference a photo, note timing constraints, or add any other special requests.",
  },
  {
    q: "How do I cancel or reschedule?",
    a: "Please call us at (914) 000-0000 or email us as soon as possible. We ask for at least 2 hours notice to cancel or reschedule so we can accommodate other clients.",
  },
];

export default function FAQPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-300 max-w-xl mx-auto px-4">
          Everything you need to know before your first visit or next booking.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FAQAccordion faqs={FAQS} />

        <div className="mt-12 text-center bg-barber-dark rounded-lg border border-zinc-800 py-12 px-6">
          <h3 className="text-gold font-display text-2xl mb-3">Still have questions?</h3>
          <p className="text-barber-gray mb-6 text-sm">
            Give us a call or send a message — we&apos;re happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
            <Link href="/book" className="btn-primary">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

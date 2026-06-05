import type { Metadata } from "next";
import BookingWizard from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your appointment at Maciel's Barber Shop in New Rochelle, NY. Choose your barber, service, date, and time — online 24/7.",
};

export default function BookPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-12 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-3">
          Book Your Appointment
        </h1>
        <p className="text-zinc-300 max-w-md mx-auto px-4 text-sm">
          Pick your barber, choose your service, and lock in your time — all in under a minute.
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BookingWizard />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock, Mail, Instagram } from "lucide-react";
import { SHOP, HOURS } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Maciel's Barber Shop at 109 Union Ave, New Rochelle, NY 10801. Call, email, or send a message online.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-4">
          Find Us
        </h1>
        <p className="text-zinc-300 max-w-xl mx-auto px-4">
          Stop by, call, or send us a message. We&apos;re here to help.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <div className="space-y-8 mb-10">
            <div className="flex gap-4">
              <MapPin className="text-gold shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-semibold mb-1">Address</p>
                <p className="text-barber-gray">{SHOP.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SHOP.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold text-sm hover:text-gold-light transition-colors mt-1 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-gold shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-semibold mb-1">Phone</p>
                <a
                  href={`tel:${SHOP.phone}`}
                  className="text-barber-gray hover:text-gold transition-colors"
                >
                  {SHOP.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="text-gold shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-semibold mb-1">Email</p>
                <a
                  href={`mailto:${SHOP.email}`}
                  className="text-barber-gray hover:text-gold transition-colors"
                >
                  {SHOP.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Instagram className="text-gold shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-semibold mb-1">Instagram</p>
                <a
                  href={SHOP.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-barber-gray hover:text-gold transition-colors"
                >
                  @macielsbarbershop
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-gold" size={18} />
              <h3 className="text-white font-bold">Hours</h3>
            </div>
            <ul className="space-y-2">
              {HOURS.map(({ day, hours }) => (
                <li key={day} className="flex justify-between text-sm">
                  <span className="text-barber-gray">{day}</span>
                  <span className={hours === "Closed" ? "text-red-400" : "text-white"}>
                    {hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <Link href="/book" className="btn-primary block text-center">
              Book an Appointment
            </Link>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-gold font-display text-2xl mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>

      {/* Map placeholder */}
      <div className="w-full h-72 bg-barber-charcoal border-t border-zinc-800 flex items-center justify-center">
        <div className="text-center text-barber-gray">
          <MapPin className="mx-auto mb-2 text-gold" size={32} />
          <p className="text-sm">109 Union Ave, New Rochelle, NY 10801</p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(SHOP.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold text-sm hover:text-gold-light transition-colors mt-2 inline-block"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}

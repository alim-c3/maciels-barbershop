import Link from "next/link";
import { Scissors, Instagram, MapPin, Phone, Clock } from "lucide-react";
import { SHOP, HOURS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-barber-dark border-t border-zinc-800 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Scissors className="text-gold w-5 h-5" />
            <span className="font-display text-gold text-lg tracking-widest font-bold uppercase">
              Maciel&apos;s
            </span>
          </div>
          <p className="text-barber-gray text-sm leading-relaxed mb-4">
            Premium barbershop in New Rochelle, NY. Sharp cuts, classic craft.
          </p>
          <a
            href={SHOP.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-barber-gray hover:text-gold transition-colors text-sm"
          >
            <Instagram size={16} />
            Follow on Instagram
          </a>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-barber-gray">
            {[
              { href: "/book", label: "Book Appointment" },
              { href: "/services", label: "Services" },
              { href: "/barbers", label: "Our Barbers" },
              { href: "/gallery", label: "Gallery" },
              { href: "/blog", label: "Blog" },
              { href: "/faq", label: "FAQ" },
              { href: "/policies", label: "Policies" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4">
            Hours
          </h3>
          <ul className="space-y-1 text-sm">
            {HOURS.map(({ day, hours }) => (
              <li key={day} className="flex justify-between gap-4">
                <span className="text-barber-gray">{day}</span>
                <span className={hours === "Closed" ? "text-red-400" : "text-white"}>
                  {hours}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-barber-gray">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              <span>{SHOP.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold shrink-0" />
              <a href={`tel:${SHOP.phone}`} className="hover:text-gold transition-colors">
                {SHOP.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-gold shrink-0" />
              <span>Mon–Sat 9am–7pm</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link href="/book" className="btn-primary text-sm py-2 px-5 block text-center">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 text-center py-4 text-barber-gray text-xs">
        © {new Date().getFullYear()} Maciel&apos;s Barber Shop. All rights reserved.
        &nbsp;·&nbsp;
        <Link href="/policies" className="hover:text-gold transition-colors">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

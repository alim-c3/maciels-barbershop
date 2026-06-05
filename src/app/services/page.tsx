import type { Metadata } from "next";
import Link from "next/link";
import { Clock, DollarSign } from "lucide-react";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore all services at Maciel's Barber Shop — haircuts, fades, beard trims, hot towel shaves, kids cuts, and more in New Rochelle, NY.",
};

const CATEGORY_LABELS: Record<string, string> = {
  cut: "Haircuts",
  shave: "Shaves",
  combo: "Combos",
  beard: "Beard Services",
};

export default function ServicesPage() {
  const categories = [...new Set(SERVICES.map((s) => s.category))];

  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      {/* Header */}
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-4">
          Our Services
        </h1>
        <p className="text-zinc-300 max-w-xl mx-auto px-4">
          Every service is delivered with precision by one of our six skilled barbers.
          Walk in or book ahead — same quality either way.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((cat) => (
          <div key={cat} className="mb-14">
            <h2 className="text-gold text-xl font-bold tracking-widest uppercase mb-6 pb-2 border-b border-zinc-800">
              {CATEGORY_LABELS[cat] ?? cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SERVICES.filter((s) => s.category === cat).map((service) => (
                <div
                  key={service.id}
                  className="card p-6 border-l-2 border-l-gold hover:bg-barber-charcoal transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg">{service.name}</h3>
                    <span className="text-gold font-bold text-xl whitespace-nowrap ml-4">
                      from ${service.startingPrice}
                    </span>
                  </div>
                  <p className="text-barber-gray text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-barber-gray text-xs">
                      <Clock size={13} />
                      <span>{service.durationMinutes} min</span>
                    </div>
                    <Link
                      href={`/book?service=${service.slug}`}
                      className="text-gold text-sm font-semibold hover:text-gold-light transition-colors"
                    >
                      Book This →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center mt-8 py-12 bg-barber-dark rounded-lg border border-zinc-800">
          <h3 className="text-gold font-display text-2xl mb-3">Ready to book?</h3>
          <p className="text-barber-gray mb-6 text-sm">
            Choose your barber, pick your service, select your time.
          </p>
          <Link href="/book" className="btn-primary">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { PUBLIC_BARBERS as BARBERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Barbers",
  description:
    "Meet the six expert barbers at Maciel's Barber Shop in New Rochelle, NY. Book directly with your preferred barber online.",
};

export default function BarbersPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-4">
          Meet the Team
        </h1>
        <p className="text-zinc-300 max-w-xl mx-auto px-4">
          Six skilled barbers, one standard. Book directly with whoever fits your style.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BARBERS.map((barber) => (
            <div key={barber.id} className="card group overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={barber.photo}
                  alt={barber.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-barber-black/80 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <h2 className="text-white font-display text-2xl">{barber.name}</h2>
                  <p className="text-gold text-sm">{barber.role}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-barber-gray text-sm leading-relaxed mb-4">{barber.bio}</p>
                <div className="mb-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-1.5">
                    {barber.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-barber-charcoal text-zinc-300 px-2 py-0.5 rounded border border-zinc-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {barber.instagramUrl && (
                  <a
                    href={barber.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-barber-gray text-xs hover:text-gold transition-colors mb-4"
                  >
                    <Instagram size={13} />
                    Instagram
                  </a>
                )}
                <Link
                  href={`/book?barber=${barber.slug}`}
                  className="btn-primary block text-center text-sm"
                >
                  Book with {barber.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

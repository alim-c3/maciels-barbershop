import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BARBERS, SHOP } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Maciel's Barber Shop — a premium barbershop serving New Rochelle, NY with six skilled barbers and a commitment to craft.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1920&q=80"
          alt="Maciel's Barber Shop interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl md:text-6xl text-gold tracking-wide mb-3">
            Our Story
          </h1>
          <p className="text-zinc-300 text-lg max-w-lg">
            Rooted in New Rochelle. Built on craft.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main story */}
        <div className="prose prose-invert max-w-none mb-16">
          <p className="text-zinc-300 text-lg leading-relaxed mb-6">
            Maciel&apos;s Barber Shop was built on a simple idea: every person who sits
            in our chair should leave feeling their best. No shortcuts. No rushing.
            Just clean work, every time.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Located at 109 Union Ave in the heart of New Rochelle, NY, Maciel&apos;s
            has become a neighborhood staple. We&apos;re a shop where you know the
            barbers, where your barber knows your cut, and where the atmosphere
            feels like it&apos;s made for you.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Six skilled barbers. Three essential services. One standard of excellence.
            Whether you&apos;re in for a quick lineup or the full cut-and-beard package,
            you get the same attention to detail every visit.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Walk-ins are always welcome, and online booking is available 24/7 so
            you can lock in your favorite barber anytime.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Precision",
              body: "Every line, every edge, every fade — executed with care.",
            },
            {
              title: "Community",
              body: "New Rochelle is home. We take pride in serving our neighbors.",
            },
            {
              title: "Craft",
              body: "Old-school technique meets modern style. Always evolving.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="card p-6 text-center border-t-2 border-t-gold"
            >
              <h3 className="text-gold font-display text-xl mb-3">{title}</h3>
              <p className="text-barber-gray text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Team overview */}
        <h2 className="section-heading">The Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-12">
          {BARBERS.map((barber) => (
            <div key={barber.id} className="text-center">
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-3 border-2 border-gold">
                <Image
                  src={barber.photo}
                  alt={barber.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <p className="text-white font-semibold text-sm">{barber.name}</p>
              <p className="text-barber-gray text-xs">{barber.role}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/barbers" className="btn-outline mr-4">
            Meet the Team
          </Link>
          <Link href="/book" className="btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

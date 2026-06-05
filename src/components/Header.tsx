"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Scissors, Phone, MapPin } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/barbers", label: "Barbers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar — hides on scroll */}
      <div
        className={`bg-barber-dark border-b border-zinc-800 transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs text-barber-gray">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-gold shrink-0" />
              109 Union Ave, New Rochelle, NY 10801
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone size={11} className="text-gold shrink-0" />
              (914) 000-0000
            </span>
          </div>
          <span className="hidden md:block text-gold font-medium">
            Mon–Sat · Open Now
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-barber-black/95 backdrop-blur-sm shadow-lg border-b border-zinc-800"
            : "bg-barber-black/80 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Scissors className="text-gold w-4 h-4" />
            <span className="font-display text-base text-gold tracking-widest font-bold uppercase">
              Maciel&apos;s
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-xs text-zinc-300 hover:text-gold transition-colors tracking-wider uppercase font-medium"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Book CTA */}
          <div className="hidden lg:block">
            <Link href="/book" className="btn-primary text-sm py-2 px-5">
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-barber-dark border-t border-zinc-800 shadow-xl">
          <ul className="flex flex-col py-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-6 py-3 text-zinc-300 hover:text-gold hover:bg-barber-charcoal transition-colors text-sm tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="px-6 pt-3 pb-2">
              <Link
                href="/book"
                className="btn-primary block text-center"
                onClick={() => setOpen(false)}
              >
                Book Now
              </Link>
            </li>
            <li className="px-6 pt-2 pb-1 text-xs text-barber-gray flex items-center gap-1">
              <Phone size={10} className="text-gold" />
              (914) 000-0000
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

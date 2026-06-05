"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Scissors } from "lucide-react";

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-barber-dark border-b border-zinc-800 text-sm text-barber-gray py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>109 Union Ave, New Rochelle, NY 10801 &nbsp;·&nbsp; (914) 000-0000</span>
          <span className="text-gold">Book online 24/7 · Mon–Sat 9am–7pm</span>
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-barber-black/95 backdrop-blur border-b border-zinc-800 shadow-lg"
            : "bg-transparent"
        }`}
        style={{ top: 0 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Scissors className="text-gold w-5 h-5" />
            <span className="font-display text-lg text-gold tracking-widest font-bold uppercase">
              Maciel&apos;s
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-zinc-300 hover:text-gold transition-colors tracking-wide"
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
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden bg-barber-dark border-t border-zinc-800">
            <ul className="flex flex-col py-4">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-6 py-3 text-zinc-300 hover:text-gold hover:bg-barber-charcoal transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="px-6 pt-4">
                <Link href="/book" className="btn-primary block text-center" onClick={() => setOpen(false)}>
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

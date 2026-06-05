"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyBookingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-barber-black/95 backdrop-blur border-t border-zinc-800 px-4 py-3">
      <Link href="/book" className="btn-primary block text-center w-full">
        Book Appointment
      </Link>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  q: string;
  a: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="card border border-zinc-800 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-barber-charcoal transition-colors"
            aria-expanded={open === i}
          >
            <span className="text-white font-medium text-sm">{faq.q}</span>
            <ChevronDown
              size={18}
              className={`text-gold shrink-0 transition-transform ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-barber-gray text-sm leading-relaxed border-t border-zinc-800">
              <div className="pt-4">{faq.a}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

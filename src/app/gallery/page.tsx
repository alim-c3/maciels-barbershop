import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_IMAGES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See the work — haircut results, barber portraits, and shop vibes from Maciel's Barber Shop in New Rochelle, NY.",
};

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  haircut: "Haircuts",
  barber: "Barbers",
  interior: "Shop",
  detail: "Details",
  before_after: "Before & After",
};

export default function GalleryPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-4">
          The Work
        </h1>
        <p className="text-zinc-300 max-w-xl mx-auto px-4">
          Real cuts. Real clients. Real craft.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={img.imageUrl}
                alt={img.altText}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-sm font-semibold bg-black/60 px-3 py-1.5 rounded">
                  {CATEGORY_LABELS[img.category] ?? img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-barber-gray mb-6 text-sm">
            Like what you see? Book your appointment today.
          </p>
          <Link href="/book" className="btn-primary">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

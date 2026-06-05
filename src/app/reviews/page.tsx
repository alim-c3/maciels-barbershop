import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { REVIEWS, SHOP, BARBERS } from "@/lib/data";
import StarRating from "@/components/StarRating";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read real reviews from Maciel's Barber Shop clients. 5.0 stars from 21 reviews on Booksy.",
};

export default function ReviewsPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={32} className="text-gold fill-gold" />
          ))}
        </div>
        <p className="text-6xl font-bold text-white mb-2">{SHOP.rating}</p>
        <p className="text-barber-gray">{SHOP.reviewCount} reviews · Booksy</p>
        <h1 className="font-display text-4xl text-gold tracking-wide mt-6">
          What Clients Say
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => {
            const barber = review.barberId
              ? BARBERS.find((b) => b.id === review.barberId)
              : null;

            return (
              <div key={review.id} className="card p-6 border-l-2 border-l-gold">
                <StarRating rating={review.rating} />
                <p className="text-zinc-300 text-sm mt-4 mb-5 leading-relaxed italic">
                  &ldquo;{review.body}&rdquo;
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-white font-semibold">{review.reviewerName}</p>
                    <p className="text-barber-gray text-xs mt-0.5">
                      {review.source && <span>{review.source} · </span>}
                      {review.publishedAt}
                    </p>
                  </div>
                  {barber && (
                    <span className="text-xs bg-barber-charcoal text-gold border border-zinc-700 px-2 py-0.5 rounded">
                      {barber.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-barber-dark rounded-lg border border-zinc-800 py-12 px-6">
          <h3 className="text-gold font-display text-2xl mb-3">
            Ready to join the 5-star experience?
          </h3>
          <p className="text-barber-gray mb-6 text-sm">
            Book online in 60 seconds. Walk-ins also welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary">
              Book Now
            </Link>
            <a
              href={SHOP.booksy}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              See All Reviews on Booksy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

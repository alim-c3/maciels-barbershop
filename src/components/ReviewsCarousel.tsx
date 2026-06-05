"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { REVIEWS, SHOP } from "@/lib/data";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const initials = review.reviewerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = ["bg-blue-600", "bg-green-600", "bg-purple-600", "bg-orange-500", "bg-red-600", "bg-teal-600", "bg-pink-600", "bg-indigo-600"];
  const colorIndex = review.reviewerName.charCodeAt(0) % colors.length;

  return (
    <div className="flex-shrink-0 w-72 bg-barber-dark border border-zinc-800 rounded-xl p-5 mx-2">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
            {initials}
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">{review.reviewerName}</p>
            <p className="text-zinc-500 text-xs">Local Guide</p>
          </div>
        </div>
        <GoogleIcon />
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed line-clamp-4">
        &ldquo;{review.body}&rdquo;
      </p>
      <p className="text-zinc-600 text-xs mt-3">
        {new Date(review.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
    </div>
  );
}

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);

  // Duplicate reviews for seamless loop
  const allReviews = [...REVIEWS, ...REVIEWS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 304; // w-72 + mx-2*2
    const totalWidth = REVIEWS.length * cardWidth;
    let speed = 0.5;

    function tick() {
      posRef.current += speed;
      if (posRef.current >= totalWidth) posRef.current = 0;
      if (track) track.style.transform = `translateX(-${posRef.current}px)`;
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);

    // Pause on hover
    const pause = () => { speed = 0; };
    const resume = () => { speed = 0.5; };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animRef.current);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <div className="py-14 bg-barber-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GoogleIcon />
                <span className="text-white font-semibold text-sm">Google Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{SHOP.rating}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-zinc-400 text-sm">({SHOP.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/place/Maciel's+Barber+Shop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold text-sm hover:underline font-medium"
          >
            Write a review →
          </a>
        </div>
      </div>

      {/* Scrolling track */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex will-change-transform">
          {allReviews.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

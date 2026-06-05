import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-gold fill-gold" : "text-zinc-600"}
        />
      ))}
    </div>
  );
}

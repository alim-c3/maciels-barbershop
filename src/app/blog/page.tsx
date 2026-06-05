import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Grooming tips, style guides, and barbershop culture from the barbers at Maciel's in New Rochelle, NY.",
};

export default function BlogPage() {
  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      <div className="bg-barber-dark py-16 text-center border-b border-zinc-800">
        <h1 className="font-display text-4xl md:text-5xl text-gold tracking-wide mb-4">
          From the Chair
        </h1>
        <p className="text-zinc-300 max-w-xl mx-auto px-4">
          Style guides, grooming tips, and everything men&apos;s hair — straight from
          the barbers at Maciel&apos;s.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card group overflow-hidden hover:border-gold/40 transition-colors">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3 text-xs text-barber-gray">
                  <span className="text-gold uppercase tracking-widest font-semibold">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>By {post.author}</span>
                  <span>·</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-white font-bold text-lg mb-2 group-hover:text-gold transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-barber-gray text-sm leading-relaxed">{post.excerpt}</p>
                <span className="inline-block mt-4 text-gold text-sm font-semibold group-hover:text-gold-light transition-colors">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

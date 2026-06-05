import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-24 min-h-screen bg-barber-black">
      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 max-w-4xl mx-auto">
          <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">
            {post.category}
          </span>
          <h1 className="text-white font-display text-3xl md:text-4xl leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 text-barber-gray text-sm mb-8 border-b border-zinc-800 pb-6">
          <span>By {post.author}</span>
          <span>·</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Body */}
        <div className="prose prose-invert max-w-none">
          {post.body.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="text-gold font-display text-2xl mt-10 mb-4">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-zinc-300 leading-relaxed mb-5 text-[1.05rem]">
                {block}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-barber-dark rounded-lg border border-zinc-800 p-8 text-center">
          <h3 className="text-gold font-display text-2xl mb-2">Ready for a fresh cut?</h3>
          <p className="text-barber-gray text-sm mb-6">
            Book online with one of Maciel&apos;s six expert barbers.
          </p>
          <Link href="/book" className="btn-primary">
            Book Appointment
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="text-zinc-400 text-xs uppercase tracking-widest mb-6">
              More from the Chair
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card group overflow-hidden">
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={p.featuredImage}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-white text-sm font-semibold group-hover:text-gold transition-colors leading-snug">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/blog" className="text-gold text-sm hover:text-gold-light transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

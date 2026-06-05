import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Star, Clock, ChevronRight } from "lucide-react";
import { BARBERS, SERVICES, REVIEWS, GALLERY_IMAGES, BLOG_POSTS, SHOP, HOURS } from "@/lib/data";
import StarRating from "@/components/StarRating";

export default function HomePage() {
  const featuredReviews = REVIEWS.slice(0, 3);
  const featuredBarbers = BARBERS.slice(0, 3);
  const featuredPosts = BLOG_POSTS.slice(0, 3);
  const galleryPreview = GALLERY_IMAGES.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?w=1920&q=80"
            alt="Maciel's Barber Shop"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 px-4 max-w-4xl mx-auto pt-24">
          {/* Rating badge */}
          <div className="inline-flex items-center gap-2 bg-barber-dark/80 border border-zinc-700 rounded-full px-4 py-1.5 mb-8">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="text-sm text-white font-semibold">{SHOP.rating}</span>
            <span className="text-sm text-barber-gray">({SHOP.reviewCount} reviews on Booksy)</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-wide mb-4 leading-tight">
            Maciel&apos;s<br />
            <span className="text-gold">Barber Shop</span>
          </h1>
          <p className="text-xl text-zinc-300 mb-10 max-w-xl mx-auto">
            Premium cuts. Classic craft. New Rochelle&apos;s finest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn-primary text-lg">
              Book Appointment
            </Link>
            <Link href="/services" className="btn-outline text-lg">
              View Services
            </Link>
          </div>
          <p className="mt-6 text-barber-gray text-sm">
            <MapPin size={14} className="inline mr-1" />
            109 Union Ave, New Rochelle, NY 10801
          </p>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-zinc-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT STRIP */}
      <div className="bg-gold text-barber-black text-center py-3 text-sm font-bold tracking-wide">
        Walk-ins welcome · Book online 24/7 · 6 expert barbers
      </div>

      {/* SERVICES */}
      <section className="py-20 bg-barber-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="card border-t-2 border-t-gold p-6 hover:-translate-y-1 transition-transform"
              >
                <h3 className="text-gold font-display text-xl mb-2">{service.name}</h3>
                <p className="text-barber-gray text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-xl">
                      from ${service.startingPrice}
                    </span>
                    <span className="text-barber-gray text-xs ml-2">
                      · {service.durationMinutes} min
                    </span>
                  </div>
                  <Link href="/book" className="text-gold text-sm hover:text-gold-light transition-colors font-semibold">
                    Book →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* BARBERS */}
      <section className="py-20 bg-barber-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">Meet the Barbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBarbers.map((barber) => (
              <div key={barber.id} className="card group overflow-hidden">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={barber.photo}
                    alt={barber.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-gold font-display text-xl">{barber.name}</h3>
                  <p className="text-barber-gray text-sm mb-3">{barber.role}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {barber.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-barber-charcoal text-zinc-300 px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/book?barber=${barber.slug}`}
                    className="btn-primary text-sm py-2 block text-center"
                  >
                    Book with {barber.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/barbers" className="btn-outline">
              Meet All 6 Barbers
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 bg-barber-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Aggregate */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={28} className="text-gold fill-gold" />
              ))}
            </div>
            <p className="text-5xl font-bold text-white mb-1">{SHOP.rating}</p>
            <p className="text-barber-gray">{SHOP.reviewCount} reviews on Booksy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review) => (
              <div key={review.id} className="card p-6 border-l-2 border-l-gold">
                <StarRating rating={review.rating} />
                <p className="text-zinc-300 text-sm mt-4 mb-5 leading-relaxed italic">
                  &ldquo;{review.body}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{review.reviewerName}</p>
                    {review.source && (
                      <p className="text-barber-gray text-xs">{review.source}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reviews" className="btn-outline">
              Read All Reviews
            </Link>
            <Link href="/book" className="btn-primary">
              Book Your Cut
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="py-20 bg-barber-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">The Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryPreview.map((img) => (
              <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg group">
                <Image
                  src={img.imageUrl}
                  alt={img.altText}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn-outline">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-20 bg-barber-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-heading">New Rochelle&apos;s Barbershop</h2>
          <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Maciel&apos;s has been serving the New Rochelle community with precision,
            pride, and craft. Six skilled barbers. Three core services. One standard —
            leave looking and feeling your best, every time.
          </p>
          <Link href="/about" className="btn-outline">
            Our Story
          </Link>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 bg-barber-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading">From the Chair</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs text-gold uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-white font-semibold mt-2 mb-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-barber-gray text-sm">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="btn-outline">
              All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="py-16 bg-barber-charcoal border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <MapPin className="text-gold" size={28} />
            <p className="text-white font-semibold">Find Us</p>
            <p className="text-barber-gray text-sm">{SHOP.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(SHOP.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm hover:text-gold-light transition-colors"
            >
              Get Directions →
            </a>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Phone className="text-gold" size={28} />
            <p className="text-white font-semibold">Call Us</p>
            <a
              href={`tel:${SHOP.phone}`}
              className="text-barber-gray text-sm hover:text-gold transition-colors"
            >
              {SHOP.phone}
            </a>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Clock className="text-gold" size={28} />
            <p className="text-white font-semibold">Hours</p>
            <div className="text-sm text-barber-gray space-y-1">
              <p>Mon–Fri: 9am – 7pm</p>
              <p>Saturday: 8am – 6pm</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

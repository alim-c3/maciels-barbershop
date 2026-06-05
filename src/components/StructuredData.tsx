import { SHOP } from "@/lib/data";

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: SHOP.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "109 Union Ave",
      addressLocality: "New Rochelle",
      addressRegion: "NY",
      postalCode: "10801",
      addressCountry: "US",
    },
    telephone: SHOP.phone,
    email: SHOP.email,
    url: "https://macielsbarbershop.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SHOP.rating,
      reviewCount: SHOP.reviewCount,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    servesCuisine: undefined,
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(SHOP.address)}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

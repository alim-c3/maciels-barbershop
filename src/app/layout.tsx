import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBookingCTA from "@/components/StickyBookingCTA";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: {
    default: "Maciel's Barber Shop | New Rochelle, NY",
    template: "%s | Maciel's Barber Shop",
  },
  description:
    "Premium barbershop in New Rochelle, NY. Book online with 6 expert barbers. Haircuts, fades, beard trims, and hot towel shaves. 5.0 stars on Booksy.",
  keywords: [
    "barbershop New Rochelle",
    "barber New Rochelle NY",
    "haircut New Rochelle",
    "fade New Rochelle",
    "beard trim New Rochelle",
    "Maciel's Barber Shop",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://macielsbarbershop.com",
    siteName: "Maciel's Barber Shop",
    title: "Maciel's Barber Shop | New Rochelle, NY",
    description: "Premium barbershop in New Rochelle. Book online 24/7.",
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyBookingCTA />
      </body>
    </html>
  );
}

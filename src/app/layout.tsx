import type { Metadata } from "next";
import {
  Playfair_Display,
  Great_Vibes,
  Lora,
  Noto_Serif_Devanagari,
  Poppins,
  Montserrat,
  Bodoni_Moda,
} from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://marriage-invitation-flame.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "💍 Deepak ❤️ Chandani | Wedding Invitation",
    template: "%s | Deepak & Chandani Wedding",
  },

  description:
    "You and your family are cordially invited to celebrate our wedding and bless us on our special day.",

  keywords: [
    "Deepak Chandani Wedding",
    "Deepak Weds Chandani",
    "Wedding Invitation",
    "Indian Wedding Invitation",
    "Digital Wedding Card",
    "Online Wedding Invitation",
    "Wedding Ceremony",
    "Marriage Invitation",
    "Deepak Kumar Wedding",
    "Chandani Wedding",
    "Deepak Chandani Vivah",
    "Palamu Wedding",
    "Jharkhand Wedding",
    "शुभ विवाह निमंत्रण",
    "विवाह समारोह",
    "दीपक चांदनी विवाह",
    "ऑनलाइन विवाह निमंत्रण",
    "भारतीय विवाह",
    "दीपक वेड्स चांदनी",
    "विवाह निमंत्रण पत्र",
  ],

  authors: [{ name: "Er. Deepak Kumar & Chandani Bhardwaj" }],

  creator: "Er. Deepak Kumar",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      "en-IN": siteUrl,
      "hi-IN": `${siteUrl}?lang=hi`,
    },
  },

  openGraph: {
    title: "Deepak ❤️ Chandani | Wedding Invitation",
    description:
      "You and your family are cordially invited to celebrate our wedding and bless us on our special day.",
    url: siteUrl,
    siteName: "Deepak & Chandani Wedding",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deepak ❤️ Chandani Wedding Invitation",
        type: "image/jpeg",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Deepak ❤️ Chandani | Wedding Invitation",
    description:
      "You and your family are cordially invited to celebrate our wedding and bless us on our special day.",
    images: ["/og-image.jpg"],
    creator: "@deepak_chandani",
  },

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.webmanifest",

  category: "wedding",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Deepak ❤️ Chandani Wedding Ceremony",
  alternateName: "दीपक ❤️ चांदनी विवाह समारोह",
  description:
    "Wedding Celebration of Er. Deepak Kumar and Chandani Kumari. With the blessings of our families, we warmly invite you to be a part of our most cherished moments.",
  startDate: "2027-02-10T19:00:00+05:30",
  endDate: "2027-02-11T02:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Wedding Venue, Palamu",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palamu",
      addressRegion: "Jharkhand",
      postalCode: "822115",
      addressCountry: "IN",
    },
  },
  organizer: [
    {
      "@type": "Person",
      name: "Er. Deepak Kumar",
      description: "Groom",
    },
    {
      "@type": "Person",
      name: "Chandani Kumari",
      description: "Bride",
    },
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InviteOnly",
    url: siteUrl,
  },
  image: `${siteUrl}/og-image.png`,
  url: siteUrl,
  inLanguage: ["en-IN", "hi-IN"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${greatVibes.variable} ${lora.variable} ${notoSerifDevanagari.variable} ${poppins.variable} ${montserrat.variable} ${bodoniModa.variable} light scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

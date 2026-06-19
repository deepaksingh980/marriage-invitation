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

export const metadata: Metadata = {
  title: "The Royal Wedding of Er. Deepak Kumar & Chandani Bhardwaj",
  description: "श्री गणेशाय नमः • You are cordially invited to celebrate the royal wedding of Er. Deepak Kumar & Chandani Bhardwaj. Join us for the blessings.",
  keywords: ["Deepak Kumar & Chandani Bhardwaj", "Royal Wedding", "Indian Wedding Invitation", "Traditional Indian Wedding Website"],
  authors: [{ name: "Er. Deepak Kumar & Chandani Bhardwaj" }],
  openGraph: {
    title: "The Royal Wedding of Er. Deepak Kumar & Chandani Bhardwaj",
    description: "श्री गणेशाय नमः • You are cordially invited to celebrate the wedding of Er. Deepak Kumar & Chandani Bhardwaj. View invitation details.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${greatVibes.variable} ${lora.variable} ${notoSerifDevanagari.variable} ${poppins.variable} ${montserrat.variable} ${bodoniModa.variable} light scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-background text-foreground antialiased font-sans min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

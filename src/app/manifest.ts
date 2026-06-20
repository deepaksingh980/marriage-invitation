import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Deepak & Chandani Wedding Invitation",
    short_name: "Deepak ❤️ Chandani",
    description:
      "With the blessings of our families, we warmly invite you to celebrate our wedding — February 10, 2027, Palamu, Jharkhand.",
    start_url: "/",
    display: "standalone",
    background_color: "#1F0104",
    theme_color: "#D4AF37",
    orientation: "portrait",
    categories: ["lifestyle", "social"],
    lang: "en-IN",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

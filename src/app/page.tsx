"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import BrideGroom from "@/components/BrideGroom";
import LoveStory from "@/components/LoveStory";
import Events from "@/components/Events";
import Countdown from "@/components/Countdown";
import Venue from "@/components/Venue";
import Family from "@/components/Family";
import Gallery from "@/components/Gallery";
import Wishes from "@/components/Wishes";
import RSVP from "@/components/RSVP";

import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--background)", paddingBottom: "env(safe-area-inset-bottom, 80px)" }}>
          <Navbar />
          <main>
            {/* Chapter 1 + 2: Divine Ganesha + Royal Gates */}
            <Hero />
            {/* Chapter Bridge */}
            <Welcome />
            {/* Chapter 3: The Couple */}
            <BrideGroom />
            {/* Chapter 4: Their Story */}
            <LoveStory />
            {/* Chapter 5: Wedding Celebrations */}
            <Events />
            {/* Chapter 6: Countdown */}
            <Countdown />
            {/* Chapter 7: Venue */}
            <Venue />
            {/* Chapter 8: Family Blessings */}
            <Family />
            {/* Chapter 9: Gallery */}
            <Gallery />
            {/* Guest Wishes */}
            <Wishes />
            {/* Chapter 10: RSVP */}
            <RSVP />

            {/* Chapter 11: Final Blessings */}
            <Footer />
          </main>
          {/* Fixed bottom nav — mobile only */}
          <MobileNav />
        </div>
      )}
    </>
  );
}

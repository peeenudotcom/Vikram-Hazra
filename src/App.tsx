/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Language } from "./types";
import { LanguageSelector } from "./components/LanguageSelector";
import { ParticleStars } from "./components/ParticleStars";
import { Hero } from "./components/Hero";
import { TourDates } from "./components/TourDates";
import { PunjabMap } from "./components/PunjabMap";
import { AboutArtist } from "./components/AboutArtist";
import { StatsBar } from "./components/StatsBar";
import { WhatIsSatsang } from "./components/WhatIsSatsang";
import { MusicalUniverse } from "./components/MusicalUniverse";
import { ListenBeforeCome } from "./components/ListenBeforeCome";
import { Testimonials } from "./components/Testimonials";
import { RegisterForm } from "./components/RegisterForm";
import { AboutAol } from "./components/AboutAol";
import { StickyBottomBar } from "./components/StickyBottomBar";
import { Footer } from "./components/Footer";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);

  // Scroll to register element with optional city selection trigger
  const handleNavigateToRegister = (cityId?: string) => {
    if (cityId) {
      setSelectedCityId(cityId);
    }
    const registerSection = document.getElementById("register-section");
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to streaming visible player container
  const handleNavigateToVideo = () => {
    const listenSection = document.getElementById("listen-section");
    if (listenSection) {
      listenSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#1A1A2E] text-[#FDF6EC] font-sans selection:bg-[#FF6B35]/25 selection:text-[#D4AF37]">
      
      {/* 1. Dynamic Canvas Twinkling & Rising Particle Stars in Background */}
      <ParticleStars />

      {/* 2. Floating language switcher at top-right */}
      <LanguageSelector
        currentLanguage={language}
        onChangeLanguage={(lang) => setLanguage(lang)}
      />

      {/* 3. Hero section with YouTube background video backdrop & live countdown to closest show */}
      <Hero
        language={language}
        onNavigateToRegister={handleNavigateToRegister}
        onNavigateToVideo={handleNavigateToVideo}
      />

      {/* Main Sections Body Wrapper with subtle traditional pattern layout */}
      <main className="relative z-10 w-full overflow-hidden">
        
        {/* 4. Tour dates section card strip list */}
        <TourDates
          language={language}
          onNavigateToRegister={handleNavigateToRegister}
        />

        {/* 5. Punjab Tour Map showing geographic pins on SVG and dotted route animations */}
        <PunjabMap
          language={language}
          onNavigateToRegister={handleNavigateToRegister}
        />

        {/* 6. About the Artist session biography */}
        <AboutArtist language={language} />

        {/* 7. Floating numerical animated countup stats bar */}
        <StatsBar language={language} />

        {/* 8. Satsang contextual wisdom description panels */}
        <WhatIsSatsang language={language} />

        {/* 9. Musical Universe genres tag cloud */}
        <MusicalUniverse language={language} />

        {/* 10. Streaming video player & link metrics */}
        <ListenBeforeCome language={language} />

        {/* 11. Seekers spiritual testimonials carousel / grid */}
        <Testimonials language={language} />

        {/* 12. Multicity booking tab form */}
        <RegisterForm
          language={language}
          selectedCityId={selectedCityId}
          onClearSelectedCity={() => setSelectedCityId(null)}
        />

        {/* 13. Brand background details representing Art Of Living */}
        <AboutAol language={language} />
      </main>

      {/* 14. Sticky Bottom dock designed for mobile display */}
      <StickyBottomBar
        language={language}
        onNavigateToRegister={handleNavigateToRegister}
      />

      {/* 15. Modular footer layout detailing schedule schedules */}
      <Footer
        language={language}
        onChangeLanguage={(lang) => setLanguage(lang)}
      />
    </div>
  );
}

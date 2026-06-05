/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Language, CityTour } from "../types";
import { TRANSLATIONS, TOUR_CITIES } from "../translations";
import { Music, Calendar, ArrowRight, Play, VolumeX } from "lucide-react";

interface HeroProps {
  language: Language;
  onNavigateToRegister: (cityId?: string) => void;
  onNavigateToVideo: () => void;
}

export function Hero({
  language,
  onNavigateToRegister,
  onNavigateToVideo,
}: HeroProps) {
  // Find current upcoming show OR fallback to last show if all are passed
  const [targetShow, setTargetShow] = useState<CityTour>(TOUR_CITIES[0]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const updateTargetAndCountdown = () => {
      const now = new Date().getTime();
      
      // Find the first show in the list that is still in the future
      const nextShow = TOUR_CITIES.find((city) => {
        const showTime = new Date(city.dateISO).getTime();
        return showTime > now;
      }) || TOUR_CITIES[TOUR_CITIES.length - 1]; // Fallback to last show

      setTargetShow(nextShow);

      const targetTime = new Date(nextShow.dateISO).getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    };

    updateTargetAndCountdown();
    const interval = setInterval(updateTargetAndCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format localized countdown labels
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  // Localized city and date names
  const localizedCityName = (city: CityTour) => {
    if (language === "pb") return city.cityNamePB;
    if (language === "hi") return city.cityNameHI;
    return city.cityNameEN;
  };

  const localizedDateStr = (city: CityTour) => {
    if (language === "pb") return city.dateStrPB;
    if (language === "hi") return city.dateStrHI;
    return city.dateStrEN;
  };

  return (
    <section
      id="hero-section"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#1A1A2E]"
    >
      {/* Background Video using YouTube IFrame Embed with Fallback Background Cover */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {/* Fallback elegant dark mandala gradient */}
        <div 
          className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1A2E] via-[#121222] to-[#0A0A16]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(26, 26, 46, 0.45) 0%, rgba(10, 10, 22, 0.95) 100%), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* YouTube Video Background */}
        <iframe
          src="https://www.youtube.com/embed/LqKIsjbeHxk?autoplay=1&mute=1&loop=1&playlist=LqKIsjbeHxk&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&modestbranding=1&enablejsapi=1"
          title="Vikram Hazra Background Video"
          onLoad={() => setVideoLoaded(true)}
          className={`absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-1000 ${
            videoLoaded ? "opacity-45" : "opacity-0"
          }`}
          allow="autoplay; encrypted-media"
        />

        {/* Traditional Overlay with Mandala Watermark texture */}
        <div 
          className="absolute inset-0 z-10 bg-gradient-to-b from-[#1A1A2E]/60 via-[#1A1A2E]/80 to-[#1A1A2E]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(26, 26, 46, 0.2) 0%, rgba(26, 26, 46, 0.8) 100%)`
          }}
        />

        {/* Subdued traditional lotus/mandala line overlay in background */}
        <div className="absolute inset-0 z-10 opacity-5 mix-blend-color-dodge pointer-events-none flex items-center justify-center">
          <svg
            className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.2"
          >
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="15" />
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 45 * Math.cos((angle * Math.PI) / 180)}
                  y2={50 + 45 * Math.sin((angle * Math.PI) / 180)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Hero content container */}
      <div className="relative z-20 flex w-full flex-grow flex-col justify-center px-4 pt-24 pb-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Presentation Badge */}
        <div className="mx-auto mb-6 flex animate-float justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#FF6B35]/25 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#FDF6EC] uppercase gold-glow-box">
            {t("heroTourBadge")}
          </span>
        </div>

        {/* Headline Section */}
        <div className="text-center">
          {/* Subtle Hindi/Punjabi script welcome line */}
          <p className="mb-2 font-serif text-lg font-semibold tracking-wider text-[#FF6B35] saffron-glow-text sm:text-2xl">
            {t("heroSubheadline")}
          </p>
          
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-[#FDF6EC] sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FDF6EC] via-[#D4AF37] to-[#FF6B35] gold-glow-text">
              {t("mainHeadline")}
            </span>
          </h1>

          <p className="mt-4 mx-auto max-w-2xl text-base font-light tracking-wide text-[#FDF6EC]/80 sm:text-xl font-sans">
            {t("subHeadline")}
          </p>
        </div>

        {/* Dynamic Countdown Timer Section */}
        <div className="mt-10 mb-6 text-center">
          <div className="inline-block rounded-2xl border border-[#D4AF37]/20 bg-[#1A1A2E]/90 p-4 sm:p-6 backdrop-blur-md saffron-glow-box shadow-xl">
            <div className="mb-3 text-xs font-semibold tracking-widest text-[#FF6B35] uppercase flex items-center justify-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-[#D4AF37] animate-pulse" />
              <span>{t("countdownPrefix")}</span>
              <span className="text-[#D4AF37] font-serif font-bold tracking-normal italic ml-1">
                {localizedCityName(targetShow)} ({localizedDateStr(targetShow)})
              </span>
            </div>

            {timeLeft.isExpired ? (
              <div className="font-serif text-lg sm:text-xl text-[#F4A7B9] font-semibold italic animate-pulse-glow px-4 py-1">
                {language === "pb" 
                  ? "Satsang ਹੁਣ ਚੱਲ ਰਿਹਾ ਹੈ / ਸਮਾਪਤ ਹੋ ਚੁੱਕਾ ਹੈ!" 
                  : language === "hi" 
                  ? "सत्संग अभी चल रहा है / समाप्त हो चुका है!" 
                  : "The Divine Satsang is underway or has concluded!"}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 sm:gap-6">
                {[
                  { value: timeLeft.days, label: t("countdownDays") },
                  { value: timeLeft.hours, label: t("countdownHours") },
                  { value: timeLeft.minutes, label: t("countdownMins") },
                  { value: timeLeft.seconds, label: t("countdownSecs") },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="font-serif text-2xl font-extrabold text-[#D4AF37] sm:text-4xl min-w-[3rem]">
                      {item.value.toString().padStart(2, "0")}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold tracking-widest text-[#FDF6EC]/50 uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            id="hero-cta-register"
            type="button"
            onClick={() => onNavigateToRegister(targetShow.id)}
            className="cursor-pointer group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D4AF37] px-8 py-4 font-sans text-sm font-bold tracking-wider text-[#FDF6EC] shadow-md shadow-[#FF6B35]/30 outline-none transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>{t("bookYourCity")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-cta-video"
            type="button"
            onClick={onNavigateToVideo}
            className="cursor-pointer flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#1A1A2E]/50 px-8 py-4 font-sans text-sm font-semibold tracking-wider text-[#D4AF37] backdrop-blur-sm transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-[#FDF6EC] hover:border-[#D4AF37]/80"
          >
            <Play className="h-4 w-4 text-[#FF6B35] fill-[#FF6B35]" />
            <span>{t("watchAchyutam")}</span>
          </button>
        </div>
      </div>

      {/* Decorative Traditional Marigold/Ribbon Garland footer */}
      <div className="relative z-20 flex h-2.5 w-full items-center justify-around overflow-hidden bg-gradient-to-r from-[#FF6B35] via-[#D4AF37] to-[#FF6B35]">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-[#FF6B35] border border-[#D4AF37] shadow-sm shadow-black"
            style={{
              animation: `diya-flicker ${1.2 + (i % 5) * 0.15}s ease-in-out infinite alternate`,
              transform: `scale(${0.8 + (i % 3) * 0.15})`
            }}
          />
        ))}
      </div>
    </section>
  );
}

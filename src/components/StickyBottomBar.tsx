/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Language, CityTour } from "../types";
import { TRANSLATIONS, TOUR_CITIES } from "../translations";
import { CheckCircle, Share2 } from "lucide-react";

interface StickyBottomBarProps {
  language: Language;
  onNavigateToRegister: (cityId?: string) => void;
}

export function StickyBottomBar({
  language,
  onNavigateToRegister,
}: StickyBottomBarProps) {
  const [nextShow, setNextShow] = useState<CityTour>(TOUR_CITIES[0]);
  const [isVisible, setIsVisible] = useState(false);

  // Auto detect closest upcoming show
  useEffect(() => {
    const detectNextShow = () => {
      const now = new Date().getTime();
      const BUFFER_MS = 4 * 60 * 60 * 1000;
      
      const upcoming = TOUR_CITIES.find((city) => {
        const showTime = new Date(city.dateISO).getTime();
        return showTime + BUFFER_MS > now;
      }) || TOUR_CITIES[TOUR_CITIES.length - 1]; // Fallback to last show if all complete

      setNextShow(upcoming);
    };

    detectNextShow();
    const interval = setInterval(detectNextShow, 30000); // Check every half a minute

    // Toggle bar visibility depending on scroll distance
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getCityName = () => {
    if (language === "pb") return nextShow.cityNamePB;
    if (language === "hi") return nextShow.cityNameHI;
    return nextShow.cityNameEN;
  };

  const getDateShort = () => {
    if (language === "pb") return nextShow.dateStrPB.split(",")[0];
    if (language === "hi") return nextShow.dateStrHI.split(",")[0];
    return nextShow.dateStrEN.split(",")[0];
  };

  const handleShareWhatsApp = () => {
    const rawMsg = nextShow.whatsappMessage;
    const shareText = rawMsg.replace("[LINK]", window.location.href);
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div
      id="mobile-sticky-floating-dock"
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden bg-[#1A1A2E]/95 border-t border-white/10 px-4 py-3 shadow-2xl backdrop-blur-md animate-float"
      style={{
        boxShadow: "0 -10px 25px -5px rgba(0,0,0,0.5)"
      }}
    >
      <div className="flex flex-col gap-2">
        
        {/* Top bar announcement line */}
        <div className="flex justify-between items-center text-[11px] font-medium leading-none select-none px-1">
          <span className="text-[#FF6B35] font-serif font-bold italic flex items-center gap-1">
            <span className="inline-block animate-diya text-xs">🎵</span>
            {language === "pb" ? "ਅਗਲਾ ਸ਼ੋਅ:" : language === "hi" ? "अगला कार्यक्रम:" : "Next Show:"}
            <span className="text-[#FDF6EC] ml-0.5">{getDateShort()} • {getCityName()}</span>
          </span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider font-mono">
            {language === "pb" ? "ਮੁਫ਼ਤ ਐਂਟਰੀ" : language === "hi" ? "निशुल्क प्रवेश" : "FREE ENTRY"}
          </span>
        </div>

        {/* Floating Action buttons */}
        <div className="grid grid-cols-2 gap-2">
          
          <button
            id="sticky-btn-register"
            type="button"
            onClick={() => onNavigateToRegister(nextShow.id)}
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#D4AF37] text-[#FDF6EC] font-bold text-xs py-2.5 active:scale-95 transition"
          >
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>{language === "pb" ? "ਮੁਫ਼ਤ ਬੁਕਿੰਗ ਕਰੋ" : language === "hi" ? "निःशुल्क बुक करें" : "Book Passes"}</span>
          </button>

          <button
            id="sticky-btn-share"
            type="button"
            onClick={handleShareWhatsApp}
            className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold text-xs py-2.5 active:scale-95 transition"
          >
            <Share2 className="h-4 w-4 shrink-0" strokeWidth={2.5} />
            <span>{language === "pb" ? "ਸਾਂਝਾ ਕਰੋ" : language === "hi" ? "साझा करें" : "WhatsApp"}</span>
          </button>

        </div>

      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";
import { TRANSLATIONS, TOUR_CITIES } from "../translations";
import { Youtube, Instagram, Music, Star, ArrowUp } from "lucide-react";

interface FooterProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
}

export function Footer({ language, onChangeLanguage }: FooterProps) {
  const getCityName = (city: typeof TOUR_CITIES[0]) => {
    if (language === "pb") return city.cityNamePB;
    if (language === "hi") return city.cityNameHI;
    return city.cityNameEN;
  };

  const getDateStr = (city: typeof TOUR_CITIES[0]) => {
    if (language === "pb") return city.dateStrPB.split(",")[0];
    if (language === "hi") return city.dateStrHI.split(",")[0];
    return city.dateStrEN.split(",")[0];
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="main-app-footer"
      className="relative z-10 w-full bg-[#0A0A16] border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-left text-sm text-[#FDF6EC]/60"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl animate-diya select-none">🕯️</span>
              <h4 className="font-serif text-lg font-bold text-[#FDF6EC] tracking-wide">
                Vikram Hazra Tour 2026
              </h4>
            </div>
            
            <p className="text-xs font-light leading-relaxed text-[#FDF6EC]/70">
              {language === "pb" ? (
                "ਪੰਜਾਬ ਦੀ ਪਵਿੱਤਰ ਧਰਤੀ 'ਤੇ ਆਰਟ ਆਫ਼ ਲਿਵਿੰਗ ਦੁਆਰਾ ਆਯੋਜਿਤ ਕੀਤੇ ਜਾਣ ਵਾਲੇ ਵਿਸ਼ੇਸ਼ ਕੀਰਤਨ ਅਤੇ ਰਹੱਸਵਾਦੀ ਸੰਗੀਤ ਮਹੋਤਸਵ।"
              ) : language === "hi" ? (
                "पंजाब की पावन धरा पर आर्ट ऑफ लिविंग के माध्यम से आयोजित होने वाले विशेष कीर्तन एवं रहस्यात्मक संगीत समारोह।"
              ) : (
                "A sacred spiritual tour curated by the Art of Living Foundation across 4 major cities in Punjab."
              )}
            </p>

            {/* Official Website support as requested */}
            <div className="text-xs">
              <a
                href="https://vikramhazra.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#FF6B35] font-semibold underline underline-offset-4"
              >
                vikramhazra.com
              </a>
            </div>
          </div>

          {/* Mini Schedule Column */}
          <div className="space-y-4">
            <h5 className="font-sans text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              {language === "pb" ? "ਟੂਰ ਦੀਆਂ ਤਾਰੀਖਾਂ" : language === "hi" ? "यात्रा सारणी" : "Quick Schedule"}
            </h5>
            <ul className="space-y-2.5 text-xs">
              {TOUR_CITIES.map((city) => (
                <li key={city.id} className="flex justify-between border-b border-white/5 pb-1 select-none">
                  <span className="font-semibold text-[#FDF6EC]/85">{getCityName(city)}</span>
                  <span className="font-mono text-[#FF6B35]">{getDateStr(city)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Streaming icons column */}
          <div className="space-y-4">
            <h5 className="font-sans text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              {language === "pb" ? "ਸੋਸ਼ਲ ਮੀਡੀਆ" : language === "hi" ? "सोशल मीडिया" : "Connect Online"}
            </h5>
            
            <div className="flex gap-3">
              {[
                { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@VikramHazra" },
                { name: "Instagram", icon: Instagram, url: "https://instagram.com/vikramhazra" },
                { name: "Spotify", icon: Music, url: "https://open.spotify.com/artist/5HpxpIsc0b86X1eSjP7fQd" }
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 hover:bg-[#FF6B35] hover:text-[#FDF6EC] border border-white/5 transition-all duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            <p className="text-[11px] leading-tight text-[#FDF6EC]/40 font-light pt-1">
              Join live broadcasts, stream albums, and follow spiritual postings daily.
            </p>
          </div>

          {/* Language Selector Footer block */}
          <div className="space-y-4">
            <h5 className="font-sans text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              {language === "pb" ? "ਭਾਸ਼ਾ ਬਦਲੋ" : language === "hi" ? "भाषा बदलें" : "Interactive Language"}
            </h5>

            <div className="flex flex-wrap gap-2">
              {[
                { code: "en", label: "English" },
                { code: "pb", label: "ਪੰਜਾਬੀ" },
                { code: "hi", label: "हिंदी" }
              ].map((lang) => (
                <button
                  key={lang.code}
                  id={`footer-lang-btn-${lang.code}`}
                  onClick={() => onChangeLanguage(lang.code as Language)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    language === lang.code
                      ? "bg-[#FF6B35] text-[#FDF6EC]"
                      : "bg-white/5 text-[#FDF6EC]/70 hover:bg-white/10"
                  } transition`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Back to top scroll button helper */}
            <button
              id="back-to-top"
              type="button"
              onClick={handleScrollToTop}
              className="cursor-pointer inline-flex items-center gap-1 text-[11px] hover:text-[#D4AF37] font-semibold transition"
            >
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </button>
          </div>

        </div>

        {/* Solid Divider */}
        <div className="border-t border-white/5 pt-8 mt-8 text-center flex flex-col items-center gap-4">
          
          {/* Centered Jai Gurudev is Gold, as requested */}
          <p className="font-serif text-2xl font-bold text-[#D4AF37] gold-glow-text tracking-widest animate-pulse-glow">
            {language === "pb" ? "ਜੈ ਗੁਰੂਦੇਵ 🙏" : language === "hi" ? "जय गुरुदेव 🙏" : "Jai Gurudev 🙏"}
          </p>

          <div className="text-center text-[11px] text-[#FDF6EC]/30 space-y-1 select-none">
            <p>© 2026 Art of Living Punjab. All rights reserved.</p>
            <p>Designed for seekers & satsang lovers worldwide. Free Admission pass valid at all official tour gates.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

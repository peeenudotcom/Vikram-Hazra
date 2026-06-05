/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";
import { TRANSLATIONS } from "../translations";
import { Music, Eye, Heart, Disc, Sparkles } from "lucide-react";

interface MusicalUniverseProps {
  language: Language;
}

interface GenreTag {
  nameEN: string;
  namePB: string;
  nameHI: string;
  icon: string;
  colorClass: string; // Tailwind border/text/glow classes
  bgStyle: string;
}

export function MusicalUniverse({ language }: MusicalUniverseProps) {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  const genres: GenreTag[] = [
    {
      nameEN: "Sanskrit Chants",
      namePB: "ਸੰਸਕ੍ਰਿਤ ਮੰਤਰ",
      nameHI: "संस्कृत मंत्रोच्चार",
      icon: "🕉️",
      colorClass: "border-[#D4AF37]/45 text-[#D4AF37] hover:bg-[#D4AF37]/10",
      bgStyle: "bg-[#D4AF37]/5"
    },
    {
      nameEN: "Sufi Poetry (Amir Khusrau)",
      namePB: "ਸੂਫ਼ੀ ਸ਼ਾਇਰੀ (ਅਮੀਰ ਖੁਸਰੋ)",
      nameHI: "सूफी काव्य (अमीर खुसरो)",
      icon: "✨",
      colorClass: "border-[#FF6B35]/45 text-[#FF6B35] hover:bg-[#FF6B35]/10",
      bgStyle: "bg-[#FF6B35]/5"
    },
    {
      nameEN: "Kabir Dohas",
      namePB: "ਕਬੀਰ ਦੇ ਦੋਹੇ",
      nameHI: "कबीर के दोहे",
      icon: "📜",
      colorClass: "border-[#F4A7B9]/45 text-[#F4A7B9] hover:bg-[#F4A7B9]/10",
      bgStyle: "bg-[#F4A7B9]/5"
    },
    {
      nameEN: "Meera Bhajans",
      namePB: "ਮੀਰਾ ਦੇ ਭਜਨ",
      nameHI: "मीरा के भजन",
      icon: "🎸",
      colorClass: "border-[#D4AF37]/45 text-[#D4AF37] hover:bg-[#D4AF37]/10",
      bgStyle: "bg-[#D4AF37]/5"
    },
    {
      nameEN: "Punjabi Folk Traditions",
      namePB: "ਪੰਜਾਬੀ ਲੋਕ ਪਰੰਪਰਾਵਾਂ",
      nameHI: "पंजाबी लोक परंपराएं",
      icon: "🌾",
      colorClass: "border-[#FF6B35]/45 text-[#FF6B35] hover:bg-[#FF6B35]/15",
      bgStyle: "bg-[#FF6B35]/8"
    },
    {
      nameEN: "Gujarati & Rajasthani Folk",
      namePB: "ਗੁਜਰਾਤੀ ਅਤੇ ਰਾਜਸਥਾਨੀ ਲੋਕ ਗੀਤ",
      nameHI: "गुजराती एवं राजस्थानी लोकगीत",
      icon: "🏺",
      colorClass: "border-[#F4A7B9]/45 text-[#F4A7B9] hover:bg-[#F4A7B9]/10",
      bgStyle: "bg-[#F4A7B9]/5"
    },
    {
      nameEN: "African Spirituals",
      namePB: "ਅਫਰੀਕੀ ਅਧਿਆਤਮਿਕ ਸੰਗੀਤ",
      nameHI: "अफ्रीकी आध्यात्मिक संगीत",
      icon: "🌍",
      colorClass: "border-[#D4AF37]/45 text-[#D4AF37] hover:bg-[#D4AF37]/10",
      bgStyle: "bg-[#D4AF37]/5"
    },
    {
      nameEN: "Contemporary Blues & Jazz",
      namePB: "ਸਮਕਾਲੀ ਬਲੂਜ਼ ਅਤੇ ਜੈਜ਼",
      nameHI: "समकालीन ब्लूज़ एवं जैज़",
      icon: "🎷",
      colorClass: "border-[#FF6B35]/45 text-[#FF6B35] hover:bg-[#FF6B35]/10",
      bgStyle: "bg-[#FF6B35]/5"
    }
  ];

  const getTagName = (tag: GenreTag) => {
    if (language === "pb") return tag.namePB;
    if (language === "hi") return tag.nameHI;
    return tag.nameEN;
  };

  return (
    <section
      id="musical-universe-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#121222] to-[#1A1A2E] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Header Block */}
        <div className="space-y-4 mb-12">
          <p className="font-serif text-xs font-semibold tracking-widest text-[#FF6B35] uppercase saffron-glow-text">
            {language === "pb" ? "ਸੰਗੀਤ ਦਾ ਦਾਇਰਾ" : language === "hi" ? "संगीत शैलियाँ" : "Genre Constellation"}
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#FDF6EC] sm:text-5xl">
            {t("musicalTitle")}
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-gradient-to-r from-[#D4AF37] to-[#FF6B35]" />
        </div>

        {/* Animated word tag cloud / Constellation */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
          {genres.map((tag, idx) => {
            return (
              <div
                key={idx}
                id={`genre-tag-${idx}`}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-md cursor-default select-none ${tag.colorClass} ${tag.bgStyle}`}
                style={{
                  animation: `slow-float ${5 + (idx % 3) * 1.5}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`
                }}
              >
                <span className="text-sm sm:text-base leading-none select-none">{tag.icon}</span>
                <span className="font-sans whitespace-nowrap">{getTagName(tag)}</span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Tagline Callout */}
        <div className="mt-16 text-center animate-pulse-glow">
          <p className="font-serif text-lg sm:text-2xl font-bold text-[#D4AF37] italic bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B35] via-[#D4AF37] to-[#F4A7B9]">
            "{t("musicalTagline")}"
          </p>
        </div>

      </div>
    </section>
  );
}

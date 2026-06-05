/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";
import { TRANSLATIONS } from "../translations";
import { Music, Eye, Heart, Milestone } from "lucide-react";

interface WhatIsSatsangProps {
  language: Language;
}

export function WhatIsSatsang({ language }: WhatIsSatsangProps) {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  const features = [
    {
      id: "bhajans",
      titleKey: "satsangCard1Title" as const,
      descKey: "satsangCard1Desc" as const,
      icon: Music,
      color: "from-[#FF6B35] to-[#D4AF37]",
      badge: "🎵 Melodic Bliss"
    },
    {
      id: "meditation",
      titleKey: "satsangCard2Title" as const,
      descKey: "satsangCard2Desc" as const,
      icon: Eye,
      color: "from-[#F4A7B9] to-[#FF6B35]",
      badge: "🧘 Inner Peace"
    },
    {
      id: "prayer",
      titleKey: "satsangCard3Title" as const,
      descKey: "satsangCard3Desc" as const,
      icon: Heart,
      color: "from-[#D4AF37] to-[#F4A7B9]",
      badge: "🕯️ Community Joy"
    }
  ];

  return (
    <section
      id="satsang-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#1A1A2E] to-[#121222] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-serif text-xs font-semibold tracking-widest text-[#D4AF37] uppercase gold-glow-text">
            {language === "pb" ? "ਰੂਹਾਨੀ ਗਿਆਨ" : language === "hi" ? "आध्यात्मिक यात्रा" : "Ancient Wisdom"}
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#FDF6EC] sm:text-5xl">
            {t("satsangTitle")}
          </h2>
          <div className="mx-auto h-0.5 w-24 bg-gradient-to-r from-[#FF6B35] to-[#D4AF37]" />
          <p className="mx-auto max-w-3xl font-sans text-base font-light text-[#FDF6EC]/80 leading-relaxed sm:text-lg">
            {t("satsangDesc")}
          </p>
        </div>

        {/* 3 Icon Cards Row with an artistic side-by-side Layout with Unsplash photo on left/right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Grid Cards - Left (7 columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  id={`satsang-card-${feat.id}`}
                  className="group relative rounded-2xl border border-white/5 bg-[#1A1A2E]/70 p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#D4AF37]/30 hover:-translate-y-1.5"
                >
                  {/* Glowing Backdrop Circle */}
                  <div className="absolute top-0 right-0 h-16 w-16 bg-[#FF6B35]/5 rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover:bg-[#FF6B35]/15" />
                  
                  <div className="space-y-4">
                    <span className="text-[9px] font-bold tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-2.5 py-1 rounded-full uppercase">
                      {feat.badge}
                    </span>
                    <div className={`mt-2 inline-flex rounded-xl bg-gradient-to-br ${feat.color} p-3 shadow-md`}>
                      <Icon className="h-5 w-5 text-[#FDF6EC]" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#FDF6EC]">
                      {t(feat.titleKey)}
                    </h3>
                    <p className="font-sans text-xs font-light text-[#FDF6EC]/70 leading-relaxed">
                      {t(feat.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unsplash Crowds / Candles Photo - Right (5 columns) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-[360px] w-full aspect-square rounded-2xl overflow-hidden shadow-2xl space-y-4 border border-[#D4AF37]/20">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent z-10" />
              
              <img
                src="https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&q=80&w=600"
                alt="Community Devotional Satsang Evening Diya"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover"
              />

              {/* Decorative floating traditional diya widget */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center gap-3 bg-[#1A1A2E]/90 p-3 rounded-xl border border-white/10 backdrop-blur-md saffron-glow-box">
                <div className="relative h-9 w-9 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30 shrink-0">
                  <span className="text-lg animate-diya">🕯️</span>
                </div>
                <div className="text-left">
                  <p className="font-serif text-xs font-bold text-[#D4AF37]">
                    {language === "pb" ? "ਸੱਤਸੰਗ ਮਹੱਤਵ" : language === "hi" ? "सत्संग महात्म्य" : "Sacred Vibrations"}
                  </p>
                  <p className="text-[10px] font-light text-[#FDF6EC]/85">
                    {language === "pb" ? "ਵਾਤਾਵਰਣ ਵਿੱਚ ਸਕਾਰਾਤਮਕ ਊਰਜਾ" : language === "hi" ? "वातावरण में सकारात्मक ऊर्जा" : "Elevates consciousness & community bond"}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

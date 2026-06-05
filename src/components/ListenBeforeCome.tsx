/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";
import { TRANSLATIONS } from "../translations";
import { Play, Sparkles, Star, Disc, Apple, Music } from "lucide-react";

interface ListenBeforeComeProps {
  language: Language;
}

export function ListenBeforeCome({ language }: ListenBeforeComeProps) {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  const streamingLinks = [
    {
      name: "Spotify",
      icon: Music,
      url: "https://open.spotify.com/artist/5HpxpIsc0b86X1eSjP7fQd",
      color: "bg-[#1DB954] hover:bg-[#1DB954]/90 text-black font-semibold"
    },
    {
      name: "YouTube Channel",
      icon: Play,
      url: "https://www.youtube.com/@VikramHazra",
      color: "bg-[#FF0000] hover:bg-[#FF0000]/90 text-white font-semibold"
    },
    {
      name: "Apple Music",
      icon: Apple,
      url: "https://music.apple.com/in/artist/vikram-hazra/149811801",
      color: "bg-gradient-to-r from-[#FA243C] to-[#FC3C44] hover:brightness-110 text-white font-semibold"
    }
  ];

  return (
    <section
      id="listen-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#1A1A2E] to-[#121222] py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Video Player Embed */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 gold-glow-box bg-[#0A0A16]">
            {/* The YouTube iframe embed with actual controls */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube-nocookie.com/embed/chHkGBIdnoU?controls=1&rel=0&modestbranding=1"
              title="Vikram Hazra - Achyutam Keshavam Krishna Damodaram | Art of Living"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-4 flex items-center justify-between px-3 text-xs text-[#FDF6EC]/60 font-mono">
            <span>📺 Live Recording Performance</span>
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <Sparkles className="h-3 w-3 fill-[#D4AF37]" /> 10M+ Combined Views
            </span>
          </div>
        </div>

        {/* Right Side: Streaming channels & text info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-4 py-1 text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
              <Star className="h-3.5 w-3.5 fill-[#D4AF37]" /> 🎤 {language === "pb" ? "ਅਚ੍ਯੁਤਮ੍ ਕੇਸ਼ਵਮ੍ ਦੇ ਮੂਲ ਗਾਇਕ" : language === "hi" ? "अच्युतम केशवम के मूल स्वर" : "Original Voice"}
            </div>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-[#FDF6EC] sm:text-5xl">
              {t("listenTitle")}
            </h2>
            <p className="font-sans text-sm font-light text-[#FDF6EC]/80 leading-relaxed">
              {t("listenSub")}
            </p>
          </div>

          {/* Callout Info box */}
          <div className="p-5 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 hover:border-[#FF6B35]/45 transition duration-300">
            <h4 className="font-serif text-base font-bold text-[#FF6B35] flex items-center gap-2">
              <Disc className="h-4.5 w-4.5 animate-spin" style={{ animationDuration: "12s" }} />
              Featured Track: "Achyutam Keshavam"
            </h4>
            <p className="text-xs text-[#FDF6EC]/80 mt-1 font-sans leading-relaxed">
              This iconic and soul-stirring Sanskrit chant was originally conceptualized and recorded in its popular form by Vikram Hazra. It has since served as an anthem for peaceful gatherings worldwide.
            </p>
          </div>

          {/* Streaming Platform Badges */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-widest text-[#FDF6EC]/50 uppercase font-sans">
              Stream/Listen Everywhere:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {streamingLinks.map((plat) => {
                const Icon = plat.icon;
                return (
                  <a
                    key={plat.name}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs ${plat.color} transition-all duration-300 transform active:scale-95 shadow-md`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <span>{plat.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Official Website Link as requested */}
          <div className="pt-2 text-center sm:text-left text-xs font-sans text-[#FDF6EC]/65">
            Visit official website:{" "}
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

      </div>
    </section>
  );
}

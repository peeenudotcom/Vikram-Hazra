/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";
import { TRANSLATIONS } from "../translations";
import { Music, Award, Disc } from "lucide-react";

interface AboutArtistProps {
  language: Language;
}

export function AboutArtist({ language }: AboutArtistProps) {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  return (
    <section
      id="about-artist-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#121222] to-[#1A1A2E] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side: Photo Frame with glowing spiritual borders */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group max-w-[440px] w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-103 saffron-glow-box">
              {/* Outer double glowing outline border */}
              <div className="absolute inset-0 border-[3px] border-[#D4AF37]/40 rounded-3xl pointer-events-none z-10 scale-98 transition-transform duration-500 group-hover:scale-97 group-hover:border-[#FF6B35]/70" />
              <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none z-10" />

              {/* Serene Indian artistic musician performing on stage (using specified Unsplash keyword) */}
              <img
                src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800"
                alt="Vikram Hazra Spiritual Music Performance"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Vignette Overlay grad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

              {/* Over image info */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FF6B35] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase mb-2">
                  Live in Punjab
                </span>
                <p className="font-serif text-2xl font-bold text-[#FDF6EC] leading-tight">
                  Vikram Hazra
                </p>
                <p className="font-sans text-xs text-[#D4AF37] font-semibold tracking-wider uppercase mt-1">
                  Art of Living Spiritual Musician
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Biography and Quote */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <p className="font-serif text-xs font-semibold tracking-widest text-[#FF6B35] uppercase saffron-glow-text">
                {t("aboutArtistTitle")}
              </p>
              <h3 className="font-serif text-3xl font-bold tracking-tight text-[#FDF6EC] sm:text-5xl">
                {language === "pb" ? "ਵਿਕਰਮ ਹਜ਼ਰਾ — ਰੂਹਾਨੀ ਅਵਾਜ਼" : language === "hi" ? "विक्रम हज़रा — रूहानी आवाज़" : "Vikram Hazra"}
              </h3>
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D4AF37]" />
            </div>

            {/* Structured Biography paragraphs */}
            <div className="space-y-4 font-sans text-sm text-[#FDF6EC]/80 font-light leading-relaxed">
              <p>
                {language === "pb" ? (
                  "ਵਿਕਰਮ ਹਜ਼ਰਾ ਇੱਕ ਰੂਹਾਨੀ ਸੰਗੀਤਕਾਰ, ਲੇਖਕ ਅਤੇ ਦਾਰਸ਼ਨਿਕ ਹਨ ਜਿਨ੍ਹਾਂ ਨੇ 40 ਤੋਂ ਵੱਧ ਦੇਸ਼ਾਂ ਵਿੱਚ ਸੰਗਤਾਂ ਦੀਆਂ ਰੂਹਾਂ ਨੂੰ ਛੂਹਿਆ ਹੈ। ਇੱਕ ਸਾਬਕਾ ਪੱਤਰਕਾਰ, ਜਿਨ੍ਹਾਂ ਨੇ ‘ਆਰਟ ਆਫ਼ ਲਿਵਿੰਗ’ ਰਾਹੀਂ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਦੇ ਅਸਲ ਮਾਰਗ ਦੀ ਖੋਜ ਕੀਤੀ, ਵਿਕਰਮ ਪ੍ਰਸਿੱਧ ਭਜਨ ‘ਅਚ੍ਯੁਤਮ੍ ਕੇਸ਼ਵਮ੍’ ਦੀ ਅਸਲ ਰੂਹਾਨੀ ਅਵਾਜ਼ ਹਨ।"
                ) : language === "hi" ? (
                  "विक्रम हज़रा एक आध्यात्मिक संगीतकार, लेखक और दार्शनिक हैं जिन्होंने 40 से अधिक देशों में लोगों की आत्माओं को छुआ है। एक पूर्व पत्रकार, जिन्होंने 'आर्ट ऑफ लिविंग' के माध्यम से अपने जीवन की वास्तविक पुकार खोजी, विक्रम प्रसिद्ध भजन 'अच्युतम केशवम' के मूल स्वर स्तंभ हैं।"
                ) : (
                  "Vikram Hazra is a spiritual musician, writer, and philosopher who has touched souls across 40+ countries. A former journalist who discovered his calling through the Art of Living, Vikram is the original voice behind the iconic 'Achyutam Keshavam.'"
                )}
              </p>
              <p>
                {language === "pb" ? (
                  "1997 ਤੋਂ, ਉਨ੍ਹਾਂ ਨੇ 11 ਸ਼ਾਨਦਾਰ ਐਲਬਮਾਂ ਰਿਲੀਜ਼ ਕੀਤੀਆਂ ਹਨ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਸੰਸਕ੍ਰਿਤ ਦੇ ਸ਼ਲੋਕ, ਸੂਫੀ ਸ਼ਾਇਰੀ, ਕਬੀਰ ਅਤੇ ਮੀਰਾ ਦੇ ਭਜਨ, ਪੰਜਾਬੀ ਲੋਕ ਪਰੰਪਰਾਵਾਂ ਅਤੇ ਅਜੋਕੇ ਜੈਜ਼ ਤੇ ਬਲੂਜ਼ ਸੰਗੀਤ ਦੀਆਂ ਪਵਿੱਤਰ ਤਰੰਗਾਂ ਦਾ ਸੁਮੇਲ ਹੈ — ਅਜਿਹਾ ਸੰਗੀਤ ਜੋ ਦਿਮਾਗ ਨੂੰ ਸ਼ਾਂਤ ਅਤੇ ਹਿਰਦੇ ਨੂੰ ਖੋਲ੍ਹਦਾ ਹੈ। ਉਹ 'ਆਰਟ ਆਫ਼ ਲਿਵਿੰਗ ਫਾਊਂਡੇਸ਼ਨ' ਦੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਪ੍ਰੋਗਰਾਮ ਨਿਰਦੇਸ਼ਕ ਦੇ ਰੂਪ ਵਿੱਚ ਵੀ ਲੋਕਾਂ ਦਾ ਮਾਰਗਦਰਸ਼ਨ ਕਰਦੇ ਹਨ।"
                ) : language === "hi" ? (
                  "1997 से, उन्होंने 11 अद्भुत एलबम जारी किए हैं, जिनमें संस्कृत के श्लोकों, सूफी शायरी, कबीर और मीरा के भजनों, पंजाबी लोक परंपराओं और आधुनिक जैज व ब्लूज संगीत की पवित्र तरंगों का मिश्रण है — ऐसा संगीत जो मस्तिष्क को शांत और हृदय को उद्घाटित करता है। वे 'आर्ट ऑफ लिविंग फाउंडेशन' के अंतर्राष्ट्रीय कार्यक्रम निदेशक के रूप में भी विश्व भर के साधकों का मार्गदर्शन करते हैं।"
                ) : (
                  "Since 1997, he has released 11 albums blending Sanskrit chants, Sufi poetry, Kabir and Meera bhajans, Punjabi folk traditions, and contemporary jazz & blues — music that calms the mind and opens the heart. He serves as International Program Director for the Art of Living Foundation."
                )}
              </p>
            </div>

            {/* Beautiful gold pullquote */}
            <div className="relative rounded-2xl border-l-4 border-[#D4AF37] bg-[#D4AF37]/5 p-6 backdrop-blur-sm">
              <span className="font-serif text-4xl text-[#D4AF37] absolute top-1.5 left-3 leading-none select-none opacity-40">❝</span>
              <p className="font-serif italic text-base text-[#FDF6EC]/95 pl-4 relative z-10 leading-relaxed md:text-lg">
                {t("aboutArtistQuote")}
              </p>
              <p className="mt-2 text-right font-sans text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
                — Vikram Hazra
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

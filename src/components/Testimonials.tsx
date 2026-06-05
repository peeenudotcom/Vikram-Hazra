/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";
import { TRANSLATIONS } from "../translations";
import { Star, MessageSquare } from "lucide-react";

interface TestimonialsProps {
  language: Language;
}

export function Testimonials({ language }: TestimonialsProps) {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  const feedback = [
    {
      id: 1,
      quoteEN: "I came as a skeptic and left in tears of joy. The simplicity of Vikram's music connects you directly to the center of your heart.",
      quotePB: "ਮੈਂ ਇੱਕ ਸ਼ੰਕਾਵਾਦੀ ਵਜੋਂ ਆਇਆ ਸੀ ਅਤੇ ਖੁਸ਼ੀ ਦੇ ਹੰਝੂਆਂ ਨਾਲ ਵਾਪਸ ਗਿਆ। ਵਿਕਰਮ ਦੇ ਸੰਗੀਤ ਦੀ ਸਰਲਤਾ ਤੁਹਾਨੂੰ ਸਿੱਧਾ ਤੁਹਾਡੇ ਹਿਰਦੇ ਦੇ ਕੇਂਦਰ ਨਾਲ ਜੋੜਦੀ ਹੈ।",
      quoteHI: "मैं एक संशयवादी के रूप में आया था और आनंद के आंसुओं के साथ वापस लौटा। विक्रम के संगीत की सादगी आपको सीधे आपके हृदय के केंद्र से जोड़ती है।",
      nameEN: "Anoop Singh",
      namePB: "ਅਨੂਪ ਸਿੰਘ",
      nameHI: "अनूप सिंह",
      roleEN: "Amritsar, Punjab",
      rolePB: "ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ",
      roleHI: "अमृतसर, पंजाब",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      quoteEN: "His voice carried me to a place I hadn't visited in years. The silence that follows the kirtan is absolutely profound.",
      quotePB: "ਉਨ੍ਹਾਂ ਦੀ ਅਵਾਜ਼ ਮੈਨੂੰ ਇੱਕ ਅਜਿਹੀ ਥਾਂ ਤੇ ਲੈ ਗਈ ਜਿੱਥੇ ਮੈਂ ਸਾਲਾਂ ਤੋਂ ਨਹੀਂ ਸੀ ਗਿਆ। ਕੀਰਤਨ ਤੋਂ ਬਾਅਦ ਜੋ ਸ਼ਾਂਤੀ ਮਿਲਦੀ ਹੈ, ਉਹ ਬਹੁਤ ਡੂੰਘੀ ਹੈ।",
      quoteHI: "उनकी आवाज़ मुझे एक ऐसे स्थान पर ले गई जहाँ मैं वर्षों से नहीं गया था। कीर्तन के बाद छा जाने वाली नीरवता अत्यंत गहरी होती है।",
      nameEN: "Priya Sharma",
      namePB: "ਪ੍ਰਿਆ ਸ਼ਰਮਾ",
      nameHI: "प्रिया शर्मा",
      roleEN: "Ludhiana, Punjab",
      rolePB: "ਲੁਧਿਆਣਾ, ਪੰਜਾਬ",
      roleHI: "लुधियाना, पंजाब",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      quoteEN: "The entire room became one collective prayer, one heartbeat. You don't just listen to this music; you merge with it.",
      quotePB: "ਪੂਰਾ ਹਾਲ ਇੱਕ ਸਮੂਹਿਕ ਪ੍ਰਾਰਥਨਾ, ਇੱਕ ਧੜਕਣ ਬਣ ਗਿਆ। ਤੁਸੀਂ ਸਿਰਫ ਇਸ ਸੰਗੀਤ ਨੂੰ ਸੁਣਦੇ ਨਹੀਂ ਹੋ; ਤੁਸੀਂ ਇਸ ਵਿੱਚ ਲੀਨ ਹੋ ਜਾਂਦੇ ਹੋ।",
      quoteHI: "पूरा सभागार एक सामूहिक प्रार्थना, एक धड़कन बन गया। आप केवल इस संगीत को सुनते नहीं हैं; आप इसमें लीन हो जाते हैं।",
      nameEN: "Rahul Verma",
      namePB: "ਰਾਹੁਲ ਵਰਮਾ",
      nameHI: "राहुल वर्मा",
      roleEN: "Chandigarh",
      rolePB: "ਚੰਡੀਗੜ੍ਹ",
      roleHI: "चंडीगढ़",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const getQuote = (item: typeof feedback[0]) => {
    if (language === "pb") return item.quotePB;
    if (language === "hi") return item.quoteHI;
    return item.quoteEN;
  };

  const getName = (item: typeof feedback[0]) => {
    if (language === "pb") return item.namePB;
    if (language === "hi") return item.nameHI;
    return item.nameEN;
  };

  const getRole = (item: typeof feedback[0]) => {
    if (language === "pb") return item.rolePB;
    if (language === "hi") return item.roleHI;
    return item.roleEN;
  };

  return (
    <section
      id="testimonials-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#121222] to-[#1A1A2E] py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-serif text-xs font-semibold tracking-widest text-[#FF6B35] uppercase saffron-glow-text">
            {language === "pb" ? "ਭਗਤਾਂ ਦੇ ਵਿਚਾਰ" : language === "hi" ? "श्रद्धालुओं के शब्द" : "Divine Experiences"}
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#FDF6EC] sm:text-5xl">
            {t("testimonialsTitle")}
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-gradient-to-r from-[#FF6B35] to-[#D4AF37]" />
        </div>

        {/* 3 Quote Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedback.map((item) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className="group relative rounded-2xl border border-white/5 bg-[#1A1A2E]/60 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#D4AF37]/30 hover:-translate-y-1"
            >
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-[#D4AF37]/10 transition-colors duration-300">
                <MessageSquare className="h-10 w-10 fill-current" />
              </div>

              {/* Star Rating Bar */}
              <div className="flex items-center gap-1.5 mb-5 text-[#D4AF37]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-[#D4AF37] shadow-xs" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-serif italic text-base text-[#FDF6EC]/85 leading-relaxed min-h-[5.5rem] mb-6">
                "{getQuote(item)}"
              </p>

              {/* Divider line */}
              <hr className="border-t border-white/5 mb-5" />

              {/* User Bio Footer */}
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={`${getName(item)} portrait avatar`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-11 w-11 rounded-full object-cover border-2 border-[#D4AF37]/35 shadow-md"
                />
                <div className="text-left select-none">
                  <h4 className="font-serif text-sm font-bold text-[#FDF6EC]">
                    {getName(item)}
                  </h4>
                  <p className="font-sans text-[11px] text-[#FF6B35]">
                    {getRole(item)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

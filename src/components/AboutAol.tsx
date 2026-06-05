/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";
import { TRANSLATIONS } from "../translations";
import { Star, Shield, Sun } from "lucide-react";

interface AboutAolProps {
  language: Language;
}

export function AboutAol({ language }: AboutAolProps) {
  return (
    <section
      id="aol-about-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#1A1A2E] to-[#121222] py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Draw a gorgeous custom Vector Logo of Art of Living */}
        <div className="flex justify-center select-none">
          <div className="relative h-20 w-20 flex items-center justify-center bg-gradient-to-br from-[#FF6B35]/10 to-[#D4AF37]/10 rounded-full border border-[#D4AF37]/35 shadow-xl animate-float">
            
            {/* The beautiful Art of Living style lotus logo drawn in SVGs */}
            <svg
              className="h-12 w-12 text-[#D4AF37]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Outer rays */}
              <circle cx="50" cy="40" r="3" fill="#D4AF37" />
              {/* Central rising sun rays */}
              <path
                d="M 50 15 A 35 35 0 0 1 85 50 L 15 50 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
                opacity="0.45"
              />
              {/* Lotus Petals */}
              <path
                d="M 50 25 C 40 45, 10 50, 20 75 C 35 75, 45 65, 50 50 C 55 65, 65 75, 80 75 C 90 50, 60 45, 50 25 Z"
                fill="#FF6B35"
                opacity="0.9"
              />
              <path
                d="M 50 40 C 44 55, 25 58, 30 75 C 40 75, 46 68, 50 60 C 54 68, 60 75, 70 75 C 75 58, 56 55, 50 40 Z"
                fill="#D4AF37"
                opacity="1"
              />
              {/* Swan base silhouette drawn elegantly */}
              <path
                d="M 25 80 C 35 80, 40 76, 50 82 C 60 76, 65 80, 75 80"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Brand Text */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h3 className="font-serif text-lg font-bold tracking-widest text-[#D4AF37] uppercase gold-glow-text">
            {language === "pb" ? "ਆਰਟ ਆਫ਼ ਲਿਵਿੰਗ ਫਾਊਂਡੇਸ਼ਨ" : language === "hi" ? "आर्ट ऑफ लिविंग फाउंडेशन" : "The Art of Living Foundation"}
          </h3>
          
          <p className="font-sans text-sm font-light text-[#FDF6EC]/80 leading-relaxed md:text-base">
            {language === "pb" ? (
              "ਆਰਟ ਆਫ਼ ਲਿਵਿੰਗ 180 ਤੋਂ ਵੱਧ ਦੇਸ਼ਾਂ ਵਿੱਚ ਫੈਲੀ ਇੱਕ ਗਲੋਬਲ ਲਹਿਰ ਹੈ, ਜੋ ਸੇਵਾ, ਸਾਹ (ਪ੍ਰਾਣਾਯਾਮ) ਅਤੇ ਬ੍ਰਹਮ ਗਿਆਨ ਦੁਆਰਾ ਤਣਾਅ-ਮੁਕਤ ਅਤੇ ਹਿੰਸਾ-ਮੁਕਤ ਸਮਾਜ ਦੀ ਸਿਰਜਣਾ ਲਈ ਸਮਰਪਿਤ ਹੈ। ਇਸਦੀ ਸਥਾਪਨਾ ਪਰਮ ਪੂਜਨੀਕ ਗੁਰੂਦੇਵ ਸ਼੍ਰੀ ਸ਼੍ਰੀ ਰਵੀ ਸ਼ੰਕਰ ਜੀ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਹੈ।"
            ) : language === "hi" ? (
              "आर्ट ऑफ लिविंग 180 से अधिक देशों में फैला एक वैश्विक आंदोलन है जो सेवा, श्वास (प्राणायाम) और ज्ञान के माध्यम से तनाव-मुक्त और हिंसा-मुक्त समाज के निर्माण के लिए समर्पित है। इसकी स्थापना परम पूज्य गुरुदेव श्री श्री रवि शंकर जी द्वारा की गई है।"
            ) : (
              "A global movement across 180+ countries dedicated to a stress-free, violence-free society through service, breath, and wisdom. Founded by Sri Sri Ravi Shankar."
            )}
          </p>

          <p className="font-serif italic text-xs text-[#FF6B35] font-semibold tracking-wider">
            {language === "pb" ? "“ਵਸੁਧੈਵ ਕੁਟੁੰਬਕਮ — ਇੱਕ ਵਿਸ਼ਵ, ਇੱਕ ਪਰਿਵਾਰ”" : language === "hi" ? "“वसुधैव कुटुम्बकम् — एक विश्व, एक परिवार”" : "“Vasudhaiva Kutumbakam — One World, One Family”"}
          </p>
        </div>

      </div>
    </section>
  );
}

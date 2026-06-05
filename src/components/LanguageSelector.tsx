/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "../types";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onChangeLanguage: (lang: Language) => void;
}

export function LanguageSelector({
  currentLanguage,
  onChangeLanguage,
}: LanguageSelectorProps) {
  const languages: { code: Language; label: string; title: string }[] = [
    { code: "en", label: "EN", title: "English" },
    { code: "pb", label: "ਪੰਜਾਬੀ", title: "Punjabi (Gurmukhi)" },
    { code: "hi", label: "हिंदी", title: "Hindi (Devanagari)" },
  ];

  return (
    <div
      id="floating-language-bar"
      className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#1A1A2E]/85 p-1 backdrop-blur-md shadow-lg transition-all hover:border-[#D4AF37]/60"
    >
      {languages.map((lang) => {
        const isActive = currentLanguage === lang.code;
        return (
          <button
            key={lang.code}
            id={`lang-btn-${lang.code}`}
            type="button"
            title={lang.title}
            onClick={() => onChangeLanguage(lang.code)}
            className={`cursor-pointer rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-wide transition-all duration-300 ${
              isActive
                ? "bg-[#FF6B35] text-[#FDF6EC] shadow-md shadow-[#FF6B35]/20 scale-105"
                : "text-[#FDF6EC]/70 hover:bg-[#FDF6EC]/10 hover:text-[#FDF6EC]"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}

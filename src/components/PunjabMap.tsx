/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { Language, CityTour } from "../types";
import { TRANSLATIONS, TOUR_CITIES } from "../translations";
import { Info, HelpCircle, Star } from "lucide-react";

interface PunjabMapProps {
  language: Language;
  onNavigateToRegister: (cityId: string) => void;
}

export function PunjabMap({ language, onNavigateToRegister }: PunjabMapProps) {
  const [activePinId, setActivePinId] = useState<string | null>(null);

  // Approximate relative coords inside 500x500 box:
  // Order: 1. Bathinda -> 2. Faridkot -> 3. Nangal -> 4. Jalalabad
  const pins = [
    {
      id: "bathinda",
      cityEN: "Bathinda",
      cityPB: "ਬਠਿੰਡਾ",
      cityHI: "बठिंडा",
      dateEN: "30 Jul",
      datePB: "30 ਜੁਲਾਈ",
      dateHI: "30 जुलाई",
      x: 180,
      y: 380,
      stepNum: 1,
      tag: "Tour Launch 🚀"
    },
    {
      id: "faridkot",
      cityEN: "Faridkot",
      cityPB: "ਫਰੀਦਕੋਟ",
      cityHI: "फरीदकोट",
      dateEN: "31 Jul",
      datePB: "31 ਜੁਲਾਈ",
      dateHI: "31 जुलाई",
      x: 140,
      y: 310,
      stepNum: 2,
      tag: "Evening Dham"
    },
    {
      id: "nangal",
      cityEN: "Nangal",
      cityPB: "ਨੰਗਲ",
      cityHI: "नंगल",
      dateEN: "1 Aug",
      datePB: "1 ਅਗਸਤ",
      dateHI: "1 अगस्त",
      x: 390,
      y: 190,
      stepNum: 3,
      tag: "Shivalik Hills"
    },
    {
      id: "jalalabad",
      cityEN: "Jalalabad",
      cityPB: "ਜਲਾਲਾਬਾਦ",
      cityHI: "जलालाबाद",
      dateEN: "2 Aug",
      datePB: "2 ਅਗਸਤ",
      dateHI: "2 अगस्त",
      x: 80,
      y: 350,
      stepNum: 4,
      tag: "Grand Finale 🎆"
    }
  ];

  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  const getPinData = (id: string) => {
    return TOUR_CITIES.find((c) => c.id === id);
  };

  // Route path specification
  const routePath = `M ${pins[0].x} ${pins[0].y} L ${pins[1].x} ${pins[1].y} L ${pins[2].x} ${pins[2].y} L ${pins[3].x} ${pins[3].y}`;

  // State outline path matching generalized Punjab geometries
  const punjabStatePath = `
    M 280 40 
    C 330 60, 360 80, 400 130 
    C 420 150, 440 160, 460 200 
    C 470 220, 460 250, 420 330 
    C 390 380, 340 430, 290 440 
    C 250 450, 200 465, 140 470 
    C 100 460, 75 420, 60 380 
    C 50 350, 65 310, 85 270 
    C 105 230, 115 190, 150 160 
    C 180 130, 220 100, 280 40 Z
  `;

  return (
    <section
      id="map-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#121222] to-[#1A1A2E] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background illustration */}
      <div 
        className="absolute inset-0 z-0 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Descriptions & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="font-serif text-xs font-semibold tracking-widest text-[#D4AF37] uppercase gold-glow-text">
              {language === "pb" ? "ਭੂਗੋਲਿਕ ਯਾਤਰਾ" : language === "hi" ? "भौगोलिक यात्रा" : "Geographical Pathway"}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-[#FDF6EC] sm:text-5xl">
              {t("tourRouteTitle")}
            </h2>
            <p className="mt-4 text-base font-light text-[#FDF6EC]/80 leading-relaxed">
              {t("tourRouteSubtitle")}
            </p>
          </div>

          {/* Interactive Tooltip Card details based on selected pin */}
          <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#1A1A2E]/90 p-5 shadow-xl saffron-glow-box backdrop-blur-md">
            {activePinId ? (
              (() => {
                const cityInfo = getPinData(activePinId);
                const pinMeta = pins.find((p) => p.id === activePinId);
                if (!cityInfo || !pinMeta) return null;

                return (
                  <div className="space-y-4 animate-float">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/30 px-2.5 py-0.5 text-xs font-semibold text-[#FF6B35]">
                        City {pinMeta.stepNum} of 4 • {pinMeta.tag}
                      </span>
                      <span className="font-serif text-xs font-bold text-[#D4AF37]">
                        {language === "pb" ? pinMeta.datePB : language === "hi" ? pinMeta.dateHI : pinMeta.dateEN}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-2xl font-bold text-[#FDF6EC]">
                        {language === "pb" ? cityInfo.cityNamePB : language === "hi" ? cityInfo.cityNameHI : cityInfo.cityNameEN}
                      </h4>
                      <p className="text-xs text-[#FDF6EC]/60 mt-1">
                        📍 {language === "pb" ? cityInfo.venuePB : language === "hi" ? cityInfo.venueHI : cityInfo.venueEN}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs text-[#FDF6EC]/80">
                      <span>🕓 {language === "pb" ? cityInfo.timePB : language === "hi" ? cityInfo.timeHI : cityInfo.timeEN}</span>
                      <button
                        id={`map-tooltip-btn-${cityInfo.id}`}
                        type="button"
                        onClick={() => onNavigateToRegister(cityInfo.id)}
                        className="cursor-pointer font-semibold text-[#FF6B35] hover:text-[#D4AF37] transition duration-200"
                      >
                        {TRANSLATIONS.bookYourCity[language]}
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-6 text-[#FDF6EC]/60 space-y-2">
                <HelpCircle className="h-10 w-10 text-[#D4AF37]/60 animate-bounce" />
                <p className="text-sm font-medium">
                  {language === "pb" 
                    ? "ਰੂਟ 'ਤੇ ਕਿਸੇ ਵੀ ਸੁਨਹਿਰੀ ਪਿੰਨ 'ਤੇ ਟੈਪ ਕਰੋ" 
                    : language === "hi" 
                    ? "मार्ग पर किसी भी सुनहरे पिन पर टैप करें" 
                    : "Hover or tap on any golden pin on the map to see event schedule & booking status"}
                </p>
              </div>
            )}
          </div>

          {/* Quick Route Legend List */}
          <div className="space-y-2 text-xs">
            {pins.map((pin) => (
              <button
                key={pin.id}
                id={`map-legend-btn-${pin.id}`}
                type="button"
                onClick={() => setActivePinId(pin.id)}
                className={`cursor-pointer flex w-full items-center justify-between rounded-xl px-4 py-2.5 border transition-all duration-300 ${
                  activePinId === pin.id
                    ? "bg-[#FF6B35]/15 border-[#FF6B35]/40 text-[#FDF6EC]"
                    : "bg-white/5 border-transparent text-[#FDF6EC]/70 hover:border-[#D4AF37]/30 hover:text-[#FDF6EC]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-[10px]">
                    {pin.stepNum}
                  </span>
                  <span className="font-semibold">{language === "pb" ? pin.cityPB : language === "hi" ? pin.cityHI : pin.cityEN}</span>
                </div>
                <span className="font-mono text-[11px] text-[#FF6B35]/90 font-medium">
                  {language === "pb" ? pin.datePB : language === "hi" ? pin.dateHI : pin.dateEN}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Map SVG Canvas */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <div className="relative w-full max-w-[500px] aspect-square rounded-3xl bg-[#1A1A2E]/60 border border-white/5 p-4 shadow-2xl overflow-visible">
            
            <svg
              id="punjab-animated-svg"
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Glow */}
              <defs>
                <radialGradient id="stateGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#1A1A2E" stopOpacity="0" />
                </radialGradient>
                
                {/* Motion path helper inside coordinates */}
                <path id="routeMotionPath" d={routePath} />
              </defs>

              {/* Glowing Background Radial Ellipse */}
              <circle cx="250" cy="250" r="230" fill="url(#stateGlow)" />

              {/* Simplified stylized outline of Punjab State */}
              <path
                d={punjabStatePath}
                fill="#121222"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeOpacity="0.35"
                className="transition-all duration-500 hover:stroke-opacity-80"
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.45))",
                }}
              />

              {/* Stylized Rivers depicting Punjab (Five Rivers) in very thin wavy lines */}
              <path
                d="M 50 150 Q 150 170 210 130 T 400 100"
                stroke="#2A2F50"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
                strokeDasharray="4,4"
              />
              <path
                d="M 80 230 Q 180 250 250 210 T 420 180"
                stroke="#2A2F50"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
                strokeDasharray="4,4"
              />
              <path
                d="M 80 300 Q 160 320 220 280 T 440 260"
                stroke="#2A2F50"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
                strokeDasharray="4,4"
              />

              {/* Golden dashed connecting pathway */}
              <path
                id="routeDashedLine"
                d={routePath}
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeOpacity="0.75"
                fill="none"
                className="animate-route-dash"
                style={{
                  filter: "drop-shadow(0 0 6px #FF6B35)"
                }}
              />

              {/* Animated Floating/Traveling glowing Dot helper */}
              <circle r="7" fill="#FF6B35" stroke="#FDF6EC" strokeWidth="1.5" className="moving-dot shadow-md">
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path={routePath}
                  calcMode="linear"
                />
              </circle>
              {/* Extra flare on the moving dot */}
              <circle r="12" fill="#FF6B35" opacity="0.3" className="moving-dot-flare">
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path={routePath}
                  calcMode="linear"
                />
              </circle>

              {/* Placing city pins */}
              {pins.map((pin) => {
                const isActive = activePinId === pin.id;
                return (
                  <g
                    key={pin.id}
                    id={`svg-g-pin-${pin.id}`}
                    className="cursor-pointer group"
                    onClick={() => setActivePinId(pin.id)}
                    transform={`translate(${pin.x}, ${pin.y})`}
                  >
                    {/* Ring Pulse animation for next upcoming or hovered */}
                    <circle
                      r={isActive ? 18 : 12}
                      className={isActive ? "animate-ping text-[#FF6B35]" : "hidden group-hover:block animate-ping text-[#D4AF37]/50"}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    {/* Outer glowing glow */}
                    <circle
                      r="10"
                      className="transition-all duration-300 fill-[#1A1A2E] stroke-[#D4AF37] group-hover:stroke-[#FF6B35]"
                      strokeWidth={isActive ? "2" : "1.5"}
                      style={{
                        filter: isActive ? "drop-shadow(0 0 4px #D4AF37)" : "none"
                      }}
                    />

                    {/* Inner core color dot */}
                    <circle
                      r="5"
                      className={`transition-all duration-300 ${
                        isActive ? "fill-[#FF6B35]" : "fill-[#D4AF37] group-hover:fill-[#FF6B35]"
                      }`}
                    />

                    {/* Step label on top */}
                    <text
                      y="-18"
                      className="font-serif text-[11px] font-extrabold fill-[#FDF6EC] text-anchor-middle filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      textAnchor="middle"
                    >
                      {language === "pb" ? pin.cityPB : language === "hi" ? pin.cityHI : pin.cityEN}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Custom stylized watermark on map */}
            <div className="absolute bottom-5 right-5 pointer-events-none flex flex-col items-end text-[10px] font-semibold text-[#D4AF37]/30 tracking-widest uppercase">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-[#D4AF37]/30" /> SATSANG SUTRA
              </span>
              <span>PUNJAB MAP 2026</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Language, CityTour } from "../types";
import { TRANSLATIONS, TOUR_CITIES } from "../translations";
import { Calendar, MapPin, Clock, Ticket, Share2, Map, CheckCircle2 } from "lucide-react";

interface TourDatesProps {
  language: Language;
  onNavigateToRegister: (cityId?: string) => void;
}

export function TourDates({ language, onNavigateToRegister }: TourDatesProps) {
  // Store expanded maps states for each card
  const [expandedMapId, setExpandedMapId] = useState<string | null>(null);
  
  // Track current system time to mark past & next upcoming shows
  const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());

  useEffect(() => {
    // Keep time updated
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Compute status for all shows
  const showsWithStatus = TOUR_CITIES.map((city) => {
    const showTime = new Date(city.dateISO).getTime();
    
    // Deem past show if past dateISO + 4 hours has elapsed
    const BUFFER_MS = 4 * 60 * 60 * 1000; 
    const isPast = currentTime > showTime + BUFFER_MS;

    return {
      ...city,
      showTime,
      isPast
    };
  });

  // Next up show is the first show that is NOT past
  const nextShowIndex = showsWithStatus.findIndex((show) => !show.isPast);
  const nextShowId = nextShowIndex !== -1 ? showsWithStatus[nextShowIndex].id : null;

  // Localized text getters
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  const getCityName = (city: CityTour) => {
    if (language === "pb") return city.cityNamePB;
    if (language === "hi") return city.cityNameHI;
    return city.cityNameEN;
  };

  const getDateStr = (city: CityTour) => {
    if (language === "pb") return city.dateStrPB;
    if (language === "hi") return city.dateStrHI;
    return city.dateStrEN;
  };

  const getVenueStr = (city: CityTour) => {
    if (language === "pb") return city.venuePB;
    if (language === "hi") return city.venueHI;
    return city.venueEN;
  };

  const getTimeStr = (city: CityTour) => {
    if (language === "pb") return city.timePB;
    if (language === "hi") return city.timeHI;
    return city.timeEN;
  };

  // Precompiled map links to avoid iframe rendering issues
  const mapEmbedUrls: Record<string, string> = {
    bathinda: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110114.77028475267!2d74.8812613567784!3d30.200424590123514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917329aa57c2cf9%3A0x15bfdd08340d1aae!2sBathinda%2C%20Punjab!5e0!3m2!1sen!2sin!4v1717320000000!5m2!1sen!2sin",
    faridkot: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3419.1670932066846!2d74.7214532!3d30.681123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391761efaaaaaaab%3A0xb35a0ce8ca6be113!2sRadha%20Krishna%20Dham%2C%20Faridkot%2C%20Punjab!5e0!3m2!1sen!2sin!4v1717320000000!5m2!1sen!2sin",
    nangal: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3411.3411210986754!2d76.3769151!3d31.370211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390547053e878345%3A0xc47e30d1767bdf8f!2sNangal%2C%20Punjab!5e0!3m2!1sen!2sin!4v1717320000000!5m2!1sen!2sin",
    jalalabad: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110182.26120199468!2d74.2255761!3d30.613456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917df20b0000001%3A0x882cf2124ee7bfab!2sJalalabad%2C%20Punjab!5e0!3m2!1sen!2sin!4v1717320000000!5m2!1sen!2sin"
  };

  const handleShareOnWhatsApp = (city: CityTour) => {
    const encodedMessage = encodeURIComponent(
      city.whatsappMessage.replace("[LINK]", window.location.href)
    );
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <section
      id="tour-dates-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#1A1A2E] to-[#121222] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-serif text-sm font-semibold tracking-widest text-[#FF6B35] uppercase saffron-glow-text">
            {language === "pb" ? "ਪ੍ਰੋਗਰਾਮਾਂ ਦੀ ਸੂਚੀ" : language === "hi" ? "कार्यक्रम समय सारणी" : "Satsang Calendar"}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#FDF6EC] sm:text-5xl">
            {language === "pb" ? "4 ਪਵਿੱਤਰ ਸ਼ਾਮਾਂ ਦੇ ਸਥਾਨ" : language === "hi" ? "4 पावन संध्याओं के स्थल" : "4 Divine Evenings across Punjab"}
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D4AF37]" />
        </div>

        {/* Horizontal responsive card grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {showsWithStatus.map((city) => {
            const isNextShow = city.id === nextShowId;
            const isPast = city.isPast;

            return (
              <div
                key={city.id}
                id={`date-card-${city.id}`}
                className={`relative flex flex-col justify-between rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isNextShow
                    ? "border-[#FF6B35] bg-[#1A1A2E]/95 shadow-xl shadow-[#FF6B35]/15 scale-102 saffron-glow-box"
                    : isPast
                    ? "border-white/5 bg-white/2 opacity-50 grayscale"
                    : "border-[#D4AF37]/20 bg-[#1A1A2E]/60 hover:bg-[#1A1A2E]/80 hover:border-[#D4AF37]/40 shadow-md hover:shadow-lg"
                }`}
              >
                {/* Visual Indicators / Badges */}
                {isNextShow && (
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full bg-[#FF6B35] px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase animate-pulse-glow">
                    {t("nextShowBadge")}
                  </span>
                )}
                {isPast && (
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full bg-[#3F3F46] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#D4AF37]/80 uppercase">
                    {t("endedBadge")}
                  </span>
                )}

                {/* Card Main Body */}
                <div className="p-6">
                  {/* City Title with Glow Dot */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        isNextShow
                          ? "bg-[#FF6B35] animate-ping"
                          : isPast
                          ? "bg-gray-500"
                          : "bg-[#D4AF37]"
                      }`}
                    />
                    <h3 className="font-serif text-2xl font-bold text-[#FDF6EC]">
                      {getCityName(city)}
                    </h3>
                  </div>

                  {/* Scheduled Fields */}
                  <div className="space-y-4 text-sm text-[#FDF6EC]/85">
                    {/* Calendar row */}
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4.5 w-4.5 text-[#FF6B35] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">{getDateStr(city)}</p>
                      </div>
                    </div>

                    {/* Venue row */}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4.5 w-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-light line-clamp-2">{getVenueStr(city)}</p>
                      </div>
                    </div>

                    {/* Time row */}
                    <div className="flex items-start gap-3">
                      <Clock className="h-4.5 w-4.5 text-[#F4A7B9] shrink-0 mt-0.5" />
                      <div>
                        <p>{getTimeStr(city)}</p>
                      </div>
                    </div>

                    {/* Free Pass Tag */}
                    <div className="flex items-center gap-3">
                      <Ticket className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                      <div className="inline-flex items-center gap-1">
                        <span className="font-semibold text-emerald-400">
                          {language === "pb" ? "ਮੁਫ਼ਤ ਦਾਖ਼ਲਾ" : language === "hi" ? "निशुल्क प्रवेश" : "Free Entry"}
                        </span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded-md font-mono">
                          {language === "pb" ? "ਪਾਸ ਲਾਜ਼ਮੀ" : language === "hi" ? "पास अनिवार्य" : "Passes Req."}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible/Expandable Google Map Embed */}
                  {expandedMapId === city.id && (
                    <div className="mt-4 overflow-hidden rounded-xl border border-white/10 shadow-inner h-36">
                      <iframe
                        src={mapEmbedUrls[city.id]}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                </div>

                {/* Card Action footer layout */}
                <div className="border-t border-white/5 bg-black/10 p-4 space-y-2 mt-auto">
                  {!isPast ? (
                    <button
                      id={`btn-register-${city.id}`}
                      type="button"
                      onClick={() => onNavigateToRegister(city.id)}
                      className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] hover:bg-[#FF6B35]/95 px-4 py-2 text-xs font-semibold tracking-wider text-[#FDF6EC] shadow-md transition-all duration-300 transform active:scale-95"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{t("registerNow")}</span>
                    </button>
                  ) : (
                    <div className="w-full text-center py-2 text-xs text-gray-500 font-semibold italic">
                      {language === "pb" ? "ਸਮਾਗਮ ਸਫਲਤਾਪੂਰਵਕ ਸਮਾਪਤ" : language === "hi" ? "कार्यक्रम सकुशल पूर्ण" : "Satsang completed"}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`btn-map-${city.id}`}
                      type="button"
                      onClick={() => setExpandedMapId(expandedMapId === city.id ? null : city.id)}
                      className="cursor-pointer flex items-center justify-center gap-1 rounded-lg border border-white/10 hover:border-[#D4AF37]/55 bg-white/5 px-2 py-1.5 text-[11px] font-medium text-[#D4AF37] transition-all"
                    >
                      <Map className="h-3.5 w-3.5" />
                      <span>{expandedMapId === city.id ? "Hide Map" : "Show Map"}</span>
                    </button>

                    <button
                      id={`btn-whshare-${city.id}`}
                      type="button"
                      onClick={() => handleShareOnWhatsApp(city)}
                      className="cursor-pointer flex items-center justify-center gap-1 rounded-lg border border-white/10 hover:border-emerald-500/50 bg-white/5 px-2 py-1.5 text-[11px] font-medium text-emerald-400 transition-all"
                    >
                      <Share2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

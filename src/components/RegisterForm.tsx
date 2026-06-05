/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { Language, CityTour } from "../types";
import { TRANSLATIONS, TOUR_CITIES } from "../translations";
import { Share2, Check, Copy, ArrowRight, User, Phone, MapPin, Users, Ticket, MessageSquare, Flame, AlertCircle, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// GOOGLE SHEETS BACKEND CONFIG
// Step 1: Create a new Google Sheet
// Step 2: Go to Extensions → Apps Script and paste the script
//         from /google-apps-script/Code.gs in this repo
// Step 3: Deploy as Web App (Execute as: Me, Who has access: Anyone)
// Step 4: Replace the URL below with your deployed Web App URL
// ─────────────────────────────────────────────────────────────
const GOOGLE_SHEETS_WEBAPP_URL =
  "https://script.google.com/macros/s/YOUR_WEBAPP_ID_HERE/exec";

const IS_SHEETS_CONNECTED =
  GOOGLE_SHEETS_WEBAPP_URL.includes("YOUR_WEBAPP_ID_HERE") === false;

// Phone validation — accepts Indian mobile numbers
// Supports: 98765-43210 / +91-98765-43210 / 09876543210 / 9876543210
const isValidIndianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+91|0091|0)?[6-9]\d{9}$/.test(cleaned);
};

interface RegisterFormProps {
  language: Language;
  selectedCityId: string | null;
  onClearSelectedCity: () => void;
}

export function RegisterForm({
  language,
  selectedCityId,
  onClearSelectedCity,
}: RegisterFormProps) {
  // Tabs active state
  const [activeTab, setActiveTab] = useState<string>(TOUR_CITIES[0].id);

  // Sync prop changes
  useEffect(() => {
    if (selectedCityId) {
      setActiveTab(selectedCityId);
      // Wait for DOM layout and scroll safely
      const container = document.getElementById("register-section");
      if (container) {
        container.scrollIntoView({ behavior: "smooth" });
      }
      onClearSelectedCity();
    }
  }, [selectedCityId]);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    village: "",
    attendees: "1"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [registrationPass, setRegistrationPass] = useState<{
    id: string;
    cityNameEN: string;
    cityNamePB: string;
    cityNameHI: string;
    dateEN: string;
    datePB: string;
    dateHI: string;
    venueEN: string;
    venuePB: string;
    venueHI: string;
    time: string;
    name: string;
    phone: string;
    village: string;
    count: string;
  } | null>(null);

  const [copiedGlobal, setCopiedGlobal] = useState(false);

  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  // ── Validation helpers ──────────────────────────────────────
  const validatePhone = (value: string) => {
    if (!value) {
      setPhoneError(
        language === "pb" ? "ਮੋਬਾਈਲ ਨੰਬਰ ਲਾਜ਼ਮੀ ਹੈ।"
        : language === "hi" ? "मोबाइल नंबर आवश्यक है।"
        : "Mobile number is required."
      );
    } else if (!isValidIndianPhone(value)) {
      setPhoneError(
        language === "pb" ? "ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਭਾਰਤੀ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ। (ਜਿਵੇਂ: 98765 43210)"
        : language === "hi" ? "कृपया सही भारतीय मोबाइल नंबर दर्ज करें। (जैसे: 98765 43210)"
        : "Please enter a valid Indian mobile number. (e.g. 98765 43210)"
      );
    } else {
      setPhoneError(null);
    }
  };

  // ── Google Sheets submission ────────────────────────────────
  const submitToGoogleSheets = async (payload: Record<string, string>) => {
    const formBody = new URLSearchParams(payload).toString();
    const response = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    });
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    const result = await response.json();
    if (result.status !== "success") {
      throw new Error(result.message || "Unknown error from server.");
    }
    return result;
  };

  // ── Pass ID generator — deterministic from name+city+timestamp ──
  const generatePassId = (cityCode: string): string => {
    const ts = Date.now().toString(36).toUpperCase().slice(-4);
    return `VH26-${cityCode.toUpperCase()}-${ts}`;
  };

  // ── Form submit handler ─────────────────────────────────────
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Client-side validation
    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.village.trim()) {
      setSubmitError(
        language === "pb" ? "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਖੇਤਰ ਭਰੋ।"
        : language === "hi" ? "कृपया सभी क्षेत्रों को भरें।"
        : "Please fill out all required fields."
      );
      return;
    }
    if (!isValidIndianPhone(formData.mobile)) {
      validatePhone(formData.mobile);
      return;
    }

    setIsLoading(true);

    const activeCity = TOUR_CITIES.find((c) => c.id === activeTab) || TOUR_CITIES[0];
    const passId = generatePassId(activeCity.id.substring(0, 3));

    const payload: Record<string, string> = {
      passId,
      city: activeCity.cityNameEN,
      date: activeCity.dateStrEN,
      venue: activeCity.venueEN,
      fullName: formData.fullName.trim(),
      mobile: formData.mobile.trim(),
      village: formData.village.trim(),
      attendees: formData.attendees,
      language,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (IS_SHEETS_CONNECTED) {
        // Real Google Sheets submission
        await submitToGoogleSheets(payload);
      } else {
        // Fallback: simulate 1s delay when not yet connected
        await new Promise((res) => setTimeout(res, 1000));
        console.warn(
          "[RegisterForm] Google Sheets not connected. " +
          "Set GOOGLE_SHEETS_WEBAPP_URL in RegisterForm.tsx. " +
          "Registration was NOT saved to any database."
        );
      }

      setRegistrationPass({
        id: passId,
        cityNameEN: activeCity.cityNameEN,
        cityNamePB: activeCity.cityNamePB,
        cityNameHI: activeCity.cityNameHI,
        dateEN: activeCity.dateStrEN,
        datePB: activeCity.dateStrPB,
        dateHI: activeCity.dateStrHI,
        venueEN: activeCity.venueEN,
        venuePB: activeCity.venuePB,
        venueHI: activeCity.venueHI,
        time: activeCity.timeEN,
        name: formData.fullName.trim(),
        phone: formData.mobile.trim(),
        village: formData.village.trim(),
        count: formData.attendees,
      });
    } catch (err) {
      console.error("[RegisterForm] Submission failed:", err);
      setSubmitError(
        language === "pb"
          ? "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਮੇਂ ਕੋਈ ਸਮੱਸਿਆ ਆਈ। ਕਿਰਪਾ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"
          : language === "hi"
          ? "पंजीकरण के दौरान कोई समस्या आई। कृपया पुनः प्रयास करें।"
          : "Registration failed. Please try again or contact the organizer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-filled WhatsApp Share logic
  const handleShareWhatsApp = () => {
    if (!registrationPass) return;
    const activeCity = TOUR_CITIES.find((c) => c.id === activeTab) || TOUR_CITIES[0];
    
    // Replace [LINK] placeholder in the specific city message
    const rawMsg = activeCity.whatsappMessage;
    const shareText = rawMsg.replace("[LINK]", window.location.href);
    
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  // Global Tour Share Message
  const globalShareMsg = `🙏 Vikram Hazra Punjab Tour 2026!\nLive Satsang across Punjab — FREE entry:\n🎵 30 Jul → Bathinda\n🎵 31 Jul → Faridkot\n🎵 1 Aug  → Nangal\n🎵 2 Aug  → Jalalabad\nRegister & Pass Info: ${window.location.href} | Jai Gurudev 🙏`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(globalShareMsg);
    setCopiedGlobal(true);
    setTimeout(() => setCopiedGlobal(false), 2000);
  };

  const getCityName = (city: CityTour) => {
    if (language === "pb") return city.cityNamePB;
    if (language === "hi") return city.cityNameHI;
    return city.cityNameEN;
  };

  const getPassCityName = () => {
    if (!registrationPass) return "";
    if (language === "pb") return registrationPass.cityNamePB;
    if (language === "hi") return registrationPass.cityNameHI;
    return registrationPass.cityNameEN;
  };

  const getPassDate = () => {
    if (!registrationPass) return "";
    if (language === "pb") return registrationPass.datePB;
    if (language === "hi") return registrationPass.dateHI;
    return registrationPass.dateEN;
  };

  const getPassVenue = () => {
    if (!registrationPass) return "";
    if (language === "pb") return registrationPass.venuePB;
    if (language === "hi") return registrationPass.venueHI;
    return registrationPass.venueEN;
  };

  return (
    <section
      id="register-section"
      className="relative z-10 w-full bg-gradient-to-b from-[#121222] to-[#1A1A2E] py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-12 space-y-4">
          <p className="font-serif text-xs font-semibold tracking-widest text-[#D4AF37] uppercase gold-glow-text">
            {language === "pb" ? "ਮੁਫ਼ਤ ਸੀਟ ਬੁੱਕ ਕਰੋ" : language === "hi" ? "निशुल्क सीट आरक्षित करें" : "Registration Desk"}
          </p>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-[#FDF6EC] sm:text-5xl">
            {t("registerTitle")}
          </h2>
          <div className="mx-auto h-0.5 w-24 bg-gradient-to-r from-[#FF6B35] to-[#D4AF37]" />
          <p className="mx-auto max-w-2xl font-sans text-xs sm:text-sm font-light text-[#FDF6EC]/70">
            {t("registerSubtitle")}
          </p>
        </div>

        {/* Outer Form and Multi-tab container */}
        <div className="rounded-3xl border border-white/5 bg-[#1A1A2E]/80 shadow-2xl p-6 sm:p-10 backdrop-blur-md saffron-glow-box">
          
          {/* Conditional Ticket Pass view vs Form view */}
          {registrationPass ? (
            <div className="space-y-8 animate-float text-center max-w-xl mx-auto">
              
              {/* Devotional Success Frame */}
              <div className="rounded-full bg-emerald-500/10 p-4 inline-flex border border-emerald-500/30 text-emerald-400 mb-2">
                <Check className="h-10 w-10 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-emerald-400">
                  {language === "pb" ? "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫ਼ਲ!" : language === "hi" ? "पंजीकरण सफल!" : "Pass Confirmed!"}
                </h3>
                <p className="text-sm text-[#FDF6EC]/80 leading-relaxed font-sans px-4">
                  {t("formSuccess")
                    .replace("{city}", getPassCityName())
                    .replace("{date}", getPassDate())}
                </p>
              </div>

              {/* Physical pass simulation visual ticket */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-[#D4AF37]/50 bg-[#1A1A2E] shadow-xl p-6 text-left">
                
                {/* Traditional Side cut-outs inside CSS */}
                <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-[#1A1A2E] border-r-2 border-[#D4AF37]/30" />
                <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-[#1A1A2E] border-l-2 border-[#D4AF37]/30" />

                {/* Ticket Header */}
                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#FF6B35] uppercase">
                      Art of Living Satsang
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#FDF6EC] uppercase tracking-wide">
                      {getPassCityName()} Pass
                    </h4>
                  </div>
                  <div className="text-right select-none">
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] block bg-[#D4AF37]/10 px-2 py-0.5 rounded-md border border-[#D4AF37]/30">
                      {registrationPass.id}
                    </span>
                    <span className="text-[8px] text-[#FDF6EC]/40 uppercase mt-0.5 block tracking-widest">
                      GATE ENTRY CODE
                    </span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#FDF6EC]/50 font-sans tracking-wide block uppercase text-[10px]">
                      ATTENDEE NAME
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#FDF6EC] block mt-0.5">
                      {registrationPass.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#FDF6EC]/50 font-sans tracking-wide block uppercase text-[10px]">
                      TOTAL PASSES
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#D4AF37] block mt-0.5 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {registrationPass.count} {registrationPass.count === "10+" ? "People" : registrationPass.count === "1" ? "Person" : "People"}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="text-[#FDF6EC]/50 font-sans tracking-wide block uppercase text-[10px]">
                      SATSANG DATE & VENUE
                    </span>
                    <span className="font-sans text-xs font-semibold text-[#FDF6EC]/90 block mt-0.5">
                      📅 {getPassDate()} | 🕕 {registrationPass.time}
                    </span>
                    <span className="text-[11px] block text-[#D4AF37]/80 mt-0.5 font-light">
                      📍 {getPassVenue()}
                    </span>
                  </div>
                </div>

                {/* Aesthetic footer signature code inside Ticket */}
                <div className="border-t border-[#D4AF37]/15 border-dashed pt-4 mt-4 flex justify-between items-center text-[10px] text-[#FDF6EC]/30">
                  <span>JAI GURUDEV 🙏</span>
                  <span className="font-mono">NO FEE REQUIRED AT GATE</span>
                </div>
              </div>

              {/* Sub-text share intro */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <p className="text-xs text-[#FDF6EC]/70 font-sans">
                  {t("formShareIntro")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    id="wh-invite-sub"
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-500/90 text-white px-6 py-3 test-xs font-bold tracking-wider transform active:scale-95 transition"
                  >
                    <MessageSquare className="h-4.5 w-4.5 fill-current" />
                    <span>Invite on WhatsApp</span>
                  </button>

                  <button
                    id="new-reg-btn"
                    type="button"
                    onClick={() => {
                      setRegistrationPass(null);
                      setFormData({ fullName: "", mobile: "", village: "", attendees: "1" });
                    }}
                    className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 bg-white/5 px-6 py-3 text-xs text-[#D4AF37] font-semibold transition"
                  >
                    <span>New Registration</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Tab selector buttons */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-3">
                {TOUR_CITIES.map((city) => {
                  const isActive = activeTab === city.id;
                  return (
                    <button
                      key={city.id}
                      id={`form-tab-${city.id}`}
                      type="button"
                      onClick={() => setActiveTab(city.id)}
                      className={`cursor-pointer rounded-2xl px-4 py-3 text-center text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                        isActive
                          ? "bg-[#FF6B35] text-[#FDF6EC] shadow-md shadow-[#FF6B35]/15 scale-102 font-bold ring-2 ring-[#FF6B35]/20"
                          : "bg-white/5 text-[#FDF6EC]/70 hover:bg-white/10 hover:text-[#FDF6EC] border border-white/5"
                      }`}
                    >
                      {getCityName(city)}
                    </button>
                  );
                })}
              </div>

              {/* Form panel fields container */}
              <form onSubmit={handleRegister} className="space-y-6">
                
                {/* Active schedule summary mini tag badge */}
                {(() => {
                  const currentCityObj = TOUR_CITIES.find((c) => c.id === activeTab) || TOUR_CITIES[0];
                  return (
                    <div className="rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 text-xs text-[#D4AF37] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <span className="font-semibold block sm:inline-flex items-center gap-1">
                        <Flame className="h-4 w-4 text-[#FF6B35] inline-block mr-1" />
                        Selected Event: {getCityName(currentCityObj)} Satsang Show
                      </span>
                      <span className="font-mono text-[#FDF6EC]/80">
                        {language === "pb" ? currentCityObj.dateStrPB : language === "hi" ? currentCityObj.dateStrHI : currentCityObj.dateStrEN} @ {language === "pb" ? currentCityObj.timePB : language === "hi" ? currentCityObj.timeHI : currentCityObj.timeEN}
                      </span>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#FDF6EC]/80 flex items-center gap-1.5 uppercase tracking-wider">
                      <User className="h-3.5 w-3.5 text-[#FF6B35]" />
                      {t("formName")} *
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      required
                      placeholder="e.g. Gurpreet Singh / Amit Verma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-[#FDF6EC] placeholder-[#FDF6EC]/30 h-11.5 outline-none focus:border-[#FF6B35] focus:bg-[#1A1A2E] transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#FDF6EC]/80 flex items-center gap-1.5 uppercase tracking-wider">
                      <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {t("formMobile")} *
                    </label>
                    <input
                      id="input-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98765-43210"
                      value={formData.mobile}
                      onChange={(e) => {
                        setFormData({ ...formData, mobile: e.target.value });
                        if (phoneError) validatePhone(e.target.value);
                      }}
                      onBlur={(e) => validatePhone(e.target.value)}
                      className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-[#FDF6EC] placeholder-[#FDF6EC]/30 h-11.5 outline-none transition-all ${
                        phoneError
                          ? "border-red-400/70 focus:border-red-400"
                          : "border-white/10 focus:border-[#D4AF37] focus:bg-[#1A1A2E]"
                      }`}
                    />
                    {phoneError && (
                      <p className="flex items-center gap-1 text-[11px] text-red-400 font-sans mt-1">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {phoneError}
                      </p>
                    )}
                  </div>

                  {/* City/Village field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#FDF6EC]/80 flex items-center gap-1.5 uppercase tracking-wider">
                      <MapPin className="h-3.5 w-3.5 text-[#F4A7B9]" />
                      {t("formCity")} *
                    </label>
                    <input
                      id="input-village"
                      type="text"
                      required
                      placeholder="e.g. Faridkot City / Malout Village"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-[#FDF6EC] placeholder-[#FDF6EC]/30 h-11.5 outline-none focus:border-[#F4A7B9] focus:bg-[#1A1A2E] transition-all"
                    />
                  </div>

                  {/* Dropdown attendees field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#FDF6EC]/80 flex items-center gap-1.5 uppercase tracking-wider">
                      <Users className="h-3.5 w-3.5 text-emerald-400" />
                      {t("formAttendees")}
                    </label>
                    <select
                      id="select-attendees"
                      value={formData.attendees}
                      onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-[#FDF6EC] h-11.5 outline-none focus:border-emerald-400 focus:bg-[#1A1A2E] transition-all overflow-hidden"
                    >
                      <option className="bg-[#1A1A2E]" value="1">1 Person (Only Me)</option>
                      <option className="bg-[#1A1A2E]" value="2">2 People</option>
                      <option className="bg-[#1A1A2E]" value="3">3 People</option>
                      <option className="bg-[#1A1A2E]" value="4">4 People</option>
                      <option className="bg-[#1A1A2E]" value="5">5 People</option>
                      <option className="bg-[#1A1A2E]" value="6">6 People</option>
                      <option className="bg-[#1A1A2E]" value="7">7 People</option>
                      <option className="bg-[#1A1A2E]" value="8">8 People</option>
                      <option className="bg-[#1A1A2E]" value="9">9 People</option>
                      <option className="bg-[#1A1A2E]" value="10+">10+ People (Group/Sangat)</option>
                    </select>
                  </div>

                </div>

                {/* Submit error message */}
                {submitError && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Sheets not connected warning (dev mode) */}
                {!IS_SHEETS_CONNECTED && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-[11px] text-yellow-300">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Dev mode:</strong> Google Sheets not connected.
                      Registrations will NOT be saved. See <code>RegisterForm.tsx</code> for setup instructions.
                    </span>
                  </div>
                )}

                {/* Submission CTA */}
                <div className="pt-2 text-center">
                  <button
                    id="form-register-cta"
                    type="submit"
                    disabled={isLoading || !!phoneError}
                    className="cursor-pointer w-full group relative overflow-hidden rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D4AF37] px-8 py-4 text-sm font-bold tracking-widest text-[#FDF6EC] shadow-md shadow-[#FF6B35]/25 outline-none transition duration-300 hover:scale-103 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                      {isLoading
                        ? (language === "pb" ? "ਪਾਸ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ..." : language === "hi" ? "पास तैयार किया जा रहा है..." : "Generating Your Pass...")
                        : t("formSubmit")}
                    </span>
                  </button>

                  <span className="inline-block mt-3 font-mono text-[10px] text-[#FDF6EC]/40 uppercase tracking-widest leading-none">
                    ⭐ ADMISSION PASS IS COMPLETELY FREE OF COST • SPONSORED BY THE ART OF LIVING
                  </span>
                </div>

              </form>

            </div>
          )}

        </div>

        {/* Global Share section as requested (Spread the Satsang) */}
        <div className="mt-12 rounded-2xl border border-white/5 bg-[#1A1A2E]/40 p-6 text-center backdrop-blur-xs select-none">
          <h4 className="font-serif text-lg font-bold text-[#D4AF37] flex items-center justify-center gap-1.5 leading-none">
            {t("spreadTitle")} 🙏
          </h4>
          <p className="font-sans text-xs text-[#FDF6EC]/60 mt-1 pb-4">
            {language === "pb" ? "ਇਸ ਮਹਾਨ ਟੂਰ ਦਾ ਸੰਦੇਸ਼ ਆਪਣੇ ਸਨੇਹੀਆਂ ਤੱਕ ਪਹੁੰਚਾਓ" : language === "hi" ? "इस महान पावन यात्रा का संदेश अपने प्रियजनों तक पहुंचाएं" : "Help us spread the celestial vibrations across Punjab"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Real Copy Link */}
            <button
              id="global-share-copy"
              type="button"
              onClick={copyToClipboard}
              className="cursor-pointer text-xs font-semibold tracking-wider bg-white/5 hover:bg-white/10 hover:border-[#D4AF37]/50 text-[#FDF6EC] rounded-xl px-5 py-2.5 flex items-center gap-1.5 border border-white/5 transition"
            >
              {copiedGlobal ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-[#D4AF37]" />}
              <span>{copiedGlobal ? "Copied!" : "Copy Full Invitation Link"}</span>
            </button>

            {/* Global Web Whatsapp share */}
            <a
              id="global-share-wa"
              href={`https://wa.me/?text=${encodeURIComponent(globalShareMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold tracking-wider bg-emerald-500 hover:bg-emerald-500/90 text-white rounded-xl px-5 py-2.5 flex items-center gap-1.5 transition"
            >
              <Share2 className="h-4 w-4 text-white" />
              <span>Share 4-City Schedule</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

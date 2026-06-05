/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = "en" | "pb" | "hi";

export interface CityTour {
  id: string;
  cityNameEN: string;
  cityNamePB: string;
  cityNameHI: string;
  dateStrEN: string;
  dateStrPB: string;
  dateStrHI: string;
  dateISO: string; // "2026-07-30" etc for JS parsing
  venueEN: string;
  venuePB: string;
  venueHI: string;
  timeEN: string;
  timePB: string;
  timeHI: string;
  mapLink: string;
  whatsappMessage: string;
}

export interface TranslationDict {
  heroTourBadge: Record<Language, string>;
  heroSubheadline: Record<Language, string>;
  mainHeadline: Record<Language, string>;
  subHeadline: Record<Language, string>;
  registerFree: Record<Language, string>;
  bookYourCity: Record<Language, string>;
  watchAchyutam: Record<Language, string>;
  countdownDays: Record<Language, string>;
  countdownHours: Record<Language, string>;
  countdownMins: Record<Language, string>;
  countdownSecs: Record<Language, string>;
  countdownPrefix: Record<Language, string>;
  registerNow: Record<Language, string>;
  getDirections: Record<Language, string>;
  shareWhatsapp: Record<Language, string>;
  nextShowBadge: Record<Language, string>;
  endedBadge: Record<Language, string>;
  tourRouteTitle: Record<Language, string>;
  tourRouteSubtitle: Record<Language, string>;
  aboutArtistTitle: Record<Language, string>;
  aboutArtistQuote: Record<Language, string>;
  statsCountries: Record<Language, string>;
  statsAlbums: Record<Language, string>;
  statsSince: Record<Language, string>;
  statsAol: Record<Language, string>;
  statsPunjabShows: Record<Language, string>;
  satsangTitle: Record<Language, string>;
  satsangDesc: Record<Language, string>;
  satsangCard1Title: Record<Language, string>;
  satsangCard1Desc: Record<Language, string>;
  satsangCard2Title: Record<Language, string>;
  satsangCard2Desc: Record<Language, string>;
  satsangCard3Title: Record<Language, string>;
  satsangCard3Desc: Record<Language, string>;
  musicalTitle: Record<Language, string>;
  musicalTagline: Record<Language, string>;
  listenTitle: Record<Language, string>;
  listenSub: Record<Language, string>;
  testimonialsTitle: Record<Language, string>;
  registerTitle: Record<Language, string>;
  registerSubtitle: Record<Language, string>;
  formName: Record<Language, string>;
  formMobile: Record<Language, string>;
  formCity: Record<Language, string>;
  formAttendees: Record<Language, string>;
  formSubmit: Record<Language, string>;
  formSuccess: Record<Language, string>;
  formShareIntro: Record<Language, string>;
  spreadTitle: Record<Language, string>;
  stickyCTA: Record<Language, string>;
}

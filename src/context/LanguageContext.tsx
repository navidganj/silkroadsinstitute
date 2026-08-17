import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Direction } from '../types';

interface Translations {
  [key: string]: {
    en: string;
    fa: string;
  };
}

export const translations: Translations = {
  instituteTitle: {
    en: 'Silk Road Architecture Development Institute',
    fa: 'موسسه توسعه معماری جاده ابریشم'
  },
  instituteShort: {
    en: 'SRADI',
    fa: 'موسسه جاده ابریشم'
  },
  tagline: {
    en: 'Architecture. Cultures. Knowledge. Across Borders.',
    fa: 'معماری. فرهنگ‌ها. دانش. فراتر از مرزها.'
  },
  heroSubtitle: {
    en: 'A living digital infrastructure for documenting, researching, comparing, and connecting the architecture and urbanism of Silk Road countries.',
    fa: 'زیرساخت پویای دیجیتال برای مستندنگاری، پژوهش، مقایسه و پیوند دادن معماری و شهرسازی کشورهای جاده ابریشم.'
  },
  exploreAtlas: {
    en: 'Explore the Atlas',
    fa: 'کاوش در اطلس معماری'
  },
  exploreNetwork: {
    en: 'Knowledge Network',
    fa: 'شبکه دانش ابریشم'
  },
  compareCities: {
    en: 'Compare Cities',
    fa: 'مقایسه تطبیقی شهرها'
  },
  aboutInstitute: {
    en: 'About the Institute',
    fa: 'درباره موسسه'
  },
  searchPlaceholder: {
    en: 'Search projects, cities, architects, research, drawings...',
    fa: 'جستجو در پروژه‌ها، شهرها، معماران، پژوهش‌ها، نقشه‌ها...'
  },
  // Navigation
  navExplore: { en: 'Explore', fa: 'کاوش' },
  navAtlas: { en: 'Atlas', fa: 'اطلس معماری' },
  navCities: { en: 'Cities', fa: 'شهرها' },
  navProjects: { en: 'Projects', fa: 'پروژه‌ها' },
  navPeople: { en: 'Architects', fa: 'معماران و اساتید' },
  navResearch: { en: 'Research & Journal', fa: 'پژوهش و نشریه' },
  navArchive: { en: 'Digital Archive', fa: 'آرشیو دیجیتال' },
  navObservatory: { en: 'Observatory', fa: 'دیده‌بان داده‌ها' },
  navNetwork: { en: 'Network', fa: 'شبکه متخصصان' },
  navPrograms: { en: 'Programs', fa: 'دوره‌ها و کارگاه‌ها' },
  navOpportunities: { en: 'Opportunities', fa: 'فرصت‌های همکاری' },
  navEvents: { en: 'Events', fa: 'رویدادها و همایش‌ها' },
  navPublications: { en: 'Publications', fa: 'انتشارات و کتب' },
  navAdmin: { en: 'CMS Dashboard', fa: 'پنل مدیریت' },
  navDesignSystem: { en: 'Design System', fa: 'سیستم دیزاین' },
  navLogin: { en: 'Account / Sign In', fa: 'حساب کاربری / ورود' },
  navSubmitProject: { en: 'Propose Project', fa: 'پیشنهاد ثبت پروژه' },

  // Sections
  featuredComparisonTitle: {
    en: 'Comparative Urban Morphology',
    fa: 'ریخت‌شناسی تطبیقی شهری'
  },
  featuredResearchTitle: {
    en: 'Peer-Reviewed Research & Field Studies',
    fa: 'پژوهش‌های داوری‌شده و مطالعات میدانی'
  },
  featuredArchiveTitle: {
    en: 'From the Digital Archive',
    fa: 'گزیده‌ای از آرشیو دیجیتال'
  },
  observatoryTitle: {
    en: 'Silk Road Architecture Observatory',
    fa: 'دیده‌بان داده‌های معماری جاده ابریشم'
  },
  observatorySubtitle: {
    en: 'Quantitative datasets tracking climate thermodynamics, municipal conservation, and material cultures.',
    fa: 'مجموعه داده‌های کمی برای سنجش ترمودینامیک اقلیمی، حفاظت شهری و فرهنگ مصالح.'
  },
  joinNetworkCta: {
    en: 'Join the International Professional Network',
    fa: 'به شبکه بین‌المللی متخصصان بپیوندید'
  },
  joinNetworkSubtitle: {
    en: 'Connect with researchers, architects, universities, and preservation institutions across 14 Silk Road nations.',
    fa: 'ارتباط مستقیم با پژوهشگران، معماران، دانشگاه‌ها و نهادهای مرمتی در سراسر ۱۴ کشور جاده ابریشم.'
  },

  // Filters & Actions
  allCountries: { en: 'All Countries', fa: 'تمام کشورها' },
  allCities: { en: 'All Cities', fa: 'تمام شهرها' },
  allTypologies: { en: 'All Typologies', fa: 'تمام گونه‌ها' },
  allPeriods: { en: 'All Periods', fa: 'تمام دوره‌ها' },
  allMaterials: { en: 'All Materials', fa: 'تمام مصالح' },
  filterBy: { en: 'Filter Atlas', fa: 'فیلتر اطلس' },
  clearFilters: { en: 'Reset Filters', fa: 'پاک کردن فیلترها' },
  viewDrawings: { en: 'View Technical Drawings & Plans', fa: 'مشاهده نقشه‌های فنی و پلان‌ها' },
  downloadCitation: { en: 'Cite This Record (APA / BibTeX)', fa: 'ارجاع به این سند (APA / BibTeX)' },
  downloadPdf: { en: 'Download Research PDF', fa: 'دانلود متن کامل مقاله (PDF)' },
  applyNow: { en: 'Apply for Program', fa: 'ثبت‌نام در این دوره' },
  registerEvent: { en: 'Register / RSVP for Event', fa: 'ثبت‌نام در رویداد' },
  saveItem: { en: 'Save to My Collection', fa: 'ذخیره در مجموعه من' },
  saved: { en: 'Saved', fa: 'ذخیره شد' },
  close: { en: 'Close', fa: 'بستن' },
  readMore: { en: 'Read Full Dossier', fa: 'مطالعه پرونده کامل' },
  sourceCitation: { en: 'Source & Archival Provenance', fa: 'منبع و پیشینه اسنادی' }
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sradi_language');
    return (saved as Language) || 'en';
  });

  const direction: Direction = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('sradi_language', language);
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'fa' : 'en'));
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

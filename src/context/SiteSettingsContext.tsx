import React, { createContext, useContext, useState, useEffect } from 'react';

export type LogoMode = 'vector' | 'custom_image' | 'monogram' | 'text_badge';
export type ThemeColor = 'teal' | 'lapis' | 'ochre' | 'emerald' | 'midnight';

export interface SiteSettings {
  // Logo & Branding
  logoMode: LogoMode;
  customLogoUrl: string;
  siteName: string;
  siteNameFa: string;
  siteSubtitle: string;
  siteSubtitleFa: string;
  themeColor: ThemeColor;
  
  // Hero Configuration
  heroEyebrow: string;
  heroEyebrowFa: string;
  heroHeadline1: string;
  heroHeadline1Fa: string;
  heroHeadline2: string;
  heroHeadline2Fa: string;
  heroHighlight: string;
  heroHighlightFa: string;
  heroDescription: string;
  heroDescriptionFa: string;

  // Announcement Bar
  showAnnouncementBar: boolean;
  announcementText: string;
  announcementTextFa: string;
  announcementLinkTab: string;

  // Secretariat & Institutional Details
  secretariatEmail: string;
  secretariatPhone: string;
  secretariatAddress: string;
  secretariatAddressFa: string;
  doiPrefix: string;
  orcidIntegration: boolean;

  // Footer & Legal
  footerCopyright: string;
  footerCopyrightFa: string;
  footerAccreditation: string;
  footerAccreditationFa: string;
}

export const defaultSiteSettings: SiteSettings = {
  logoMode: 'vector',
  customLogoUrl: '',
  siteName: 'SILK ROAD',
  siteNameFa: 'موسسه توسعه معماری جاده ابریشم',
  siteSubtitle: 'ARCHITECTURE DEVELOPMENT INSTITUTE',
  siteSubtitleFa: 'پلتفرم بین‌المللی پژوهش، اطلس معماری و دیده‌بان پایداری',
  themeColor: 'teal',

  heroEyebrow: 'A KNOWLEDGE NETWORK',
  heroEyebrowFa: 'شبکه بین‌المللی دانش معماری',
  heroHeadline1: 'Architecture.',
  heroHeadline1Fa: 'معماری.',
  heroHeadline2: 'Cultures. Knowledge.',
  heroHeadline2Fa: 'فرهنگ‌ها. دانش.',
  heroHighlight: 'Across Borders.',
  heroHighlightFa: 'فراتر از مرزها.',
  heroDescription: 'A living network for studying distinct architectural cultures, material knowledge, and evidence-based connections across the Silk Roads.',
  heroDescriptionFa: 'شبکه‌ای زنده برای مطالعه فرهنگ‌های متمایز معماری، دانش مادی و پیوندهای مستند در امتداد جاده‌های ابریشم.',

  showAnnouncementBar: true,
  announcementText: 'Research call: comparative studies of climate, craft and material culture across Silk Road cities.',
  announcementTextFa: 'فراخوان پژوهش: مطالعات تطبیقی اقلیم، صنعتگری و فرهنگ مادی در شهرهای جاده ابریشم.',
  announcementLinkTab: 'programs',

  secretariatEmail: 'secretariat@sradi.arch.org',
  secretariatPhone: '+98 (31) 3224-8900 / +90 (212) 381-0000',
  secretariatAddress: 'Silk Road Architectural Studies Secretariat, Naqsh-e Jahan Heritage Quarter, Isfahan',
  secretariatAddressFa: 'دبیرخانه دائمی مطالعات معماری جاده ابریشم، گذر تاریخی نقش‌جهان، اصفهان',
  doiPrefix: '10.58920/sradi.arch',
  orcidIntegration: true,

  footerCopyright: '© 2026 Silk Road Architecture Development Institute (SRADI). All rights reserved.',
  footerCopyrightFa: '© ۱۴۰۴-۱۴۰۵ موسسه توسعه معماری جاده ابریشم (SRADI). تمامی حقوق محفوظ است.',
  footerAccreditation: 'Non-profit academic knowledge consortium with universities and heritage laboratories across 12 Silk Road nations.',
  footerAccreditationFa: 'کنسرسیوم علمی غیرانتفاعی با همکاری دانشگاه‌ها و آزمایشگاه‌های حفاظت میراث در ۱۲ کشور جاده ابریشم.'
};

const STORAGE_KEY = 'sradi_site_settings_v1';

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
  isSaved: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultSiteSettings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not read site settings from localStorage', e);
    }
    return defaultSiteSettings;
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      // Dispatch custom event for cross-component reactivity if needed
      window.dispatchEvent(new Event('site-settings-changed'));
    } catch (e) {
      console.error('Failed to save site settings:', e);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const resetSettings = () => {
    setSettings(defaultSiteSettings);
    localStorage.removeItem(STORAGE_KEY);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, resetSettings, isSaved }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = (): SiteSettingsContextType => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

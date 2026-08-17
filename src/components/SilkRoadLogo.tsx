import React from 'react';
import { useSiteSettings, LogoMode } from '../context/SiteSettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Compass } from 'lucide-react';

interface SilkRoadLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'light' | 'dark';
  showText?: boolean;
  stacked?: boolean;
  className?: string;
  forceMode?: LogoMode;
}

export const SilkRoadLogo: React.FC<SilkRoadLogoProps> = ({
  size = 'md',
  variant = 'light',
  showText = true,
  stacked = false,
  className = '',
  forceMode
}) => {
  const { settings } = useSiteSettings();
  const { language } = useLanguage();

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-32 h-32'
  };

  const isDark = variant === 'dark';
  const effectiveMode = forceMode || settings.logoMode;

  const renderLogoGraphic = () => {
    // 1. Custom Uploaded/URL Image
    if (effectiveMode === 'custom_image' && settings.customLogoUrl) {
      return (
        <img 
          src={settings.customLogoUrl} 
          alt={settings.siteName}
          className={`${sizeClasses[size]} object-contain rounded-lg`}
          onError={(e) => {
            // fallback to vector on broken image
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    // 2. Monogram Mode (Modernist Minimalist SRADI Monogram)
    if (effectiveMode === 'monogram') {
      return (
        <div className={`${sizeClasses[size]} shrink-0 relative flex items-center justify-center rounded-xl bg-[#004F54] border border-[#C8A56A] shadow-md`}>
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif font-black text-xs text-[#C8A56A] tracking-tighter leading-none">SR</span>
            <span className="font-sans font-bold text-[7px] text-white tracking-widest leading-none mt-0.5">ADI</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#C8A56A] border border-[#004F54]"></div>
        </div>
      );
    }

    // 3. Text Badge Mode
    if (effectiveMode === 'text_badge') {
      return (
        <div className={`${sizeClasses[size]} shrink-0 relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#003B40] to-[#004F54] border border-[#ECE9E2] text-[#C8A56A]`}>
          <Compass className="w-2/3 h-2/3" />
        </div>
      );
    }

    // 4. Default: Precision Faceted 4-Cluster Origami Cross Emblem
    return (
      <div className={`${sizeClasses[size]} shrink-0 relative flex items-center justify-center`}>
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full drop-shadow-xs" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top Branch Shading */}
            <linearGradient id="goldTop1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A050" />
              <stop offset="100%" stopColor="#AD8035" />
            </linearGradient>
            <linearGradient id="goldTop2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2C17D" />
              <stop offset="100%" stopColor="#C29849" />
            </linearGradient>
            <linearGradient id="tealTopRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#007270" />
              <stop offset="100%" stopColor="#004648" />
            </linearGradient>

            {/* Left Branch (Gold/Ochre Facets) */}
            <linearGradient id="goldLeftTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C29646" />
              <stop offset="100%" stopColor="#9C7228" />
            </linearGradient>
            <linearGradient id="goldLeftMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECCF91" />
              <stop offset="100%" stopColor="#BE9243" />
            </linearGradient>
            <linearGradient id="goldLeftBot" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B3893C" />
              <stop offset="100%" stopColor="#8C631E" />
            </linearGradient>

            {/* Right Branch (Deep Teal/Spruce Facets) */}
            <linearGradient id="tealRightTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006A6D" />
              <stop offset="100%" stopColor="#003D40" />
            </linearGradient>
            <linearGradient id="tealRightMid" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#008D8F" />
              <stop offset="100%" stopColor="#005759" />
            </linearGradient>
            <linearGradient id="tealRightBot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004D50" />
              <stop offset="100%" stopColor="#00292B" />
            </linearGradient>

            {/* Bottom Branch (Turquoise/Teal Facets) */}
            <linearGradient id="tealBotLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#41A39D" />
              <stop offset="100%" stopColor="#1E7A75" />
            </linearGradient>
            <linearGradient id="tealBotMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6BC4BE" />
              <stop offset="100%" stopColor="#288E88" />
            </linearGradient>
            <linearGradient id="tealBotRight" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1C7E7A" />
              <stop offset="100%" stopColor="#0E504E" />
            </linearGradient>
          </defs>

          {/* TOP ARM */}
          <polygon points="100,18 78,18 78,54 100,32" fill="url(#goldTop1)" />
          <polygon points="78,18 78,54 62,54 62,34" fill="#B3883C" />
          <polygon points="100,32 78,54 100,68 122,54" fill="url(#goldTop2)" />
          <polygon points="100,18 122,18 122,54 100,32" fill="url(#tealTopRight)" />
          <polygon points="122,18 122,54 138,54 138,34" fill="#005B5E" />
          <polygon points="100,68 122,54 100,32" fill="#007F81" />

          {/* LEFT ARM */}
          <polygon points="18,78 54,78 32,100 18,100" fill="url(#goldLeftTop)" />
          <polygon points="18,78 18,100 34,62 54,62" fill="#AD8437" />
          <polygon points="32,100 54,78 68,100 54,122" fill="url(#goldLeftMid)" />
          <polygon points="18,122 54,122 32,100 18,100" fill="url(#goldLeftBot)" />
          <polygon points="18,122 18,100 34,138 54,138" fill="#8C6521" />
          <polygon points="54,122 34,138 62,138 78,122" fill="#ECCB85" />
          <polygon points="68,100 54,122 78,122 88,100" fill="#9C7228" />

          {/* RIGHT ARM */}
          <polygon points="182,78 146,78 168,100 182,100" fill="url(#tealRightTop)" />
          <polygon points="182,78 182,100 166,62 146,62" fill="#004B4E" />
          <polygon points="168,100 146,78 132,100 146,122" fill="url(#tealRightMid)" />
          <polygon points="182,122 146,122 168,100 182,100" fill="url(#tealRightBot)" />
          <polygon points="182,122 182,100 166,138 146,138" fill="#002E30" />
          <polygon points="146,122 166,138 138,138 122,122" fill="#006C6F" />
          <polygon points="132,100 146,122 122,122 112,100" fill="#004043" />

          {/* BOTTOM ARM */}
          <polygon points="100,182 78,182 78,146 100,168" fill="url(#tealBotLeft)" />
          <polygon points="78,182 78,146 62,146 62,166" fill="#1B7873" />
          <polygon points="100,168 78,146 100,132 122,146" fill="url(#tealBotMid)" />
          <polygon points="100,182 122,182 122,146 100,168" fill="url(#tealBotRight)" />
          <polygon points="122,182 122,146 138,146 138,166" fill="#0E5451" />
          <polygon points="100,132 122,146 100,168" fill="#3AA099" />

          {/* INNER NEGATIVE SPACE */}
          <polygon 
            points="100,68 112,100 132,100 114,114 122,132 100,120 78,132 86,114 68,100 88,100" 
            fill={isDark ? '#00272B' : '#FAF8F3'} 
            className="transition-colors"
          />
        </svg>
      </div>
    );
  };

  const displayName = language === 'fa' ? settings.siteNameFa : settings.siteName;
  const displaySubtitle = language === 'fa' ? settings.siteSubtitleFa : settings.siteSubtitle;

  return (
    <div className={`flex ${stacked ? 'flex-col items-center text-center' : 'items-center gap-3.5'} ${className}`}>
      {renderLogoGraphic()}

      {showText && (
        <div className={`flex flex-col select-none ${stacked ? 'items-center mt-3' : 'text-left rtl:text-right'}`}>
          {/* Main Title */}
          <span className={`font-sans font-extrabold tracking-[0.28em] leading-none text-base sm:text-lg ${
            isDark ? 'text-white' : 'text-[#0A3641]'
          }`}>
            {displayName}
          </span>
          {/* Subtitle */}
          <span className={`text-[8px] sm:text-[9px] tracking-[0.2em] font-bold uppercase mt-1.5 line-clamp-1 max-w-[280px] ${
            isDark ? 'text-[#C8A56A]' : 'text-[#0A3641]'
          }`}>
            {displaySubtitle}
          </span>
          {/* Golden accent bar */}
          <div className={`w-8 h-[2px] bg-[#C59B4D] rounded-full mt-1.5 ${stacked ? 'mx-auto' : 'rtl:mr-0 rtl:ml-auto mr-auto'}`} />
        </div>
      )}
    </div>
  );
};

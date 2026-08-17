import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Compass,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { initialCities } from '../data/seedData';
import { City } from '../types';

interface NetworkHeroProps {
  onExploreAtlas: () => void;
  onExploreNetwork: () => void;
  onSelectCity: (city: City) => void;
  onCompareCity: (cityId: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const NetworkHero: React.FC<NetworkHeroProps> = ({
  onExploreAtlas,
  onExploreNetwork,
  onSelectCity,
  onCompareCity,
  onNavigateTab,
  onOpenSearch
}) => {
  const { language, direction } = useLanguage();
  const { settings } = useSiteSettings();
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  // Exact 8 strategic Silk Road hubs matching the reference UI mockup
  const mapNodes = [
    { id: 'istanbul', name: 'Istanbul', nameFa: 'استانبول', x: 14, y: 22, country: 'Türkiye' },
    { id: 'baku', name: 'Baku', nameFa: 'باکو', x: 38, y: 24, country: 'Azerbaijan' },
    { id: 'tehran', name: 'Tehran', nameFa: 'تهران', x: 48, y: 38, country: 'Iran' },
    { id: 'isfahan', name: 'Isfahan', nameFa: 'اصفهان', x: 52, y: 55, country: 'Iran' },
    { id: 'samarkand', name: 'Samarkand', nameFa: 'سمرقند', x: 68, y: 28, country: 'Uzbekistan' },
    { id: 'kashgar', name: 'Kashgar', nameFa: 'کاشغر', x: 82, y: 32, country: 'China' },
    { id: 'lahore', name: 'Lahore', nameFa: 'لاهور', x: 78, y: 56, country: 'Pakistan' },
    { id: 'xian', name: "Xi'an", nameFa: 'شی‌آن', x: 92, y: 64, country: 'China' }
  ];

  // Interconnecting Silk Road transit arcs
  const routes = [
    { from: 'istanbul', to: 'baku' },
    { from: 'baku', to: 'tehran' },
    { from: 'tehran', to: 'isfahan' },
    { from: 'tehran', to: 'samarkand' },
    { from: 'samarkand', to: 'kashgar' },
    { from: 'kashgar', to: 'xian' },
    { from: 'samarkand', to: 'lahore' },
    { from: 'isfahan', to: 'samarkand' }
  ];

  const getNode = (id: string) => mapNodes.find(n => n.id === id) || { x: 50, y: 50 };

  return (
    <section className="relative bg-[#FAF8F3] text-[#111817] pt-8 pb-10 sm:pt-12 sm:pb-14 overflow-hidden border-b border-[#ECE9E2]">
      
      {/* Background Subtle Geometric Pattern Watermark */}
      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-35 rtl:right-auto rtl:left-0">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#C8A56A]/40">
          <pattern id="hero-geo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" stroke="currentColor" strokeWidth="0.75" fill="none" />
            <circle cx="20" cy="20" r="6" stroke="#004F54" strokeWidth="0.5" fill="none" opacity="0.3" />
          </pattern>
          <rect width="200" height="200" fill="url(#hero-geo-grid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Text & Calls to Action */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#B38048] font-sans">
                {language === 'fa' ? settings.heroEyebrowFa : settings.heroEyebrow}
              </span>
            </div>

            {/* Grand Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#003B40] leading-[1.1] tracking-tight">
              {language === 'fa' ? (
                <>
                  <span>{settings.heroHeadline1Fa}</span><br />
                  <span>{settings.heroHeadline2Fa}</span><br />
                  <span className="text-[#008D8B]">{settings.heroHighlightFa}</span>
                </>
              ) : (
                <>
                  <span>{settings.heroHeadline1}</span><br />
                  <span>{settings.heroHeadline2}</span><br />
                  <span className="text-[#008D8B]">{settings.heroHighlight}</span>
                </>
              )}
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-[#4A5250] leading-relaxed max-w-lg font-normal">
              {language === 'fa' 
                ? settings.heroDescriptionFa
                : settings.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                id="hero-explore-atlas-btn"
                onClick={onExploreAtlas}
                className="bg-[#003B40] hover:bg-[#00272B] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2.5 group cursor-pointer"
              >
                <span>{language === 'fa' ? 'کاوش در اطلس' : 'EXPLORE THE ATLAS'}</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="w-4 h-4 text-[#C8A56A] group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-[#C8A56A] group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <button
                id="hero-about-sriadi-btn"
                onClick={() => onNavigateTab('design-system')}
                className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#003B40] hover:text-[#008D8B] flex items-center gap-1.5 transition-colors group cursor-pointer py-2"
              >
                <span>{language === 'fa' ? 'درباره موسسه SRIADI' : 'ABOUT SRIADI'}</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="w-3.5 h-3.5 text-[#008D8B] group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-[#008D8B] group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Silk Road Network Map Canvas matching the exact light aesthetic */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-3xl bg-[#F4F0E6]/90 border border-[#ECE9E2] shadow-sm overflow-hidden p-4 sm:p-6 flex flex-col justify-between">
              
              {/* Subtle Topographical & Geometric Grid in Map Background */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#004F54_0.75px,transparent_0.75px)] [background-size:20px_20px] pointer-events-none"></div>

              {/* Bottom Right Decorative Dark Teal Triangle / Corner Accent */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#004F54] rotate-45 pointer-events-none opacity-90 rtl:-left-12 rtl:right-auto"></div>

              {/* SVG Connecting Arcs */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="mapArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8A56A" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#008D8B" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#C8A56A" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

                {routes.map((route, idx) => {
                  const p1 = getNode(route.from);
                  const p2 = getNode(route.to);
                  const midX = (p1.x + p2.x) / 2;
                  const midY = (p1.y + p2.y) / 2 - 3;

                  return (
                    <path
                      key={idx}
                      d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                      stroke="url(#mapArcGradient)"
                      strokeWidth="0.6"
                      strokeDasharray="1.5,1.5"
                      fill="none"
                      className="opacity-75"
                    />
                  );
                })}
              </svg>

              {/* Map City Nodes */}
              <div className="relative w-full h-full">
                {mapNodes.map((node) => {
                  const isHovered = hoveredCityId === node.id;
                  return (
                    <div
                      key={node.id}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className="absolute cursor-pointer group z-20 flex flex-col items-center"
                      onMouseEnter={() => setHoveredCityId(node.id)}
                      onMouseLeave={() => setHoveredCityId(null)}
                      onClick={() => {
                        const matched = initialCities.find(c => c.id === node.id || c.name.toLowerCase() === node.name.toLowerCase());
                        if (matched) {
                          onSelectCity(matched);
                        } else {
                          onNavigateTab('atlas');
                        }
                      }}
                    >
                      {/* Node Circle */}
                      <div className="relative flex items-center justify-center">
                        <div className={`absolute w-5 h-5 rounded-full transition-all duration-300 ${
                          isHovered ? 'bg-[#008D8B] animate-ping opacity-40' : 'opacity-0'
                        }`}></div>
                        <div className={`w-3 h-3 rounded-full border-2 border-white transition-all shadow-xs ${
                          isHovered 
                            ? 'bg-[#C8A56A] ring-4 ring-[#C8A56A]/30 scale-125' 
                            : 'bg-[#003B40] group-hover:bg-[#008D8B]'
                        }`}></div>
                      </div>

                      {/* City Label */}
                      <span className={`mt-1 text-[10px] sm:text-[11px] font-bold font-sans tracking-wide transition-colors whitespace-nowrap drop-shadow-2xs ${
                        isHovered ? 'text-[#004F54] scale-105' : 'text-[#2D3332] group-hover:text-[#004F54]'
                      }`}>
                        {language === 'fa' ? node.nameFa : node.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Row Link: "EXPLORE ALL CITIES →" */}
              <div className="relative z-10 flex justify-end pt-2">
                <button
                  onClick={() => onNavigateTab('atlas')}
                  className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#003B40] hover:text-[#008D8B] flex items-center gap-1 transition-colors cursor-pointer bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#ECE9E2] shadow-2xs"
                >
                  <span>{language === 'fa' ? 'کاوش در تمام شهرها' : 'EXPLORE ALL CITIES'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="w-3.5 h-3.5 text-[#008D8B]" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[#008D8B]" />
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

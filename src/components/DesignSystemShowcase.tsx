import React from 'react';
import { Sparkles, Layers, Type, Palette, Compass, CheckCircle2, ShieldCheck, Box } from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';

export const DesignSystemShowcase: React.FC = () => {
  const { language, t } = useLanguage();

  const colorPalette = [
    { name: 'Dark Teal (Deep Institutional)', hex: '#003B40', desc: 'Primary hero surfaces, header bar, and structural framing.' },
    { name: 'Medium Teal (Slate Core)', hex: '#004F54', desc: 'Primary action buttons, active navigation states, brand icon background.' },
    { name: 'Paper Ivory (Light Canvas)', hex: '#F7F5F0', desc: 'Primary application body background, modal paper container.' },
    { name: 'Sand Grey (Subtle Neutral)', hex: '#ECE9E2', desc: 'Dividers, secondary cards, inactive tab buttons, pill badges.' },
    { name: 'Warm Gold (Silk Accent)', hex: '#C8A56A', desc: 'Highlights, monograms, awards, key metrics, and historical dates.' },
    { name: 'Bright Oasis Teal', hex: '#008D8B', desc: 'Interactive node indicators, map connections, and active live statuses.' }
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Hero Title */}
        <div className="bg-[#003B40] rounded-2xl p-6 sm:p-10 text-[#ECE9E2] relative overflow-hidden border border-[#004F54] shadow-md">
          <div className="relative max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54] text-[#C8A56A] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'سیستم دیزاین و هویت بصری موسسه' : 'Institutional Design Tokens & Aesthetic System'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
              {language === 'fa' ? 'مبانی طراحی، پالت رنگی و تایپوگرافی دوزبانه' : 'Silk Road Visual Language & Design Tokens'}
            </h1>
            <p className="text-sm text-[#ECE9E2]/80 leading-relaxed">
              {language === 'fa' 
                ? 'راهنمای استاندارد المان‌های بصری، تناسبات هندسی، پالت رنگ‌های کهن با فرکانس معاصر، و تایپوگرافی تطبیقی فارسی و لاتین.'
                : 'Architectural precision meets cultural dignity: Design system tokens balancing historic Silk Road polychrome materials with contemporary digital cartography.'}
            </p>
          </div>
        </div>

        {/* Color System */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ECE9E2] shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#004F54]" />
            <h2 className="font-serif font-bold text-xl text-[#003B40]">
              {language === 'fa' ? 'پالت رنگی استاندارد موسسه (Institutional Palette)' : 'Official Color System'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorPalette.map((color, i) => (
              <div key={i} className="rounded-xl border border-[#ECE9E2] overflow-hidden shadow-xs">
                <div className="h-28 w-full p-4 flex items-end justify-between text-white font-mono text-xs font-bold" style={{ backgroundColor: color.hex }}>
                  <span className={color.hex === '#F7F5F0' || color.hex === '#ECE9E2' ? 'text-black' : 'text-white'}>
                    {color.hex}
                  </span>
                </div>
                <div className="p-4 bg-[#F7F5F0]/50 space-y-1">
                  <div className="font-serif font-bold text-sm text-[#003B40]">{color.name}</div>
                  <div className="text-xs text-[#616866] leading-relaxed">{color.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Scale */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ECE9E2] shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-[#004F54]" />
            <h2 className="font-serif font-bold text-xl text-[#003B40]">
              {language === 'fa' ? 'سلسله‌مراتب تایپوگرافی دوزبانه (Typographic Hierarchy)' : 'Bilingual Typographic Hierarchy'}
            </h2>
          </div>

          <div className="space-y-4 divide-y divide-[#ECE9E2]">
            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#616866]">Display Title (H1) / 36px Serif</span>
              <div className="font-serif text-3xl font-bold text-[#003B40]">
                {language === 'fa' ? 'اطلس معماری پایدار جاده ابریشم' : 'Silk Road Architectural Knowledge'}
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#616866]">Section Header (H2) / 24px Serif</span>
              <div className="font-serif text-2xl font-bold text-[#004F54]">
                {language === 'fa' ? 'هوش اقلیمی و تکتونیک طاق‌های خشتی' : 'Climate Intelligence & Vernacular Tectonics'}
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#616866]">Card Headline (H3) / 18px Bold</span>
              <div className="font-serif text-lg font-bold text-[#003B40]">
                {language === 'fa' ? 'مسجد جامع اصفهان و گنبد تاج‌الملک' : 'Jameh Mosque of Isfahan (Taj al-Mulk Dome)'}
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#616866]">Body Text / 14px Regular</span>
              <div className="text-sm text-[#111817]/85 max-w-xl leading-relaxed">
                {language === 'fa' 
                  ? 'بافت شهری درون‌گرا با محوریت حیاط‌های مرکزی و بادگیرها، تبادل حرارتی روز و شب در کویر را به تعادل می‌رساند.'
                  : 'Courtyard microclimates and subterranean qanat channels stabilized extreme daily diurnal temperature swings across Silk Road oases.'}
              </div>
            </div>
          </div>
        </div>

        {/* UI Component Tokens */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ECE9E2] shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-[#004F54]" />
            <h2 className="font-serif font-bold text-xl text-[#003B40]">
              {language === 'fa' ? 'دکمه‌ها و عناصر تعاملی (Interactive Components)' : 'UI Buttons & Badge Controls'}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-[#004F54] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#003B40] transition-colors shadow-sm">
              Primary Institutional Button
            </button>

            <button className="bg-[#ECE9E2] text-[#003B40] px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#004F54] hover:text-white transition-colors">
              Secondary Pill Action
            </button>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Status Verified (UNESCO)
            </span>

            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              Historic Preservation Active
            </span>

            <span className="px-3 py-1 rounded-full bg-[#003B40] text-[#C8A56A] text-xs font-bold border border-[#004F54]">
              Silk Road Node
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

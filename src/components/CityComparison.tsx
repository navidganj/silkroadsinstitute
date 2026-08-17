import React, { useState } from 'react';
import { Sliders, ArrowLeftRight, CheckCircle2, ShieldCheck, MapPin, Droplets, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { initialCities } from '../data/seedData';
import { City } from '../types';

interface CityComparisonProps {
  initialCityId1?: string;
  initialCityId2?: string;
  onSelectCityDetail: (city: City) => void;
}

export const CityComparison: React.FC<CityComparisonProps> = ({
  initialCityId1 = 'isfahan',
  initialCityId2 = 'samarkand',
  onSelectCityDetail
}) => {
  const { language } = useLanguage();
  const [cityId1, setCityId1] = useState<string>(initialCityId1);
  const [cityId2, setCityId2] = useState<string>(initialCityId2);

  const city1 = initialCities.find(c => c.id === cityId1) || initialCities[0];
  const city2 = initialCities.find(c => c.id === cityId2) || initialCities[1];

  const indicatorKeys = [
    { key: 'historicDensity' as const, label: 'Historic Core Density', labelFa: 'تراکم بافت تاریخی' },
    { key: 'heritageProtection' as const, label: 'Heritage Protection Index', labelFa: 'شاخص حفاظت از میراث' },
    { key: 'climateResilience' as const, label: 'Passive Climate Resilience', labelFa: 'تاب‌آوری اقلیمی غیرفعال' },
    { key: 'culturalContinuity' as const, label: 'Architectural Continuity', labelFa: 'تداوم سنت‌های معماری' },
    { key: 'publicSpaceRatio' as const, label: 'Civic Public Space Ratio', labelFa: 'نسبت فضاهای عمومی مدنی' },
    { key: 'modernExpansion' as const, label: 'Modern Expansion Pressure', labelFa: 'فشار توسعه شهری مدرن' }
  ];

  const presetComparisons = [
    { c1: 'isfahan', c2: 'samarkand', label: 'Isfahan vs. Samarkand (Safavid & Timurid Capitals)', labelFa: 'اصفهان و سمرقند (پایتخت‌های صفوی و تیموری)' },
    { c1: 'istanbul', c2: 'tabriz', label: 'Istanbul vs. Tabriz (Transcontinental Trade Spines)', labelFa: 'استانبول و تبریز (محورهای تجاری دو قاره‌ای)' },
    { c1: 'bukhara', c2: 'kashgar', label: 'Bukhara vs. Kashgar (Desert Oasis Hydro-Urbanism)', labelFa: 'بخارا و کاشغر (شهرسازی واحه‌های بیابانی)' },
    { c1: 'baku', c2: 'tbilisi', label: 'Baku vs. Tbilisi (Caspian & Caucasus Tectonics)', labelFa: 'باکو و تفلیس (تکتونیک خزر و قفقاز)' }
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54] text-[#C8A56A] text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-[#008D8B]" />
            <span>{language === 'fa' ? 'سامانه تحلیل تطبیقی شهرها' : 'Comparative Urban Morphology System'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003B40]">
            {language === 'fa' ? 'مقایسه تطبیقی شهرهای جاده ابریشم' : 'Cross-Border City Comparison'}
          </h1>
          <p className="text-xs sm:text-sm text-[#616866] leading-relaxed">
            {language === 'fa'
              ? 'تحلیل هم‌زمان ریخت‌شناسی شهری، سازه‌های اقلیمی، مصالح بومی و شاخص‌های حفاظت در دو مرکز تمدنی جاده ابریشم.'
              : 'Simultaneous comparative exploration of urban morphology, thermodynamic climate strategies, vernacular tectonics, and preservation indicators across Silk Road hubs.'}
          </p>
        </div>

        {/* Preset Selector & City Switchers */}
        <div className="bg-white border border-[#ECE9E2] rounded-xl p-5 shadow-sm space-y-4">
          <div className="text-xs font-semibold text-[#004F54] uppercase tracking-wider">
            {language === 'fa' ? 'مقایسه‌های شاخص پیشنهادی:' : 'Featured Comparative Pairs:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {presetComparisons.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCityId1(p.c1);
                  setCityId2(p.c2);
                }}
                className={`p-2.5 rounded text-xs border text-left transition-all ${
                  cityId1 === p.c1 && cityId2 === p.c2
                    ? 'bg-[#004F54] border-[#004F54] text-white font-medium shadow-sm'
                    : 'bg-[#F7F5F0] border-[#ECE9E2] text-[#111817] hover:bg-[#ECE9E2]'
                }`}
              >
                {language === 'fa' ? p.labelFa : p.label}
              </button>
            ))}
          </div>

          {/* Custom Select Dropdowns */}
          <div className="pt-3 border-t border-[#ECE9E2] grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            <div className="md:col-span-5 space-y-1">
              <label className="text-xs font-semibold text-[#003B40]">
                {language === 'fa' ? 'شهر اول:' : 'Primary City:'}
              </label>
              <select
                value={cityId1}
                onChange={e => setCityId1(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#ECE9E2] rounded-md px-3 py-2 text-xs font-medium text-[#111817] focus:outline-none focus:border-[#008D8B]"
              >
                {initialCities.map(c => (
                  <option key={c.id} value={c.id} disabled={c.id === cityId2}>
                    {language === 'fa' ? `${c.nameFa} (${c.countryNameFa})` : `${c.name} (${c.countryName})`}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-[#ECE9E2] flex items-center justify-center text-[#004F54]">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            <div className="md:col-span-5 space-y-1">
              <label className="text-xs font-semibold text-[#003B40]">
                {language === 'fa' ? 'شهر دوم (جهت مقایسه):' : 'Comparative City:'}
              </label>
              <select
                value={cityId2}
                onChange={e => setCityId2(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#ECE9E2] rounded-md px-3 py-2 text-xs font-medium text-[#111817] focus:outline-none focus:border-[#008D8B]"
              >
                {initialCities.map(c => (
                  <option key={c.id} value={c.id} disabled={c.id === cityId1}>
                    {language === 'fa' ? `${c.nameFa} (${c.countryNameFa})` : `${c.name} (${c.countryName})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Side-by-Side City Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City 1 Card */}
          <div className="bg-white border border-[#ECE9E2] rounded-xl overflow-hidden shadow-sm space-y-4">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#ECE9E2]">
              <img
                src={city1.heroImage}
                alt={city1.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-[#C8A56A] font-semibold uppercase tracking-wider">
                  {language === 'fa' ? city1.countryNameFa : city1.countryName}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  {language === 'fa' ? city1.nameFa : city1.name}
                </h2>
                <div className="text-xs opacity-80 flex items-center gap-3 mt-1">
                  <span>{city1.elevation}</span>
                  <span>•</span>
                  <span>{city1.population} {language === 'fa' ? 'نفر' : 'pop'}</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <div className="text-xs font-semibold text-[#008D8B] uppercase tracking-wider mb-1">
                  {language === 'fa' ? 'ریخت‌شناسی شهری و ستون فقرات تجاری' : 'Urban Morphology & Trade Spine'}
                </div>
                <p className="text-xs text-[#616866] leading-relaxed">
                  {language === 'fa' ? city1.morphologyFa : city1.morphology}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-[#C8A56A] uppercase tracking-wider mb-1">
                  {language === 'fa' ? 'مصالح سنتی و تکتونیک' : 'Traditional Materials & Tectonics'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'fa' ? city1.traditionalMaterialsFa : city1.traditionalMaterials).map((mat, i) => (
                    <span key={i} className="bg-[#ECE9E2] text-[#004F54] text-[10px] px-2 py-0.5 rounded font-medium">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectCityDetail(city1)}
                className="w-full bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-semibold py-2 px-3 rounded transition-colors"
              >
                {language === 'fa' ? `مشاهده پرونده کامل ${city1.nameFa}` : `Open ${city1.name} Full Dossier`}
              </button>
            </div>
          </div>

          {/* City 2 Card */}
          <div className="bg-white border border-[#ECE9E2] rounded-xl overflow-hidden shadow-sm space-y-4">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#ECE9E2]">
              <img
                src={city2.heroImage}
                alt={city2.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-[#C8A56A] font-semibold uppercase tracking-wider">
                  {language === 'fa' ? city2.countryNameFa : city2.countryName}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  {language === 'fa' ? city2.nameFa : city2.name}
                </h2>
                <div className="text-xs opacity-80 flex items-center gap-3 mt-1">
                  <span>{city2.elevation}</span>
                  <span>•</span>
                  <span>{city2.population} {language === 'fa' ? 'نفر' : 'pop'}</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <div className="text-xs font-semibold text-[#008D8B] uppercase tracking-wider mb-1">
                  {language === 'fa' ? 'ریخت‌شناسی شهری و ستون فقرات تجاری' : 'Urban Morphology & Trade Spine'}
                </div>
                <p className="text-xs text-[#616866] leading-relaxed">
                  {language === 'fa' ? city2.morphologyFa : city2.morphology}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-[#C8A56A] uppercase tracking-wider mb-1">
                  {language === 'fa' ? 'مصالح سنتی و تکتونیک' : 'Traditional Materials & Tectonics'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(language === 'fa' ? city2.traditionalMaterialsFa : city2.traditionalMaterials).map((mat, i) => (
                    <span key={i} className="bg-[#ECE9E2] text-[#004F54] text-[10px] px-2 py-0.5 rounded font-medium">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectCityDetail(city2)}
                className="w-full bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-semibold py-2 px-3 rounded transition-colors"
              >
                {language === 'fa' ? `مشاهده پرونده کامل ${city2.nameFa}` : `Open ${city2.name} Full Dossier`}
              </button>
            </div>
          </div>
        </div>

        {/* Quantitative Comparative Indicators Bars */}
        <div className="bg-white border border-[#ECE9E2] rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#ECE9E2] pb-3">
            <h3 className="font-serif text-lg font-bold text-[#003B40]">
              {language === 'fa' ? 'سنجش شاخص‌های معماری، اقلیم و حفاظت (مقیاس ۱۰۰)' : 'Comparative Architectural & Environmental Indicators (Scale 0-100)'}
            </h3>
            <p className="text-xs text-[#616866] mt-0.5">
              {language === 'fa' 
                ? 'ارزیابی داده‌های مستندشده توسط دیده‌بان معماری جاده ابریشم بر اساس شاخص‌های کمی.'
                : 'Aggregated values computed from the Silk Road Architecture Observatory datasets.'}
            </p>
          </div>

          <div className="space-y-5">
            {indicatorKeys.map(ind => {
              const val1 = city1.indicators[ind.key] || 50;
              const val2 = city2.indicators[ind.key] || 50;

              return (
                <div key={ind.key} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#004F54]">
                      {language === 'fa' ? city1.nameFa : city1.name}: {val1}%
                    </span>
                    <span className="font-semibold text-[#111817] text-center">
                      {language === 'fa' ? ind.labelFa : ind.label}
                    </span>
                    <span className="font-bold text-[#008D8B]">
                      {language === 'fa' ? city2.nameFa : city2.name}: {val2}%
                    </span>
                  </div>

                  {/* Dual Bar Display */}
                  <div className="grid grid-cols-2 gap-2 h-3 bg-[#F7F5F0] rounded-full overflow-hidden p-0.5 border border-[#ECE9E2]">
                    <div className="flex justify-end">
                      <div
                        style={{ width: `${val1}%` }}
                        className="h-full bg-[#004F54] rounded-full transition-all duration-700"
                      ></div>
                    </div>
                    <div className="flex justify-start">
                      <div
                        style={{ width: `${val2}%` }}
                        className="h-full bg-[#008D8B] rounded-full transition-all duration-700"
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#ECE9E2] flex items-center justify-between text-[11px] text-[#616866]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#004F54] inline-block"></span>
              <span>{language === 'fa' ? city1.nameFa : city1.name}</span>
              <span className="w-3 h-3 rounded bg-[#008D8B] inline-block ml-4"></span>
              <span>{language === 'fa' ? city2.nameFa : city2.name}</span>
            </div>
            <span>{language === 'fa' ? 'منبع: پایگاه داده دیده‌بان ابریشم ۲۰۲۶' : 'Source: Silk Road Observatory Index 2026'}</span>
          </div>
        </div>

        {/* Interactive Climate & Microclimate Sandbox */}
        <div className="bg-white border border-[#ECE9E2] rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE9E2] pb-4">
            <div>
              <div className="text-xs font-semibold text-[#008D8B] uppercase tracking-wider">
                {language === 'fa' ? 'ابزار شبیه‌ساز اقلیم و آسایش حرارتی' : 'CLIMATIC & MICROCLIMATE SIMULATOR'}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#003B40]">
                {language === 'fa' ? 'شبیه‌سازی حیاط مرکزی و جرم حرارتی دیوارها' : 'Courtyard Microclimate & Thermal Mass Sandbox'}
              </h3>
            </div>
            <div className="text-xs text-[#616866] max-w-xs">
              {language === 'fa' 
                ? 'مقایسه عملکرد حرارتی و کاهش دمای پیک در تابستان بر اساس مشخصات مصالح بومی.'
                : 'Comparing thermal damping and peak summer cooling between the two cities.'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City 1 Sandbox Box */}
            <div className="bg-[#FAF8F3] p-5 rounded-xl border border-[#ECE9E2] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#004F54]">{language === 'fa' ? city1.nameFa : city1.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#004F54]/10 text-[#004F54] font-semibold">
                  {language === 'fa' ? city1.climateFa : city1.climate}
                </span>
              </div>
              <div className="space-y-2 text-xs text-[#2D3332]">
                <div className="flex justify-between">
                  <span className="text-[#616866]">{language === 'fa' ? 'تاخیر فاز حرارتی دیوار خشتی/آجری:' : 'Thermal Lag (Adobe/Brick):'}</span>
                  <span className="font-semibold">{city1.indicators.climateResilience > 75 ? '9.4 Hours' : '7.2 Hours'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#616866]">{language === 'fa' ? 'افت دمای روزانه حیاط مرکزی:' : 'Courtyard Diurnal Cooling:'}</span>
                  <span className="font-semibold text-emerald-700">-7.5 °C (Passive)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#616866]">{language === 'fa' ? 'جهت‌گیری غالب بادگیر و شوادان:' : 'Windcatcher/Subterranean:'}</span>
                  <span className="font-semibold">{city1.traditionalMaterialsFa ? city1.traditionalMaterialsFa[0] : 'سایه‌اندازی و حوضخانه'}</span>
                </div>
              </div>
            </div>

            {/* City 2 Sandbox Box */}
            <div className="bg-[#FAF8F3] p-5 rounded-xl border border-[#ECE9E2] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#008D8B]">{language === 'fa' ? city2.nameFa : city2.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#008D8B]/10 text-[#008D8B] font-semibold">
                  {language === 'fa' ? city2.climateFa : city2.climate}
                </span>
              </div>
              <div className="space-y-2 text-xs text-[#2D3332]">
                <div className="flex justify-between">
                  <span className="text-[#616866]">{language === 'fa' ? 'تاخیر فاز حرارتی دیوار خشتی/آجری:' : 'Thermal Lag (Adobe/Brick):'}</span>
                  <span className="font-semibold">{city2.indicators.climateResilience > 75 ? '8.8 Hours' : '6.9 Hours'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#616866]">{language === 'fa' ? 'افت دمای روزانه حیاط مرکزی:' : 'Courtyard Diurnal Cooling:'}</span>
                  <span className="font-semibold text-emerald-700">-6.8 °C (Passive)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#616866]">{language === 'fa' ? 'جهت‌گیری غالب بادگیر و شوادان:' : 'Windcatcher/Subterranean:'}</span>
                  <span className="font-semibold">{city2.traditionalMaterialsFa ? city2.traditionalMaterialsFa[0] : 'تهویه طبیعی متقاطع'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

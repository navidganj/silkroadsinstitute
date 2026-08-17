import React from 'react';
import { X, MapPin, Building2, Layers, Compass, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { City, Project } from '../types';
import { initialProjects } from '../data/seedData';

interface CityDetailModalProps {
  city: City | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onCompareWithCity: (cityId: string) => void;
}

export const CityDetailModal: React.FC<CityDetailModalProps> = ({
  city,
  onClose,
  onSelectProject,
  onCompareWithCity
}) => {
  const { language, t } = useLanguage();

  if (!city) return null;

  const cityProjects = initialProjects.filter(p => p.cityId === city.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#F7F5F0] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-[#ECE9E2] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="relative aspect-[21/9] bg-[#003B40] overflow-hidden shrink-0">
          <img
            src={city.heroImage}
            alt={city.name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#003B40] via-transparent to-black/40"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-red-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="text-xs uppercase tracking-widest text-[#C8A56A] font-semibold">
              {language === 'fa' ? city.countryNameFa : city.countryName}
            </div>
            <h2 className="font-serif text-3xl font-bold">
              {language === 'fa' ? city.nameFa : city.name}
            </h2>
            <div className="text-xs text-[#ECE9E2]/80 flex items-center gap-3 mt-1 font-mono">
              <span>{city.elevation}</span>
              <span>•</span>
              <span>{city.population} {language === 'fa' ? 'جمعیت' : 'population'}</span>
              <span>•</span>
              <span>{city.heritageStatus}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Overview */}
          <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-2">
            <h3 className="font-serif text-base font-bold text-[#003B40]">
              {language === 'fa' ? 'موقعیت و اهمیت در شبکه جاده ابریشم' : 'Urban Position in the Silk Road Network'}
            </h3>
            <p className="text-xs sm:text-sm text-[#111817] leading-relaxed font-light">
              {language === 'fa' ? city.overviewFa : city.overview}
            </p>
          </div>

          {/* Morphology & Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#008D8B]">
                {language === 'fa' ? 'ریخت‌شناسی و بافت شهری' : 'Urban Morphology & Spine'}
              </h4>
              <p className="text-xs text-[#616866] leading-relaxed">
                {language === 'fa' ? city.morphologyFa : city.morphology}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#C8A56A]">
                {language === 'fa' ? 'مصالح بومی و اقلیم' : 'Vernacular Materials & Climate'}
              </h4>
              <div className="text-xs text-[#616866] mb-2 font-medium">
                {language === 'fa' ? city.climateFa : city.climate}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(language === 'fa' ? city.traditionalMaterialsFa : city.traditionalMaterials).map((mat, i) => (
                  <span key={i} className="bg-[#ECE9E2] text-[#004F54] text-[10px] px-2 py-0.5 rounded font-medium">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Documented Projects in this City */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-[#003B40]">
                {language === 'fa' ? `پروژه‌های مستندنگاری‌شده در ${city.nameFa}` : `Documented Architectural Works in ${city.name}`}
              </h3>
              <span className="text-xs text-[#616866] font-medium">
                {cityProjects.length} {language === 'fa' ? 'اثر' : 'works'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cityProjects.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProject(p);
                  }}
                  className="bg-white p-3 rounded-xl border border-[#ECE9E2] hover:border-[#008D8B] cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-[#003B40] group-hover:text-[#008D8B] truncate">
                      {language === 'fa' ? p.titleFa : p.title}
                    </h4>
                    <div className="text-[11px] text-[#616866]">{p.architect}</div>
                    <div className="text-[10px] text-[#C8A56A] font-mono font-semibold">{p.yearCompleted} CE</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#ECE9E2] px-6 py-3 border-t border-[#ECE9E2] flex items-center justify-between shrink-0 text-xs">
          <button
            onClick={() => {
              onClose();
              onCompareWithCity(city.id);
            }}
            className="bg-[#004F54] hover:bg-[#003B40] text-white px-4 py-2 rounded font-semibold transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#C8A56A]" />
            <span>{language === 'fa' ? `مقایسه ${city.nameFa} با شهری دیگر` : `Compare ${city.name} with Another City`}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white text-[#111817] hover:bg-[#F7F5F0] border border-[#ECE9E2] font-medium"
          >
            {t('close')}
          </button>
        </div>

      </div>
    </div>
  );
};

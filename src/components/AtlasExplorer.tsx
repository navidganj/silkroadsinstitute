import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Layers, 
  SlidersHorizontal, 
  Compass, 
  Bookmark, 
  BookmarkCheck,
  Eye,
  FileText,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { initialProjects, initialCountries, initialCities } from '../data/seedData';
import { Project, Typology, HistoricalPeriod } from '../types';

interface AtlasExplorerProps {
  onSelectProject: (project: Project) => void;
  onSelectCity?: (cityId: string) => void;
  onSelectCountry?: (countryId: string) => void;
  preselectedCountryId?: string | null;
}

export const AtlasExplorer: React.FC<AtlasExplorerProps> = ({
  onSelectProject,
  onSelectCity,
  onSelectCountry,
  preselectedCountryId
}) => {
  const { language, t } = useLanguage();
  const { isProjectSaved, toggleSaveProject } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>(preselectedCountryId || 'all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedTypology, setSelectedTypology] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [viewLayout, setViewLayout] = useState<'grid' | 'timeline' | 'compact'>('grid');

  const typologies: { id: Typology; label: string; labelFa: string }[] = [
    { id: 'mosque', label: 'Mosque & Sanctuary', labelFa: 'مسجد و نیایشگاه' },
    { id: 'madrasa', label: 'Madrasa & Academy', labelFa: 'مدرسه و دارالعلم' },
    { id: 'caravanserai', label: 'Caravanserai & Khan', labelFa: 'کاروانسرا و رباط' },
    { id: 'mausoleum', label: 'Mausoleum & Tomb', labelFa: 'آرامگاه و مقبره' },
    { id: 'bazaar', label: 'Covered Bazaar & Taqi', labelFa: 'بازار مسقف و طاق' },
    { id: 'courtyard_house', label: 'Courtyard Residence', labelFa: 'خانه حیاط‌دار' },
    { id: 'cultural_center', label: 'Cultural Center & Museum', labelFa: 'مرکز فرهنگی و موزه' },
    { id: 'modern_residential', label: 'Modern & Kinetic Housing', labelFa: 'مسکن مدرن و کینتیک' }
  ];

  const periods: { id: HistoricalPeriod; label: string; labelFa: string }[] = [
    { id: 'early_islamic', label: 'Early Islamic & Samanid (8th-10th C)', labelFa: 'اوایل اسلام و سامانی (قرن ۲-۴ هـ)' },
    { id: 'seljuk', label: 'Seljuk Era (11th-12th C)', labelFa: 'عصر سلجوقی (قرن ۵-۶ هـ)' },
    { id: 'timurid', label: 'Timurid Renaissance (14th-15th C)', labelFa: 'رنسانس تیموری (قرن ۸-۹ هـ)' },
    { id: 'safavid', label: 'Safavid Golden Age (16th-17th C)', labelFa: 'عصر طلایی صفوی (قرن ۱۰-۱۱ هـ)' },
    { id: 'contemporary_21st', label: 'Contemporary 21st Century', labelFa: 'معماری معاصر قرن ۲۱' }
  ];

  const materialsList = [
    { id: 'brick', label: 'Baked & Kiln Brick', labelFa: 'آجر پخته و کوره‌ای' },
    { id: 'tile', label: 'Glazed Faience Tilework', labelFa: 'کاشی لعاب‌دار و معرق' },
    { id: 'stone', label: 'Ashlar & Basalt Stone', labelFa: 'سنگ تراش‌خورده و بازالت' },
    { id: 'adobe', label: 'Sun-Dried Mudbrick & Adobe', labelFa: 'خشت خام و گل کوبیده' },
    { id: 'concrete', label: 'Fair-Faced & GFRC Concrete', labelFa: 'بتن اکسپوز و GFRC' }
  ];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter(p => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q) || p.titleFa.includes(q);
        const matchCity = p.cityName.toLowerCase().includes(q) || p.cityNameFa.includes(q);
        const matchCountry = p.countryName.toLowerCase().includes(q) || p.countryNameFa.includes(q);
        const matchArchitect = p.architect.toLowerCase().includes(q) || p.architectFa.includes(q);
        const matchMaterial = p.materials.some(m => m.toLowerCase().includes(q)) || p.materialsFa.some(m => m.includes(q));
        if (!matchTitle && !matchCity && !matchCountry && !matchArchitect && !matchMaterial) {
          return false;
        }
      }

      // Country
      if (selectedCountry !== 'all' && p.countryId !== selectedCountry) {
        return false;
      }

      // City
      if (selectedCity !== 'all' && p.cityId !== selectedCity) {
        return false;
      }

      // Typology
      if (selectedTypology !== 'all' && p.typology !== selectedTypology) {
        return false;
      }

      // Period
      if (selectedPeriod !== 'all' && p.historicalPeriod !== selectedPeriod) {
        return false;
      }

      // Material
      if (selectedMaterial !== 'all') {
        const hasMat = p.materials.some(m => m.toLowerCase().includes(selectedMaterial)) ||
                       p.materialsFa.some(m => m.includes(selectedMaterial));
        if (!hasMat) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCountry, selectedCity, selectedTypology, selectedPeriod, selectedMaterial]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedCity('all');
    setSelectedTypology('all');
    setSelectedPeriod('all');
    setSelectedMaterial('all');
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#ECE9E2]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#008D8B] font-semibold mb-2">
              <Compass className="w-4 h-4" />
              <span>{language === 'fa' ? 'اطلس معماری جاده ابریشم' : 'Silk Road Architectural Atlas'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003B40] tracking-tight">
              {language === 'fa' ? 'بانک جامع مستندنگاری پروژه‌ها و ابنیه' : 'Documented Architectural Works & Projects'}
            </h1>
            <p className="text-sm text-[#616866] mt-1 max-w-2xl">
              {language === 'fa' 
                ? 'مجموعه تحلیل‌های تکتونیک، پلان‌ها، مقاطع فنی، ساختار گنبدها و هوش اقلیمی در پهنه کشورهای جاده ابریشم.'
                : 'Monographic architectural dossiers with verified drawings, squinch geometries, thermal climate data, and tectonic specifications.'}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-[#ECE9E2] p-1 rounded-md text-xs self-start md:self-auto">
            <button
              onClick={() => setViewLayout('grid')}
              className={`px-3 py-1.5 rounded font-medium transition-all ${
                viewLayout === 'grid' ? 'bg-[#004F54] text-white shadow-sm' : 'text-[#111817] hover:text-[#004F54]'
              }`}
            >
              {language === 'fa' ? 'نمای کارت' : 'Grid'}
            </button>
            <button
              onClick={() => setViewLayout('timeline')}
              className={`px-3 py-1.5 rounded font-medium transition-all ${
                viewLayout === 'timeline' ? 'bg-[#004F54] text-white shadow-sm' : 'text-[#111817] hover:text-[#004F54]'
              }`}
            >
              {language === 'fa' ? 'خط زمانی' : 'Timeline'}
            </button>
            <button
              onClick={() => setViewLayout('compact')}
              className={`px-3 py-1.5 rounded font-medium transition-all ${
                viewLayout === 'compact' ? 'bg-[#004F54] text-white shadow-sm' : 'text-[#111817] hover:text-[#004F54]'
              }`}
            >
              {language === 'fa' ? 'فهرست فنی' : 'Compact'}
            </button>
          </div>
        </div>

        {/* Multi-Facet Filter Bar */}
        <div className="bg-white border border-[#ECE9E2] rounded-xl p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-[#616866] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-[#F7F5F0] border border-[#ECE9E2] rounded-md pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#008D8B] text-[#111817]"
              />
            </div>

            {/* Country Select */}
            <div>
              <select
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#ECE9E2] rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#008D8B] text-[#111817]"
              >
                <option value="all">{t('allCountries')}</option>
                {initialCountries.map(c => (
                  <option key={c.id} value={c.id}>
                    {language === 'fa' ? c.nameFa : c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Typology Select */}
            <div>
              <select
                value={selectedTypology}
                onChange={e => setSelectedTypology(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#ECE9E2] rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#008D8B] text-[#111817]"
              >
                <option value="all">{t('allTypologies')}</option>
                {typologies.map(tItem => (
                  <option key={tItem.id} value={tItem.id}>
                    {language === 'fa' ? tItem.labelFa : tItem.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Period Select */}
            <div>
              <select
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#ECE9E2] rounded-md px-3 py-2 text-xs focus:outline-none focus:border-[#008D8B] text-[#111817]"
              >
                <option value="all">{t('allPeriods')}</option>
                {periods.map(pItem => (
                  <option key={pItem.id} value={pItem.id}>
                    {language === 'fa' ? pItem.labelFa : pItem.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-center">
              <button
                onClick={resetFilters}
                className="w-full text-xs text-[#616866] hover:text-[#004F54] py-2 px-3 rounded border border-[#ECE9E2] bg-[#F7F5F0] hover:bg-[#ECE9E2] transition-colors"
              >
                {t('clearFilters')}
              </button>
            </div>
          </div>

          {/* Quick Active Filter Pills */}
          <div className="flex items-center justify-between text-xs text-[#616866] pt-1">
            <span>
              {language === 'fa' 
                ? `نمایش ${filteredProjects.length} اثر معماری ثبت‌شده`
                : `Showing ${filteredProjects.length} documented architectural works`}
            </span>
          </div>
        </div>

        {/* Results Render */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white border border-[#ECE9E2] rounded-xl p-12 text-center space-y-3">
            <Compass className="w-10 h-10 text-[#616866]/40 mx-auto" />
            <div className="font-serif text-lg font-bold text-[#003B40]">
              {language === 'fa' ? 'اثری با این مشخصات یافت نشد' : 'No architectural works matched the selected criteria'}
            </div>
            <p className="text-xs text-[#616866] max-w-md mx-auto">
              {language === 'fa' 
                ? 'فیلترها را تغییر دهید یا به عنوان مشارکت‌کننده، پروژه جدیدی را برای ثبت پیشنهاد نمایید.'
                : 'Try adjusting your filters or propose a new project submission through the contributor portal.'}
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 text-xs text-[#008D8B] font-semibold hover:underline"
            >
              {t('clearFilters')}
            </button>
          </div>
        ) : viewLayout === 'grid' ? (
          /* Grid View Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              const saved = isProjectSaved(project.id);
              return (
                <div
                  key={project.id}
                  className="bg-white border border-[#ECE9E2] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Hero Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#ECE9E2]">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Period Badge */}
                    <div className="absolute top-3 left-3 bg-[#003B40]/90 backdrop-blur-sm text-[#C8A56A] text-[10px] font-semibold px-2.5 py-1 rounded">
                      {project.yearCompleted > 0 ? project.yearCompleted : `${Math.abs(project.yearCompleted)} BCE`} CE
                    </div>

                    {/* Bookmark action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveProject(project.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-[#004F54] text-white transition-colors backdrop-blur-sm"
                      title="Save Project"
                    >
                      {saved ? (
                        <BookmarkCheck className="w-4 h-4 text-[#C8A56A]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    {/* Drawings Available indicator */}
                    {project.drawings && project.drawings.length > 0 && (
                      <div className="absolute bottom-3 right-3 bg-[#008D8B] text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                        <FileText className="w-3 h-3" />
                        <span>{project.drawings.length} {language === 'fa' ? 'نقشه فنی' : 'Drawings'}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-[#008D8B] font-medium mb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{language === 'fa' ? project.cityNameFa : project.cityName}, {language === 'fa' ? project.countryNameFa : project.countryName}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#003B40] group-hover:text-[#008D8B] transition-colors leading-tight">
                        {language === 'fa' ? project.titleFa : project.title}
                      </h3>

                      <div className="text-xs text-[#616866] mt-1">
                        {language === 'fa' ? `معمار: ${project.architectFa}` : `Architect: ${project.architect}`}
                      </div>

                      <p className="text-xs text-[#616866] mt-2.5 line-clamp-2 leading-relaxed font-light">
                        {language === 'fa' ? project.descriptionFa : project.description}
                      </p>
                    </div>

                    {/* Material & Climate Tags */}
                    <div className="pt-3 border-t border-[#ECE9E2] space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.materials.slice(0, 2).map((m, idx) => (
                          <span
                            key={idx}
                            className="bg-[#ECE9E2]/70 text-[#003B40] text-[10px] px-2 py-0.5 rounded font-medium"
                          >
                            {m}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="w-full bg-[#F7F5F0] hover:bg-[#004F54] hover:text-white text-[#003B40] font-semibold text-xs py-2 px-3 rounded transition-colors flex items-center justify-center gap-1.5 border border-[#ECE9E2]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('readMore')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewLayout === 'timeline' ? (
          /* Timeline View Layout */
          <div className="relative pl-6 border-l-2 border-[#008D8B]/40 space-y-8 my-6">
            {filteredProjects
              .slice()
              .sort((a, b) => a.yearCompleted - b.yearCompleted)
              .map(project => (
                <div key={project.id} className="relative group cursor-pointer" onClick={() => onSelectProject(project)}>
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#004F54] border-2 border-[#C8A56A] group-hover:scale-125 transition-transform"></div>
                  
                  <div className="bg-white border border-[#ECE9E2] rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full sm:w-36 h-28 object-cover rounded-lg shrink-0"
                    />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#C8A56A] bg-[#003B40] px-2 py-0.5 rounded">
                          {project.yearCompleted} CE
                        </span>
                        <span className="text-xs text-[#008D8B]">
                          {language === 'fa' ? project.cityNameFa : project.cityName}, {language === 'fa' ? project.countryNameFa : project.countryName}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#003B40]">
                        {language === 'fa' ? project.titleFa : project.title}
                      </h3>
                      <p className="text-xs text-[#616866] line-clamp-2">
                        {language === 'fa' ? project.descriptionFa : project.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          /* Compact Table / List Layout */
          <div className="bg-white border border-[#ECE9E2] rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#003B40] text-[#ECE9E2] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">{language === 'fa' ? 'نام اثر' : 'Project Title'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'مکان' : 'Location'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'معمار' : 'Architect'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'سال تکمیل' : 'Year'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'گونه‌شناسی' : 'Typology'}</th>
                    <th className="py-3 px-4 text-right">{language === 'fa' ? 'اقدام' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE9E2]">
                  {filteredProjects.map(project => (
                    <tr
                      key={project.id}
                      onClick={() => onSelectProject(project)}
                      className="hover:bg-[#F7F5F0] cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-[#003B40]">
                        {language === 'fa' ? project.titleFa : project.title}
                      </td>
                      <td className="py-3 px-4 text-[#616866]">
                        {language === 'fa' ? project.cityNameFa : project.cityName}, {language === 'fa' ? project.countryNameFa : project.countryName}
                      </td>
                      <td className="py-3 px-4 text-[#616866]">
                        {language === 'fa' ? project.architectFa : project.architect}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#008D8B]">
                        {project.yearCompleted} CE
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-[#ECE9E2] text-[#003B40] px-2 py-0.5 rounded text-[10px]">
                          {project.typology}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-[#008D8B] font-semibold hover:underline">
                          {language === 'fa' ? 'مشاهده پرونده' : 'View'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

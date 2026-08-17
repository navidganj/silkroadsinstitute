import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Compass, 
  Sliders, 
  BookOpen, 
  Archive, 
  BarChart3, 
  Users, 
  Layers, 
  Search,
  ExternalLink,
  Building2,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Project, ResearchItem } from '../types';
import { initialProjects, initialResearchItems } from '../data/seedData';

interface HomeEditorialSectionsProps {
  onNavigateTab: (tab: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenSearch: () => void;
  onSelectResearchItem?: (item: ResearchItem) => void;
}

export const HomeEditorialSections: React.FC<HomeEditorialSectionsProps> = ({
  onNavigateTab,
  onSelectProject,
  onOpenSearch,
  onSelectResearchItem
}) => {
  const { language, direction } = useLanguage();
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Platform items matching the 9 icons in the reference UI mockup
  const platformTools = [
    {
      id: 'atlas',
      title: 'Atlas',
      titleFa: 'اطلس',
      tab: 'atlas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#008D8B]">
          <path d="M12 3L3 8L12 13L21 8L12 3Z" stroke="#008D8B" strokeWidth="1.5" />
          <path d="M3 13L12 18L21 13" stroke="#004F54" strokeWidth="1.5" />
          <path d="M3 18L12 23L21 18" stroke="#B38048" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'compare',
      title: 'Cities & Comparative Urban Studies',
      titleFa: 'شهرها و مطالعات تطبیقی شهری',
      titleShort: 'Cities & Urban Studies',
      tab: 'compare',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#B38048]">
          <rect x="3" y="3" width="7" height="7" stroke="#B38048" strokeWidth="1.5" />
          <rect x="14" y="3" width="7" height="7" stroke="#008D8B" strokeWidth="1.5" />
          <rect x="3" y="14" width="7" height="7" stroke="#004F54" strokeWidth="1.5" />
          <path d="M14 17.5H21M17.5 14V21" stroke="#B38048" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'research',
      title: 'Research Journal',
      titleFa: 'نشریه پژوهشی',
      tab: 'research',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#004F54]">
          <path d="M4 19.5V4.5C4 3.67 4.67 3 5.5 3H18.5C19.33 3 20 3.67 20 4.5V19.5" stroke="#004F54" strokeWidth="1.5" />
          <path d="M4 19.5C4 18.67 4.67 18 5.5 18H20" stroke="#B38048" strokeWidth="1.5" />
          <line x1="8" y1="8" x2="16" y2="8" stroke="#008D8B" strokeWidth="1.5" />
          <line x1="8" y1="12" x2="14" y2="12" stroke="#008D8B" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'archive',
      title: 'Digital Archive',
      titleFa: 'آرشیو دیجیتال',
      tab: 'archive',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#B38048]">
          <path d="M3 6C3 4.89 3.89 4 5 4H19C20.11 4 21 4.89 21 6V18C21 19.11 20.11 20 19 20H5C3.89 20 3 19.11 3 18V6Z" stroke="#B38048" strokeWidth="1.5" />
          <path d="M3 10H21" stroke="#008D8B" strokeWidth="1.5" />
          <circle cx="12" cy="15" r="2" stroke="#004F54" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'observatory',
      title: 'Observatory Data & Insights',
      titleFa: 'داده‌ها و بینش‌های رصدخانه',
      tab: 'observatory',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#008D8B]">
          <circle cx="12" cy="12" r="9" stroke="#008D8B" strokeWidth="1.5" />
          <path d="M12 3V12L18.5 15.5" stroke="#B38048" strokeWidth="1.5" />
          <path d="M12 12L7.5 16.5" stroke="#004F54" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'network',
      title: 'Network Collaboration',
      titleFa: 'همکاری‌های شبکه',
      tab: 'network',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#004F54]">
          <circle cx="12" cy="6" r="3" stroke="#004F54" strokeWidth="1.5" />
          <circle cx="6" cy="18" r="3" stroke="#B38048" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="3" stroke="#008D8B" strokeWidth="1.5" />
          <line x1="12" y1="9" x2="6" y2="15" stroke="#004F54" strokeWidth="1.2" strokeDasharray="2,2" />
          <line x1="12" y1="9" x2="18" y2="15" stroke="#004F54" strokeWidth="1.2" strokeDasharray="2,2" />
          <line x1="9" y1="18" x2="15" y2="18" stroke="#B38048" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      id: 'programs',
      title: 'Programs & Fellowships',
      titleFa: 'برنامه‌ها و بورسیه‌ها',
      tab: 'programs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#B38048]">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#B38048" strokeWidth="1.5" />
          <path d="M2 17L12 22L22 17" stroke="#004F54" strokeWidth="1.5" />
          <path d="M2 12L12 17L22 12" stroke="#008D8B" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 'events',
      title: 'Events & Forums',
      titleFa: 'رویدادها و نشست‌ها',
      tab: 'events',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#008D8B]">
          <rect x="3" y="4" width="18" height="17" rx="2" stroke="#008D8B" strokeWidth="1.5" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="#004F54" strokeWidth="1.5" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="#004F54" strokeWidth="1.5" />
          <line x1="3" y1="10" x2="21" y2="10" stroke="#B38048" strokeWidth="1.5" />
          <circle cx="12" cy="15" r="1.5" fill="#004F54" />
        </svg>
      )
    },
    {
      id: 'search',
      title: 'Search & Discover',
      titleFa: 'جستجو و کشف',
      isSearch: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#004F54]">
          <circle cx="11" cy="11" r="7" stroke="#004F54" strokeWidth="1.5" />
          <path d="M20 20L16 16" stroke="#B38048" strokeWidth="2" strokeLinecap="round" />
          <circle cx="11" cy="11" r="3" stroke="#008D8B" strokeWidth="1.2" strokeDasharray="1.5,1.5" />
        </svg>
      )
    }
  ];

  // 6 Curated projects matching the exact horizontal visual gallery in the mockup
  const curatedProjects = [
    {
      id: 'proj-1',
      title: 'Khorasan Cultural Center',
      titleFa: 'مرکز فرهنگی خراسان',
      city: 'Mashhad',
      country: 'Iran',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
      typology: 'Contemporary Monolithic'
    },
    {
      id: 'proj-2',
      title: 'Tashkent Modern Timber Atelier',
      titleFa: 'کارگاه معماری معاصر تاشکند',
      city: 'Tashkent',
      country: 'Uzbekistan',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      typology: 'Lattice Structure'
    },
    {
      id: 'proj-3',
      title: 'Tabriz Grand Bazaar Vaults',
      titleFa: 'طاق‌های بازار بزرگ تبریز',
      city: 'Tabriz',
      country: 'Iran',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
      typology: 'Brick Vaulting'
    },
    {
      id: 'proj-4',
      title: 'Tehran Parametric Brick Pavilion',
      titleFa: 'پاویون آجرکاری پارامتریک تهران',
      city: 'Tehran',
      country: 'Iran',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      typology: 'Parametric Masonry'
    },
    {
      id: 'proj-5',
      title: 'Yazd Desert Caravanserai Arcade',
      titleFa: 'گذر طاقی کاروانسرای یزد',
      city: 'Yazd',
      country: 'Iran',
      image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=600&q=80',
      typology: 'Vernacular Arcade'
    },
    {
      id: 'proj-6',
      title: 'Samarkand Madrasa Colonnade',
      titleFa: 'رواق مدرسه ریگستان',
      city: 'Samarkand',
      country: 'Uzbekistan',
      image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=600&q=80',
      typology: 'Historic Monument'
    }
  ];

  const handleNextProject = () => {
    setCarouselIndex(prev => (prev + 1) % curatedProjects.length);
  };

  const handlePrevProject = () => {
    setCarouselIndex(prev => (prev - 1 + curatedProjects.length) % curatedProjects.length);
  };

  return (
    <div className="space-y-12 sm:space-y-16 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
      
      {/* ========================================================================= */}
      {/* SECTION 1: "OUR PLATFORM" + "FEATURED COMPARISON" (2-Column Bento Strip)  */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* Left Card: OUR PLATFORM (60% width) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ECE9E2] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B38048] mb-1">
              {language === 'fa' ? 'پلتفرم ما' : 'OUR PLATFORM'}
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#003B40] mb-6">
              {language === 'fa' ? 'کاوش. مقایسه. همکاری.' : 'Explore. Compare. Collaborate.'}
            </h2>

            {/* Grid of Platform Tools (3x3 on desktop/mobile) */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
              {platformTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    if (tool.isSearch) {
                      onOpenSearch();
                    } else if (tool.tab) {
                      onNavigateTab(tool.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="flex flex-col items-center justify-start p-3 sm:p-4 rounded-2xl hover:bg-[#FAF8F3] border border-transparent hover:border-[#ECE9E2] transition-all group text-center cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F3] group-hover:bg-white group-hover:shadow-xs flex items-center justify-center transition-all mb-2">
                    {tool.icon}
                  </div>
                  <span className="font-sans font-bold text-xs sm:text-xs text-[#003B40] group-hover:text-[#008D8B] transition-colors leading-tight">
                    {language === 'fa' ? tool.titleFa : tool.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: FEATURED COMPARISON (40% width) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#ECE9E2] overflow-hidden shadow-xs flex flex-col justify-between group">
          <div className="p-6 sm:p-7 space-y-4">
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B38048]">
              {language === 'fa' ? 'مطالعه تطبیقی برگزیده' : 'FEATURED COMPARISON'}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#003B40] leading-tight">
              <span>{language === 'fa' ? 'اصفهان' : 'Isfahan'}</span>{' '}
              <span className="font-serif italic font-normal text-[#B38048]">{language === 'fa' ? 'در برابر' : 'vs'}</span>{' '}
              <span>{language === 'fa' ? 'سمرقند' : 'Samarkand'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#616866] leading-relaxed">
              {language === 'fa' 
                ? 'دو شاهراه تاریخی. خرد جاودان شهری. درس‌هایی برای معماری معاصر.'
                : 'Two historic crossroads. Timeless urban wisdom. Contemporary lessons.'}
            </p>

            <button
              onClick={() => {
                onNavigateTab('compare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-2 text-xs font-bold uppercase tracking-wider text-[#003B40] hover:text-[#008D8B] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{language === 'fa' ? 'مشاهده مقایسه' : 'EXPLORE COMPARISON'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-3.5 h-3.5 text-[#008D8B]" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 text-[#008D8B]" />
              )}
            </button>
          </div>

          {/* Diagonal / Angular visual split image */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#002B2E]">
            <img 
              src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80" 
              alt="Isfahan vs Samarkand Architecture"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: "CURATED PROJECTS" Horizontal Gallery                          */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-serif font-bold text-xs sm:text-sm uppercase tracking-wider text-[#003B40]">
              {language === 'fa' ? 'پروژه‌های برگزیده معماری' : 'CURATED PROJECTS'}
            </h2>
            <button
              onClick={() => {
                onNavigateTab('atlas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-[#616866] hover:text-[#008D8B] font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{language === 'fa' ? 'مشاهده همه پروژه‌ها' : 'View all projects'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-3 h-3 text-[#008D8B]" />
              ) : (
                <ArrowRight className="w-3 h-3 text-[#008D8B]" />
              )}
            </button>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevProject}
              className="w-7 h-7 rounded-full border border-[#ECE9E2] bg-white hover:bg-[#FAF8F3] hover:border-[#004F54] flex items-center justify-center text-[#003B40] transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextProject}
              className="w-7 h-7 rounded-full border border-[#ECE9E2] bg-white hover:bg-[#FAF8F3] hover:border-[#004F54] flex items-center justify-center text-[#003B40] transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Project Strip (6 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {curatedProjects.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => {
                const matched = initialProjects.find(p => p.id === proj.id) || initialProjects[idx % initialProjects.length];
                onSelectProject(matched);
              }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#002B2E] border border-[#ECE9E2] shadow-2xs cursor-pointer"
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
                <div className="text-[9px] uppercase tracking-wider text-[#C8A56A] font-semibold truncate">
                  {proj.city}, {proj.country}
                </div>
                <div className="font-serif font-bold text-xs truncate leading-snug">
                  {language === 'fa' ? proj.titleFa : proj.title}
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: 3 FEATURED EDITORIAL CARDS                                     */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {/* Card 1: FEATURED RESEARCH */}
        <div className="bg-white rounded-3xl border border-[#ECE9E2] p-6 shadow-xs flex flex-col justify-between hover:border-[#008D8B] transition-colors group">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B38048]">
                {language === 'fa' ? 'پژوهش برگزیده' : 'FEATURED RESEARCH'}
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#003B40] leading-snug">
                {language === 'fa' ? 'حیاط‌های مرکزی در امتداد جاده‌های ابریشم' : 'Urban Courtyards Across the Silk Roads'}
              </h3>
              <p className="text-xs text-[#616866] leading-relaxed">
                {language === 'fa' 
                  ? 'مطالعه تطبیقی گونه‌های حیاط مرکزی و خرد انطباق با اقلیم از اصفهان تا شی‌آن.'
                  : 'A comparative study of courtyard typologies and climate-adaptive wisdom from Isfahan to Xi’an.'}
              </p>
            </div>

            {/* Book cover visual on right */}
            <div className="w-20 h-28 shrink-0 rounded-lg bg-[#FAF8F3] border border-[#ECE9E2] shadow-sm p-2 flex flex-col justify-between overflow-hidden relative">
              <div className="text-[7px] font-bold uppercase tracking-widest text-[#004F54] font-serif">
                SILK ROAD JOURNAL
              </div>
              <div className="w-8 h-8 rounded-full border border-[#B38048]/40 mx-auto my-auto flex items-center justify-center">
                <div className="w-4 h-4 rotate-45 border border-[#008D8B]"></div>
              </div>
              <div className="text-[6px] text-[#8A918F] text-center">SRADI 2026</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECE9E2]/60 mt-4">
            <button
              onClick={() => {
                onNavigateTab('research');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold uppercase tracking-wider text-[#003B40] group-hover:text-[#008D8B] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{language === 'fa' ? 'مطالعه مقاله' : 'READ RESEARCH'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-3.5 h-3.5 text-[#008D8B]" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 text-[#008D8B]" />
              )}
            </button>
          </div>
        </div>

        {/* Card 2: UPCOMING EVENT */}
        <div className="bg-white rounded-3xl border border-[#ECE9E2] p-6 shadow-xs flex flex-col justify-between hover:border-[#008D8B] transition-colors group">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B38048]">
                {language === 'fa' ? 'رویداد پیش‌رو' : 'UPCOMING EVENT'}
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#003B40] leading-snug">
                {language === 'fa' ? 'کنگره بین‌المللی شهرهای جاده ابریشم ۲۰۲۶' : 'Silk Road Cities Summit 2026'}
              </h3>
              
              <div className="space-y-1 text-xs text-[#2D3332]">
                <div className="flex items-center gap-1.5 text-[#616866]">
                  <Calendar className="w-3.5 h-3.5 text-[#008D8B]" />
                  <span>{language === 'fa' ? '۱۴ – ۱۶ اکتبر ۲۰۲۶' : 'October 14–16, 2026'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#616866]">
                  <MapPin className="w-3.5 h-3.5 text-[#B38048]" />
                  <span>{language === 'fa' ? 'اصفهان، ایران' : 'Isfahan, Iran'}</span>
                </div>
              </div>

              <p className="text-xs text-[#616866] leading-relaxed">
                {language === 'fa' 
                  ? 'گردهمایی جهانی معماران، پژوهشگران، برنامه‌ریزان شهری و رهبران فرهنگی.'
                  : 'A global gathering of architects, scholars, planners and cultural leaders.'}
              </p>
            </div>

            {/* Event photo thumbnail */}
            <div className="w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-[#ECE9E2] shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=300&q=80" 
                alt="Silk Road Cities Summit 2026"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECE9E2]/60 mt-4">
            <button
              onClick={() => {
                onNavigateTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold uppercase tracking-wider text-[#003B40] group-hover:text-[#008D8B] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{language === 'fa' ? 'مشاهده جزئیات' : 'VIEW DETAILS'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-3.5 h-3.5 text-[#008D8B]" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 text-[#008D8B]" />
              )}
            </button>
          </div>
        </div>

        {/* Card 3: JOIN THE NETWORK */}
        <div className="bg-white rounded-3xl border border-[#ECE9E2] p-6 shadow-xs flex flex-col justify-between hover:border-[#008D8B] transition-colors group">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B38048]">
                {language === 'fa' ? 'عضویت در شبکه' : 'JOIN THE NETWORK'}
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#003B40] leading-snug">
                {language === 'fa' ? 'بخشی از یک جامعه جهانی دانش باشید.' : 'Be part of a global knowledge community.'}
              </h3>
              <p className="text-xs text-[#616866] leading-relaxed">
                {language === 'fa' 
                  ? 'در پژوهش‌ها مشارکت کنید، دانش خود را به اشتراک بگذارید و آینده شهرهایمان را با هم بسازیم.'
                  : 'Collaborate on research, share knowledge and shape the future of our cities together.'}
              </p>
            </div>

            {/* Geometric Emblem SVG on right */}
            <div className="w-20 h-28 shrink-0 flex items-center justify-center">
              <div className="w-16 h-16 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                  <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" fill="#004F54" opacity="0.9" />
                  <rect x="28" y="28" width="44" height="44" fill="#C8A56A" opacity="0.8" />
                  <rect x="35" y="35" width="30" height="30" transform="rotate(45 50 50)" fill="#008D8B" />
                  <circle cx="50" cy="50" r="6" fill="#FAF8F3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECE9E2]/60 mt-4">
            <button
              onClick={() => {
                onNavigateTab('network');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold uppercase tracking-wider text-[#003B40] group-hover:text-[#008D8B] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{language === 'fa' ? 'درخواست عضویت' : 'APPLY / JOIN'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-3.5 h-3.5 text-[#008D8B]" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 text-[#008D8B]" />
              )}
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};

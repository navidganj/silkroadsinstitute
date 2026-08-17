import React, { useState, useMemo } from 'react';
import { 
  Globe2, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Handshake, 
  Sparkles, 
  Filter, 
  Search, 
  Layers, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Share2,
  Compass,
  CheckCircle2,
  ChevronRight,
  Info,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface NetworkNode {
  id: string;
  name: string;
  nameFa: string;
  city: string;
  cityFa: string;
  country: string;
  countryFa: string;
  type: 'university' | 'practice' | 'laboratory' | 'field_station';
  corridor: 'northern' | 'plateau' | 'anatolia' | 'maritime' | 'indus';
  x: number; // percentage coordinates on map (0 - 100)
  y: number;
  scholarsCount: number;
  projectsCount: number;
  established: number;
  focusArea: string;
  focusAreaFa: string;
  leadFellow: string;
  leadFellowFa: string;
  activeGrant?: string;
  activeGrantFa?: string;
  avatarUrl?: string;
}

export interface NetworkConnection {
  id: string;
  from: string;
  to: string;
  title: string;
  titleFa: string;
  initiativeType: 'joint_survey' | 'fellowship' | 'materials_testing' | 'digital_archive';
  year: number;
  status: 'active' | 'published';
}

export const NetworkMapVisualizer: React.FC<{
  onSelectNode?: (node: NetworkNode) => void;
  onNavigateToTab?: (tab: string) => void;
}> = ({ onSelectNode, onNavigateToTab }) => {
  const { language, direction } = useLanguage();

  // Active filters
  const [selectedCorridor, setSelectedCorridor] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeNodeId, setActiveNodeId] = useState<string | null>('samarkand_inst');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showConnections, setShowConnections] = useState<boolean>(true);
  const [pulseAnimation, setPulseAnimation] = useState<boolean>(true);

  // Strategic Silk Road Research Hubs
  const nodes: NetworkNode[] = [
    {
      id: 'isfahan_uni',
      name: 'Isfahan University of Art - Traditional Architecture Lab',
      nameFa: 'دانشگاه هنر اصفهان — پژوهشکده معماری سنتی و تاق‌ها',
      city: 'Isfahan',
      cityFa: 'اصفهان',
      country: 'Iran',
      countryFa: 'ایران',
      type: 'university',
      corridor: 'plateau',
      x: 46,
      y: 56,
      scholarsCount: 28,
      projectsCount: 142,
      established: 1999,
      focusArea: 'Geometry of Vaults, Qanats & Vernacular Cooling',
      focusAreaFa: 'هندسه طاق و گنبد، کاریزها و تهویه ایستا در اقلیم گرم و خشک',
      leadFellow: 'Prof. Dr. Farhad Tehrani',
      leadFellowFa: 'دکتر فرهاد طهرانی',
      activeGrant: 'Silk Road Hydraulic Infrastructure Survey (2025-2027)',
      activeGrantFa: 'طرح جامع مستندسازی سازه‌های آبی جاده ابریشم'
    },
    {
      id: 'samarkand_inst',
      name: 'Samarkand Institute of Architecture & Construction',
      nameFa: 'موسسه دولتی معماری و شهرسازی سمرقند',
      city: 'Samarkand',
      cityFa: 'سمرقند',
      country: 'Uzbekistan',
      countryFa: 'ازبکستان',
      type: 'university',
      corridor: 'northern',
      x: 64,
      y: 35,
      scholarsCount: 34,
      projectsCount: 198,
      established: 1966,
      focusArea: 'Timurid Brick Masonry, Ceramic Tile Glazing & Restoration',
      focusAreaFa: 'آجرکاری تیموری، فناوری لعاب کاشی هفت‌رنگ و مرمت پایدار',
      leadFellow: 'Dr. Rustam Mirzayev',
      leadFellowFa: 'دکتر رستم میرزایف',
      activeGrant: 'Trans-Oxiana Monument 3D LiDAR Preservation Project',
      activeGrantFa: 'پروژه اسکن سه‌بعدی لیدار بناهای ماوراءالنهر'
    },
    {
      id: 'istanbul_tech',
      name: 'Istanbul Technical University (İTÜ) Heritage Dept',
      nameFa: 'دانشگاه فنی استانبول (İTÜ) — دپارتمان مرمت و معماری تاریخی',
      city: 'Istanbul',
      cityFa: 'استانبول',
      country: 'Türkiye',
      countryFa: 'ترکیه',
      type: 'university',
      corridor: 'anatolia',
      x: 18,
      y: 28,
      scholarsCount: 42,
      projectsCount: 230,
      established: 1773,
      focusArea: 'Ottoman Caravanserais, Domes & Seismic Masonry',
      focusAreaFa: 'کاروانسراهای عثمانی، گنبدهای مرکب و پایدارسازی لرزه‌ای',
      leadFellow: 'Prof. Zeynep Ahunbay',
      leadFellowFa: 'پروفسور زینب آهون‌بای',
      activeGrant: 'Anatolia-Levant Trade Route Station Network',
      activeGrantFa: 'شبکه پایگاه‌های تجاری آناتولی و شامات'
    },
    {
      id: 'tehran_lab',
      name: 'Tehran Heritage Conservation & Adobe Material Lab',
      nameFa: 'آزمایشگاه تخصصی حفاظت و مواد خشتی تهران',
      city: 'Tehran',
      cityFa: 'تهران',
      country: 'Iran',
      countryFa: 'ایران',
      type: 'laboratory',
      corridor: 'plateau',
      x: 44,
      y: 42,
      scholarsCount: 19,
      projectsCount: 88,
      established: 2012,
      focusArea: 'Bio-stabilized Earth, Mud-Brick Seismic Reinforcement',
      focusAreaFa: 'خشت زیست‌پایدار، بهسازی لرزه‌ای مصالح بومی و کاهگل',
      leadFellow: 'Eng. Soroosh Ganjavi',
      leadFellowFa: 'مهندس سروش گنجوی',
      activeGrant: 'Central Plateau Adobe Structural Strength Study',
      activeGrantFa: 'مطالعه رفتار لرزه‌ای ابنیه خشتی فلات مرکزی'
    },
    {
      id: 'baku_academy',
      name: 'Azerbaijan National Architecture Academy',
      nameFa: 'آکادمی ملی معماری و باستان‌شناسی آذربایجان',
      city: 'Baku',
      cityFa: 'باکو',
      country: 'Azerbaijan',
      countryFa: 'جمهوری آذربایجان',
      type: 'university',
      corridor: 'anatolia',
      x: 34,
      y: 30,
      scholarsCount: 16,
      projectsCount: 65,
      established: 1945,
      focusArea: 'Shirvanshah Stone Tectonics & Caspian Port Fortifications',
      focusAreaFa: 'معماری سنگی شروان‌شاهان و استحکامات بندری کاسپین',
      leadFellow: 'Dr. Ilham Aliyev-Zadeh',
      leadFellowFa: 'دکتر الهام علی‌زاده',
      activeGrant: 'Caspian Silk Road Coastal Trade Hubs',
      activeGrantFa: 'پژوهش بنادر تجاری راه ابریشم در حوزه کاسپین'
    },
    {
      id: 'bukhara_station',
      name: 'Bukhara Oasis Architectural Field Research Station',
      nameFa: 'پایگاه میدانی پژوهش‌های معماری واحه بخارا',
      city: 'Bukhara',
      cityFa: 'بخارا',
      country: 'Uzbekistan',
      countryFa: 'ازبکستان',
      type: 'field_station',
      corridor: 'northern',
      x: 58,
      y: 38,
      scholarsCount: 14,
      projectsCount: 94,
      established: 2008,
      focusArea: 'Covered Bazaars (Taqi), Madrasa Courtyards & Microclimates',
      focusAreaFa: 'راسته‌های مسقف (طاق‌ها)، حیاط مدارس و آسایش اقلیمی',
      leadFellow: 'Dr. Aziza Karimova',
      leadFellowFa: 'دکتر عزیزه کریموا',
      activeGrant: 'Vernacular Climate Strategies in Desert Cities',
      activeGrantFa: 'راهکارهای بومی آسایش اقلیمی در شهرهای کویری'
    },
    {
      id: 'kashgar_studio',
      name: 'Kashgar Oasis Vernacular Atelier & Timber Research',
      nameFa: 'آتلیه معماری بومی و پژوهش‌های سازه چوبی کاشغر',
      city: 'Kashgar',
      cityFa: 'کاشغر',
      country: 'China',
      countryFa: 'چین',
      type: 'practice',
      corridor: 'northern',
      x: 77,
      y: 36,
      scholarsCount: 12,
      projectsCount: 52,
      established: 2015,
      focusArea: 'Carved Poplar Timber Framing, Aywan & Courtyard Homes',
      focusAreaFa: 'سازه‌های چوب سپیدار، ایوان‌های سایه‌انداز و خانه‌های سنتی',
      leadFellow: 'Master Arch. Tursun Mamut',
      leadFellowFa: 'استاد تورسون مموت',
      activeGrant: 'Taklamakan Edge Architectural Traditions Study',
      activeGrantFa: 'سنت‌های معماری حاشیه بیابان تکله‌مکان'
    },
    {
      id: 'lahore_nca',
      name: 'National College of Arts (NCA) - Silk Road Studio',
      nameFa: 'کالج ملی هنر لاهور (NCA) — آتلیه معماری ابریشم',
      city: 'Lahore',
      cityFa: 'لاهور',
      country: 'Pakistan',
      countryFa: 'پاکستان',
      type: 'university',
      corridor: 'indus',
      x: 72,
      y: 60,
      scholarsCount: 22,
      projectsCount: 110,
      established: 1875,
      focusArea: 'Mughal Brick & Marble Inlay, Shalamar Water Garden Hydraulics',
      focusAreaFa: 'معماری گورکانی، پیوند آجر و سنگ، و سیستم آبی باغ شالامار',
      leadFellow: 'Prof. Kamil Khan Mumtaz',
      leadFellowFa: 'پروفسور کامل خان ممتاز',
      activeGrant: 'Indus-Ganges Vernacular Vaulting Survey',
      activeGrantFa: 'بررسی تطبیقی تاق‌های سنتی حوزه سند و گنگ'
    },
    {
      id: 'xian_lab',
      name: "Xi'an Jiaotong Univ - Eastern Terminal Silk Road Center",
      nameFa: 'دانشگاه شی‌آن جیائوتونگ — مرکز مبدأ شرقی جاده ابریشم',
      city: "Xi'an",
      cityFa: 'شی‌آن',
      country: 'China',
      countryFa: 'چین',
      type: 'university',
      corridor: 'northern',
      x: 91,
      y: 50,
      scholarsCount: 38,
      projectsCount: 260,
      established: 1896,
      focusArea: 'Dougong Timber Brackets, Tang Urban Grids & Pagoda Engineering',
      focusAreaFa: 'اتصالات چوبی دوگونگ، شبکه شطرنجی شهر تانگ و مهندسی پاگودا',
      leadFellow: 'Prof. Li Xiaodong',
      leadFellowFa: 'پروفسور لی شیائودونگ',
      activeGrant: 'Eurasian Comparative Timber and Masonry Joinery',
      activeGrantFa: 'مطالعه تطبیقی اتصالات چوبی و سنگی اوراسیا'
    },
    {
      id: 'hormuz_station',
      name: 'Persian Gulf & Maritime Silk Road Field Station',
      nameFa: 'پایگاه مطالعات معماری دریایی خلیج فارس و مکران',
      city: 'Bandar Abbas',
      cityFa: 'بندرعباس و قشم',
      country: 'Iran',
      countryFa: 'ایران',
      type: 'field_station',
      corridor: 'maritime',
      x: 52,
      y: 74,
      scholarsCount: 11,
      projectsCount: 45,
      established: 2018,
      focusArea: 'Coral Stone Masonry, Windcatchers in High Humidity & Coastal Wells',
      focusAreaFa: 'سنگ‌های مرجانی، بادگیرهای بومی مناطق شرجی و برکه‌های آب',
      leadFellow: 'Dr. Maryam Daryaei',
      leadFellowFa: 'دکتر مریم دریایی',
      activeGrant: 'Maritime Monsoon Architecture Documentation',
      activeGrantFa: 'مستندسازی معماری اقلیم موسمی و کرانه‌ای'
    }
  ];

  // Dynamic Collaborative Knowledge Arcs
  const connections: NetworkConnection[] = [
    {
      id: 'c1',
      from: 'isfahan_uni',
      to: 'samarkand_inst',
      title: 'Joint Vaulting & Muqarnas Digital Geometry Corpus',
      titleFa: 'پروژه مشترک ژئومتری دیجیتال مقرنس‌ها و تاق‌های اصفهان و سمرقند',
      initiativeType: 'joint_survey',
      year: 2025,
      status: 'active'
    },
    {
      id: 'c2',
      from: 'samarkand_inst',
      to: 'xian_lab',
      title: 'Oasis Trading Stations: Comparative Masonry & Timber Joinery',
      titleFa: 'ایستگاه‌های تجاری واحه: تطبیق اتصالات چوبی و مصالح بنایی چین و ماوراءالنهر',
      initiativeType: 'materials_testing',
      year: 2025,
      status: 'active'
    },
    {
      id: 'c3',
      from: 'istanbul_tech',
      to: 'isfahan_uni',
      title: 'Caravanserai Spatial Morphology & Trade Route Logistics',
      titleFa: 'ریخت‌شناسی فضایی کاروانسراها و لجستیک راه‌های تجاری ایران و عثمانی',
      initiativeType: 'digital_archive',
      year: 2024,
      status: 'published'
    },
    {
      id: 'c4',
      from: 'isfahan_uni',
      to: 'tehran_lab',
      title: 'Seismic Resilience Testing of Historic Unreinforced Earth Vaults',
      titleFa: 'تست آزمایشگاهی رفتار لرزه‌ای طاق‌های خشتی غیرمسلح',
      initiativeType: 'materials_testing',
      year: 2026,
      status: 'active'
    },
    {
      id: 'c5',
      from: 'samarkand_inst',
      to: 'bukhara_station',
      title: 'Restoration Protocol for Central Asian Adobe Madrasas',
      titleFa: 'دستورالعمل جامع مرمت مدارس خشتی آسیای میانه',
      initiativeType: 'joint_survey',
      year: 2025,
      status: 'active'
    },
    {
      id: 'c6',
      from: 'samarkand_inst',
      to: 'kashgar_studio',
      title: 'Pamir-Tian Shan Traditional Timber Framing Exchanges',
      titleFa: 'تبادل تجربیات مهندسی سازه‌های چوبی پامیر و تیان‌شان',
      initiativeType: 'fellowship',
      year: 2025,
      status: 'active'
    },
    {
      id: 'c7',
      from: 'isfahan_uni',
      to: 'lahore_nca',
      title: 'Persian-Mughal Garden Hydraulics and Pavilion Architecture',
      titleFa: 'مهندسی آب در باغ‌های ایرانی و گورکانی و کوشک‌های تاریخی',
      initiativeType: 'fellowship',
      year: 2026,
      status: 'active'
    },
    {
      id: 'c8',
      from: 'isfahan_uni',
      to: 'hormuz_station',
      title: 'Maritime Silk Route Coastal Fortress & Water Cistern Network',
      titleFa: 'شبکه آب‌انبارهای ساحلی و قلعه‌های دریایی راه ابریشم جنوب',
      initiativeType: 'joint_survey',
      year: 2025,
      status: 'active'
    },
    {
      id: 'c9',
      from: 'istanbul_tech',
      to: 'baku_academy',
      title: 'Caucasian Gateway: Stone Masonry Restoration Protocols',
      titleFa: 'دروازه قفقاز: شیوه‌نامه مرمت ابنیه سنگی تاریخی',
      initiativeType: 'joint_survey',
      year: 2024,
      status: 'published'
    }
  ];

  // Corridors list
  const corridors = [
    { id: 'all', label: 'All Silk Corridors', labelFa: 'همه کریدورهای ابریشم' },
    { id: 'northern', label: 'Northern Silk Corridor (Trans-Oxiana to Xi’an)', labelFa: 'کریدور شمالی (ماوراءالنهر به شی‌آن)' },
    { id: 'plateau', label: 'Iranian Plateau & Oasis Network', labelFa: 'فلات ایران و شبکه واحه‌ها' },
    { id: 'anatolia', label: 'Anatolian & Caucasian Gateway', labelFa: 'دروازه آناتولی و قفقاز' },
    { id: 'indus', label: 'Indus Valley & Himalayan Routes', labelFa: 'حوزه سند و دامنه‌های هیمالیا' },
    { id: 'maritime', label: 'Maritime Spice & Gulf Route', labelFa: 'راه دریایی ادویه و خلیج فارس' },
  ];

  const types = [
    { id: 'all', label: 'All Node Types', labelFa: 'همه مراکز' },
    { id: 'university', label: 'Universities & Faculties', labelFa: 'دانشگاه‌ها و دانشکده‌ها' },
    { id: 'laboratory', label: 'Research & Materials Labs', labelFa: 'آزمایشگاه‌های تخصصی' },
    { id: 'field_station', label: 'Heritage Field Stations', labelFa: 'پایگاه‌های پژوهش میدانی' },
    { id: 'practice', label: 'Architectural Practices', labelFa: 'آتلیه‌ها و دفاتر معماری' },
  ];

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => {
      const matchCorridor = selectedCorridor === 'all' || n.corridor === selectedCorridor;
      const matchType = selectedType === 'all' || n.type === selectedType;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        n.name.toLowerCase().includes(q) || 
        n.nameFa.includes(q) || 
        n.city.toLowerCase().includes(q) || 
        n.cityFa.includes(q) ||
        n.focusArea.toLowerCase().includes(q) ||
        n.focusAreaFa.includes(q);

      return matchCorridor && matchType && matchQuery;
    });
  }, [selectedCorridor, selectedType, searchQuery]);

  // Selected Active Node
  const activeNode = useMemo(() => {
    return nodes.find(n => n.id === activeNodeId) || nodes[0];
  }, [activeNodeId, nodes]);

  // Connected nodes to the active node
  const activeNodeConnections = useMemo(() => {
    if (!activeNode) return [];
    return connections.filter(c => c.from === activeNode.id || c.to === activeNode.id);
  }, [activeNode]);

  const getNodeCoordinates = (nodeId: string) => {
    const found = nodes.find(n => n.id === nodeId);
    return found ? { x: found.x, y: found.y } : { x: 50, y: 50 };
  };

  return (
    <div className="bg-white rounded-3xl border border-[#ECE9E2] shadow-sm overflow-hidden space-y-0">
      
      {/* Top Interactive Filter Header */}
      <div className="p-6 sm:p-7 border-b border-[#ECE9E2] bg-gradient-to-r from-[#FAF8F3] via-white to-[#F7F5F0]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54]/10 text-[#004F54] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#008D8B]" />
              <span>{language === 'fa' ? 'نقشه تعاملی و پیوندهای علمی شبکه ابریشم' : 'Interactive Scholarly Network & Research Corridors'}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#003B40]">
              {language === 'fa' ? 'کریدورهای دانش، دانشگاه‌ها و آزمایشگاه‌های همکار' : 'Trans-National Academic Hubs & Research Initiatives'}
            </h2>
            <p className="text-xs text-[#616866] max-w-2xl leading-relaxed">
              {language === 'fa' 
                ? 'کاوش در شبکه آزمایشگاه‌های تخصصی حفاظت، دانشکده‌های معماری و پروژه‌های میدانی چندجانبه در امتداد جاده‌های ابریشم.'
                : 'Interactive topology visualizer connecting university faculties, specialized material labs, and field research initiatives across historic Silk Road corridors.'}
            </p>
          </div>

          {/* Quick Search & Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'fa' ? 'جستجوی مرکز، استاد، شهر...' : 'Search hub, scholar, city...'}
                className="w-56 sm:w-64 px-3.5 py-2 pl-9 rtl:pl-3.5 rtl:pr-9 rounded-xl border border-[#ECE9E2] bg-white text-xs text-[#111817] focus:outline-hidden focus:border-[#004F54] shadow-2xs placeholder-[#8A918F]"
              />
              <Search className="w-4 h-4 text-[#616866] absolute left-3 rtl:left-auto rtl:right-3 top-2.5" />
            </div>

            <button
              onClick={() => {
                setShowConnections(!showConnections);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showConnections 
                  ? 'bg-[#004F54] text-white border-[#004F54]' 
                  : 'bg-white text-[#616866] border-[#ECE9E2] hover:text-[#004F54]'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'خطوط همکاری' : 'Research Arcs'}</span>
            </button>
          </div>
        </div>

        {/* Corridor Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-1 scrollbar-none">
          {corridors.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCorridor(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCorridor === c.id 
                  ? 'bg-[#003B40] text-white shadow-xs' 
                  : 'bg-white text-[#616866] border border-[#ECE9E2] hover:bg-[#FAF8F3] hover:text-[#003B40]'
              }`}
            >
              {language === 'fa' ? c.labelFa : c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Visualizer & Live Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#ECE9E2]">
        
        {/* Left: The Modern Interactive Silk Road Map Canvas (8 Columns) */}
        <div className="lg:col-span-8 bg-[#F4F0E6] relative p-4 sm:p-8 min-h-[460px] sm:min-h-[540px] flex flex-col justify-between overflow-hidden select-none border-b lg:border-b-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-[#ECE9E2]">
          
          {/* Subtle Topographical & Radial Coordinate Grid */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#004F54_0.8px,transparent_0.8px)] [background-size:24px_24px] pointer-events-none"></div>
          
          {/* Silk Road Waterways / Desert Mountain Terrain Contour Accents */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {/* Caspian Sea & Aral Sea outlines */}
            <path d="M 280,180 Q 320,220 310,290 Q 290,340 330,380 Q 350,330 330,260 Z" fill="#008D8B" opacity="0.3" />
            <path d="M 520,190 Q 560,210 550,250 Q 530,270 510,250 Z" fill="#008D8B" opacity="0.25" />
            {/* Mountain Ridges (Pamir, Zagros, Alborz, Tian Shan) */}
            <path d="M 220,240 Q 340,300 480,330 T 700,320 T 920,400" stroke="#C8A56A" strokeWidth="1.5" strokeDasharray="4,6" fill="none" />
            <path d="M 380,380 Q 460,420 540,490 T 740,540" stroke="#C8A56A" strokeWidth="1" strokeDasharray="3,5" fill="none" />
          </svg>

          {/* Map Top Status Overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#ECE9E2] shadow-2xs text-[11px] text-[#003B40] font-bold">
              <Compass className="w-3.5 h-3.5 text-[#008D8B]" />
              <span>{language === 'fa' ? 'نقشه توپولوژی پژوهشی ابریشم' : 'Silk Road Research Topology Grid'}</span>
            </div>

            <div className="text-[11px] font-mono text-[#616866] bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-[#ECE9E2]">
              {filteredNodes.length} {language === 'fa' ? 'مرکز فعال' : 'Active Nodes'}
            </div>
          </div>

          {/* SVG Knowledge Connections & Arcs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="activeArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#004F54" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#008D8B" stopOpacity="1" />
                <stop offset="100%" stopColor="#C8A56A" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="inactiveArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C8A56A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#004F54" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {showConnections && connections.map((conn) => {
              const fromCoords = getNodeCoordinates(conn.from);
              const toCoords = getNodeCoordinates(conn.to);
              const isRelevant = activeNodeId === conn.from || activeNodeId === conn.to;
              const midX = (fromCoords.x + toCoords.x) / 2;
              const midY = (fromCoords.y + toCoords.y) / 2 - 4; // curved arc

              return (
                <g key={conn.id}>
                  <path
                    d={`M ${fromCoords.x} ${fromCoords.y} Q ${midX} ${midY} ${toCoords.x} ${toCoords.y}`}
                    stroke={isRelevant ? "url(#activeArcGrad)" : "url(#inactiveArcGrad)"}
                    strokeWidth={isRelevant ? "1.2" : "0.5"}
                    strokeDasharray={isRelevant ? "2,2" : "1.5,2"}
                    fill="none"
                    className={`transition-all duration-300 ${isRelevant ? 'opacity-100' : 'opacity-40'}`}
                  />
                  {isRelevant && (
                    <circle
                      cx={midX}
                      cy={midY}
                      r="1"
                      fill="#C8A56A"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map Interactive Nodes */}
          <div className="relative w-full h-full my-auto min-h-[360px]">
            {filteredNodes.map((node) => {
              const isActive = activeNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <div
                  key={node.id}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute cursor-pointer group z-20 flex flex-col items-center"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => {
                    setActiveNodeId(node.id);
                    if (onSelectNode) onSelectNode(node);
                  }}
                >
                  {/* Pulsing Ripple Effect */}
                  <div className="relative flex items-center justify-center">
                    {(isActive || isHovered) && (
                      <div className="absolute w-8 h-8 rounded-full bg-[#008D8B]/35 animate-ping" />
                    )}

                    {/* Node Core Marker */}
                    <div className={`w-4 h-4 rounded-full border-2 transition-all shadow-md flex items-center justify-center ${
                      isActive 
                        ? 'bg-[#C8A56A] border-white ring-4 ring-[#004F54]/30 scale-125' 
                        : isHovered
                        ? 'bg-[#008D8B] border-white scale-115'
                        : 'bg-[#003B40] border-white hover:bg-[#008D8B]'
                    }`}>
                      {node.type === 'university' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      {node.type === 'laboratory' && <div className="w-1.5 h-1.5 rounded-full bg-[#C8A56A]" />}
                      {node.type === 'field_station' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      {node.type === 'practice' && <div className="w-1.5 h-1.5 rounded-full bg-sky-300" />}
                    </div>
                  </div>

                  {/* City Label Badge */}
                  <div className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap shadow-2xs border ${
                    isActive 
                      ? 'bg-[#003B40] text-white border-[#003B40] scale-105 z-30' 
                      : isHovered
                      ? 'bg-white text-[#004F54] border-[#004F54] z-30'
                      : 'bg-white/90 text-[#2D3332] border-[#ECE9E2] group-hover:text-[#004F54]'
                  }`}>
                    {language === 'fa' ? node.cityFa : node.city}
                  </div>

                  {/* Mini Type Pill on hover */}
                  {isHovered && (
                    <span className="text-[9px] text-[#004F54] font-semibold bg-[#FAF8F3] px-1.5 py-0.2 rounded border border-[#ECE9E2] mt-0.5 shadow-2xs">
                      {node.scholarsCount} {language === 'fa' ? 'پژوهشگر' : 'scholars'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Map Bottom Legend */}
          <div className="relative z-10 pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#616866]">
            <div className="flex flex-wrap items-center gap-3 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#ECE9E2]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#003B40] border border-white" />
                <span>{language === 'fa' ? 'دانشگاه' : 'University'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8A56A] border border-white" />
                <span>{language === 'fa' ? 'آزمایشگاه مواد' : 'Materials Lab'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white" />
                <span>{language === 'fa' ? 'پایگاه میدانی' : 'Field Station'}</span>
              </div>
            </div>

            <div className="text-[10px] font-medium text-[#004F54]">
              {language === 'fa' ? 'روی هر نقطه کلیک کنید تا پرونده علمی باز شود' : 'Click any node to inspect collaborative research profile'}
            </div>
          </div>

        </div>

        {/* Right: Active Hub Intelligence Dossier Drawer (4 Columns) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 flex flex-col justify-between space-y-6">
          
          {activeNode ? (
            <div className="space-y-6">
              
              {/* Hub Title & Location */}
              <div className="space-y-2 pb-4 border-b border-[#ECE9E2]">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#008D8B]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{language === 'fa' ? `${activeNode.cityFa}، ${activeNode.countryFa}` : `${activeNode.city}, ${activeNode.country}`}</span>
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#616866] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#ECE9E2]">
                    Est. {activeNode.established}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#003B40] leading-snug">
                  {language === 'fa' ? activeNode.nameFa : activeNode.name}
                </h3>
              </div>

              {/* KPI Metrics Strip */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#FAF8F3] p-3.5 rounded-xl border border-[#ECE9E2] space-y-0.5">
                  <div className="text-[10px] font-bold text-[#616866] uppercase">
                    {language === 'fa' ? 'پژوهشگران پیوسته' : 'Active Scholars'}
                  </div>
                  <div className="font-serif font-bold text-2xl text-[#003B40]">
                    {activeNode.scholarsCount}
                  </div>
                </div>

                <div className="bg-[#FAF8F3] p-3.5 rounded-xl border border-[#ECE9E2] space-y-0.5">
                  <div className="text-[10px] font-bold text-[#616866] uppercase">
                    {language === 'fa' ? 'پرونده‌های اطلس' : 'Atlas Records'}
                  </div>
                  <div className="font-serif font-bold text-2xl text-[#003B40]">
                    {activeNode.projectsCount}
                  </div>
                </div>
              </div>

              {/* Research Focus Area */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#616866] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#004F54]" />
                  <span>{language === 'fa' ? 'حوزه تخصصی و اولویت‌های پژوهشی' : 'Core Research & Tectonic Focus'}</span>
                </div>
                <p className="text-xs text-[#2D3332] bg-[#FAF8F3] p-3.5 rounded-xl border border-[#ECE9E2] leading-relaxed">
                  {language === 'fa' ? activeNode.focusAreaFa : activeNode.focusArea}
                </p>
              </div>

              {/* Lead Fellow / Chair */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#616866] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#004F54]" />
                  <span>{language === 'fa' ? 'رئیس پژوهشکده / همکار ارشد' : 'Lead Investigator / Fellow'}</span>
                </div>
                <div className="text-xs font-bold text-[#003B40] bg-white p-3 rounded-xl border border-[#ECE9E2] flex items-center justify-between">
                  <span>{language === 'fa' ? activeNode.leadFellowFa : activeNode.leadFellow}</span>
                  <span className="text-[10px] text-[#008D8B] font-semibold">{language === 'fa' ? 'عضو کنسرسیوم' : 'Consortium Lead'}</span>
                </div>
              </div>

              {/* Active Bilateral Collaborations */}
              <div className="space-y-2 pt-2 border-t border-[#ECE9E2]">
                <div className="text-[11px] font-bold text-[#616866] flex items-center justify-between">
                  <span>{language === 'fa' ? 'پیوندهای پژوهشی فعال این مرکز' : 'Connected Collaborative Projects'}</span>
                  <span className="text-[10px] font-mono text-[#004F54] font-bold">{activeNodeConnections.length}</span>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {activeNodeConnections.map(conn => {
                    const otherNodeId = conn.from === activeNode.id ? conn.to : conn.from;
                    const otherNode = nodes.find(n => n.id === otherNodeId);
                    return (
                      <div 
                        key={conn.id} 
                        onClick={() => setActiveNodeId(otherNodeId)}
                        className="p-2.5 rounded-lg bg-[#FAF8F3] hover:bg-[#ECE9E2] border border-[#ECE9E2] transition-colors cursor-pointer text-xs space-y-1"
                      >
                        <div className="font-bold text-[#003B40] line-clamp-1">
                          {language === 'fa' ? conn.titleFa : conn.title}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-[#616866]">
                          <span>{language === 'fa' ? `همکاری با ${otherNode?.nameFa || otherNodeId}` : `With ${otherNode?.name || otherNodeId}`}</span>
                          <span className="font-mono">{conn.year}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-xs text-[#616866]">
              {language === 'fa' ? 'یک مرکز را برای مشاهده جزئیات انتخاب کنید.' : 'Select a hub to view details.'}
            </div>
          )}

          {/* Action Button: Connect & Explore Atlas */}
          <div className="pt-4 border-t border-[#ECE9E2] space-y-2">
            <button
              onClick={() => {
                if (onNavigateToTab) onNavigateToTab('atlas');
              }}
              className="w-full bg-[#003B40] hover:bg-[#00272B] text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>{language === 'fa' ? 'مشاهده آثار و مقالات این حوزه در اطلس' : 'View Hub Projects in Atlas'}</span>
              {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5 text-[#C8A56A]" /> : <ArrowRight className="w-3.5 h-3.5 text-[#C8A56A]" />}
            </button>
          </div>

        </div>

      </div>

      {/* Widget Footer Informational Ticker */}
      <div className="px-6 sm:px-8 py-3.5 bg-[#FAF8F3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#616866]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{language === 'fa' ? 'تمام پروتکل‌های پژوهشی مشترک با تاییدیه دبیرخانه مرکزی SRADI و ثبت DOI منتشر می‌شوند.' : 'All joint research protocols operate under bilateral academic MOUs and Open DOI archiving.'}</span>
        </div>
        <div className="font-semibold text-[#004F54]">
          {language === 'fa' ? '۱۲ کشور هم‌پیمان در جاده ابریشم' : '12 Silk Road Partner Nations'}
        </div>
      </div>

    </div>
  );
};

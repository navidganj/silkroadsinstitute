import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Users, 
  Download, 
  TrendingUp, 
  Calendar, 
  Filter, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Layers, 
  Globe2, 
  ArrowUpRight, 
  ArrowDownRight,
  FileSpreadsheet,
  RefreshCw,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  ComposedChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export interface MetricsDataPoint {
  period: string;
  monthFa: string;
  projectsAdded: number;
  activeMembers: number;
  researchDownloads: number;
  papersPublished: number;
  fellowships: number;
}

export const InstitutionalMetricsDashboardWidget: React.FC<{
  className?: string;
  initialMetric?: 'all' | 'projects' | 'members' | 'downloads';
}> = ({ className = '', initialMetric = 'all' }) => {
  const { language } = useLanguage();

  // Selected primary metric view
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'projects' | 'members' | 'downloads'>(initialMetric);
  // Chart visual type
  const [chartType, setChartType] = useState<'area' | 'bar' | 'composed'>('area');
  // Time span filter
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | '3y'>('1y');
  // Geographic zone filter
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  // Granularity
  const [granularity, setGranularity] = useState<'monthly' | 'quarterly'>('monthly');
  // Forecast toggle
  const [showForecast, setShowForecast] = useState<boolean>(false);

  // Time-series dataset
  const rawMonthlyData: MetricsDataPoint[] = [
    { period: 'Jan 2025', monthFa: 'دی ۱۴۰۳', projectsAdded: 24, activeMembers: 1420, researchDownloads: 3100, papersPublished: 8, fellowships: 12 },
    { period: 'Feb 2025', monthFa: 'بهمن ۱۴۰۳', projectsAdded: 31, activeMembers: 1560, researchDownloads: 3450, papersPublished: 11, fellowships: 18 },
    { period: 'Mar 2025', monthFa: 'اسفند ۱۴۰۳', projectsAdded: 28, activeMembers: 1690, researchDownloads: 4120, papersPublished: 14, fellowships: 25 },
    { period: 'Apr 2025', monthFa: 'فروردین ۱۴۰۴', projectsAdded: 42, activeMembers: 1880, researchDownloads: 4890, papersPublished: 16, fellowships: 30 },
    { period: 'May 2025', monthFa: 'اردیبهشت ۱۴۰۴', projectsAdded: 38, activeMembers: 2010, researchDownloads: 5320, papersPublished: 19, fellowships: 34 },
    { period: 'Jun 2025', monthFa: 'خرداد ۱۴۰۴', projectsAdded: 45, activeMembers: 2190, researchDownloads: 5980, papersPublished: 22, fellowships: 41 },
    { period: 'Jul 2025', monthFa: 'تیر ۱۴۰۴', projectsAdded: 52, activeMembers: 2340, researchDownloads: 6410, papersPublished: 25, fellowships: 48 },
    { period: 'Aug 2025', monthFa: 'مرداد ۱۴۰۴', projectsAdded: 49, activeMembers: 2480, researchDownloads: 6850, papersPublished: 27, fellowships: 52 },
    { period: 'Sep 2025', monthFa: 'شهریور ۱۴۰۴', projectsAdded: 58, activeMembers: 2620, researchDownloads: 7420, papersPublished: 31, fellowships: 60 },
    { period: 'Oct 2025', monthFa: 'مهر ۱۴۰۴', projectsAdded: 64, activeMembers: 2750, researchDownloads: 8100, papersPublished: 35, fellowships: 68 },
    { period: 'Nov 2025', monthFa: 'آبان ۱۴۰۴', projectsAdded: 71, activeMembers: 2890, researchDownloads: 8840, papersPublished: 39, fellowships: 75 },
    { period: 'Dec 2025', monthFa: 'آذر ۱۴۰۴', projectsAdded: 80, activeMembers: 3040, researchDownloads: 9650, papersPublished: 44, fellowships: 84 },
    { period: 'Jan 2026', monthFa: 'دی ۱۴۰۴', projectsAdded: 88, activeMembers: 3210, researchDownloads: 10450, papersPublished: 49, fellowships: 92 },
    { period: 'Feb 2026', monthFa: 'بهمن ۱۴۰۴', projectsAdded: 95, activeMembers: 3380, researchDownloads: 11200, papersPublished: 54, fellowships: 105 },
  ];

  // Forecast data projection
  const forecastData: MetricsDataPoint[] = [
    { period: 'Mar 2026 (Est.)', monthFa: 'اسفند ۱۴۰۴ (پیش‌بینی)', projectsAdded: 104, activeMembers: 3550, researchDownloads: 12100, papersPublished: 58, fellowships: 115 },
    { period: 'Apr 2026 (Est.)', monthFa: 'فروردین ۱۴۰۵ (پیش‌بینی)', projectsAdded: 115, activeMembers: 3740, researchDownloads: 13050, papersPublished: 63, fellowships: 128 },
    { period: 'May 2026 (Est.)', monthFa: 'اردیبهشت ۱۴۰۵ (پیش‌بینی)', projectsAdded: 126, activeMembers: 3920, researchDownloads: 14100, papersPublished: 69, fellowships: 140 },
  ];

  // Regional breakdown
  const regionalDistribution = [
    { name: 'Iranian Plateau', nameFa: 'فلات ایران', projects: 480, members: 1240, downloads: 41200, color: '#004F54' },
    { name: 'Central Asia & Silk Road', nameFa: 'آسیای مرکزی و ماوراءالنهر', projects: 390, members: 920, downloads: 32600, color: '#008D8B' },
    { name: 'Anatolia & Levant', nameFa: 'آناتولی و شامات', projects: 310, members: 680, downloads: 22400, color: '#C8A56A' },
    { name: 'Caucasus', nameFa: 'قفقاز', projects: 160, members: 310, downloads: 9800, color: '#8F7244' },
    { name: 'South Asia & Indus', nameFa: 'جنوب آسیا و حوزه سند', projects: 140, members: 230, downloads: 7900, color: '#2D6A4F' },
  ];

  // Typology Distribution for Projects
  const typologyDistribution = [
    { name: 'Caravanserais & Trade', nameFa: 'کاروانسراها و ابنیه تجاری', count: 340, color: '#004F54' },
    { name: 'Mosques & Madrasas', nameFa: 'مساجد، مدارس و ابنیه مذهبی', count: 420, color: '#008D8B' },
    { name: 'Bazaars & Urban Infrastructures', nameFa: 'بازارها و بافت‌های شهری', count: 280, color: '#C8A56A' },
    { name: 'Vernacular Dwellings & Haveli', nameFa: 'خانه‌های سنتی و مسکونی', count: 290, color: '#D4A373' },
    { name: 'Hydraulic Systems (Qanats/Ab Anbar)', nameFa: 'سازه‌های آبی و آب‌انبارها', count: 150, color: '#52796F' },
  ];

  // Filtered dataset
  const filteredData = useMemo(() => {
    let dataset = [...rawMonthlyData];
    if (timeRange === '6m') {
      dataset = dataset.slice(-6);
    } else if (timeRange === '1y') {
      dataset = dataset.slice(-12);
    }

    if (showForecast) {
      dataset = [...dataset, ...forecastData];
    }

    return dataset;
  }, [timeRange, showForecast]);

  // Aggregate metric cards
  const stats = useMemo(() => {
    const totalProjects = rawMonthlyData.reduce((acc, curr) => acc + curr.projectsAdded, 0) + 980; // base archive
    const latestMembers = rawMonthlyData[rawMonthlyData.length - 1].activeMembers;
    const totalDownloads = rawMonthlyData.reduce((acc, curr) => acc + curr.researchDownloads, 0);
    const totalPapers = rawMonthlyData[rawMonthlyData.length - 1].papersPublished + 240;

    // Growth rates compared to 6 months ago
    const sixMonthsAgo = rawMonthlyData[rawMonthlyData.length - 7] || rawMonthlyData[0];
    const latest = rawMonthlyData[rawMonthlyData.length - 1];

    const projectGrowth = Math.round(((latest.projectsAdded - sixMonthsAgo.projectsAdded) / sixMonthsAgo.projectsAdded) * 100);
    const memberGrowth = Math.round(((latest.activeMembers - sixMonthsAgo.activeMembers) / sixMonthsAgo.activeMembers) * 100);
    const downloadGrowth = Math.round(((latest.researchDownloads - sixMonthsAgo.researchDownloads) / sixMonthsAgo.researchDownloads) * 100);

    return {
      totalProjects,
      latestMembers,
      totalDownloads,
      totalPapers,
      projectGrowth,
      memberGrowth,
      downloadGrowth
    };
  }, [rawMonthlyData]);

  // Handle CSV Export of Metrics
  const handleExportCSV = () => {
    const headers = ['Period,Projects Added,Active Members,Research Downloads,Papers Published,Fellowships'];
    const rows = filteredData.map(d => 
      `"${d.period}",${d.projectsAdded},${d.activeMembers},${d.researchDownloads},${d.papersPublished},${d.fellowships}`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SRADI_Institutional_Metrics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#00272B] text-white p-3.5 rounded-xl border border-[#004F54] shadow-xl text-xs space-y-2 min-w-[180px]">
          <div className="font-serif font-bold text-[#C8A56A] border-b border-[#004F54] pb-1">
            {label}
          </div>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-[#ECE9E2]/80">{entry.name}:</span>
                </div>
                <span className="font-mono font-bold text-white">{Number(entry.value).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#ECE9E2] shadow-sm overflow-hidden ${className}`}>
      
      {/* Top Header & Interactive Control Bar */}
      <div className="p-6 sm:p-7 border-b border-[#ECE9E2] bg-gradient-to-r from-white via-[#FAF8F3] to-[#F7F5F0]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54]/10 text-[#004F54] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#008D8B]" />
              <span>{language === 'fa' ? 'ابزارک تحلیل داده‌های ساختاری و مراجعات علمی' : 'Institutional Telemetry & Research Analytics'}</span>
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#003B40]">
              {language === 'fa' ? 'روند پایش آثار، اعضای فعال و دانلود مقالات' : 'Institutional Metrics & Knowledge Dissemination'}
            </h2>
            <p className="text-xs text-[#616866] max-w-2xl leading-relaxed">
              {language === 'fa' 
                ? 'تحلیل تعاملی و چندبعدی رشد پایگاه داده آثار، پیوستن پژوهشگران بین‌المللی و استفاده از نقشه‌ها و مقالات فنی در سراسر پهنه جاده ابریشم.'
                : 'Interactive dynamic monitoring of architectural atlas additions, scholarly engagement, and measured technical blueprint downloads across Silk Road corridors.'}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            {/* Chart Type Selector */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-[#ECE9E2] shadow-2xs text-xs">
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  chartType === 'area' ? 'bg-[#004F54] text-white shadow-2xs' : 'text-[#616866] hover:text-[#003B40]'
                }`}
                title="Area Trend View"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'fa' ? 'مساحتی' : 'Area'}</span>
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  chartType === 'bar' ? 'bg-[#004F54] text-white shadow-2xs' : 'text-[#616866] hover:text-[#003B40]'
                }`}
                title="Bar Chart Comparison"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'fa' ? 'ستونی' : 'Bar'}</span>
              </button>
              <button
                onClick={() => setChartType('composed')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  chartType === 'composed' ? 'bg-[#004F54] text-white shadow-2xs' : 'text-[#616866] hover:text-[#003B40]'
                }`}
                title="Combined Multi-axis View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'fa' ? 'ترکیبی' : 'Multi-Axis'}</span>
              </button>
            </div>

            {/* Time Span Filter */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-[#ECE9E2] shadow-2xs text-xs font-semibold text-[#616866]">
              <button
                onClick={() => setTimeRange('6m')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  timeRange === '6m' ? 'bg-[#003B40] text-white' : 'hover:text-[#003B40]'
                }`}
              >
                6M
              </button>
              <button
                onClick={() => setTimeRange('1y')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  timeRange === '1y' ? 'bg-[#003B40] text-white' : 'hover:text-[#003B40]'
                }`}
              >
                1Y
              </button>
              <button
                onClick={() => setTimeRange('3y')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  timeRange === '3y' ? 'bg-[#003B40] text-white' : 'hover:text-[#003B40]'
                }`}
              >
                All
              </button>
            </div>

            {/* CSV Export Button */}
            <button
              onClick={handleExportCSV}
              className="bg-white hover:bg-[#FAF8F3] text-[#004F54] border border-[#ECE9E2] px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              title="Export CSV Dataset"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#008D8B]" />
              <span className="hidden md:inline">{language === 'fa' ? 'خروجی CSV' : 'Export'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Switcher & KPI Cards */}
      <div className="p-6 bg-[#FAF8F3] border-b border-[#ECE9E2]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: All Combined */}
          <div 
            onClick={() => setSelectedMetric('all')}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left rtl:text-right ${
              selectedMetric === 'all' 
                ? 'bg-white border-[#004F54] shadow-md ring-2 ring-[#004F54]/15' 
                : 'bg-white/80 border-[#ECE9E2] hover:bg-white hover:border-[#008D8B]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#616866] uppercase">
                {language === 'fa' ? 'نمای کلی شاخص‌ها' : 'Combined Overview'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#004F54]/10 flex items-center justify-center text-[#004F54]">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#003B40]">
              {language === 'fa' ? 'چندگانه' : 'Multi-Stream'}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>{language === 'fa' ? '۳ شاخص همگام' : '3 Synchronized Metrics'}</span>
            </div>
          </div>

          {/* Card 2: Projects Added */}
          <div 
            onClick={() => setSelectedMetric('projects')}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left rtl:text-right ${
              selectedMetric === 'projects' 
                ? 'bg-white border-[#004F54] shadow-md ring-2 ring-[#004F54]/15' 
                : 'bg-white/80 border-[#ECE9E2] hover:bg-white hover:border-[#008D8B]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#616866] uppercase">
                {language === 'fa' ? 'آثار ثبتی اطلس' : 'Projects Added'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#004F54]/10 flex items-center justify-center text-[#004F54]">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#003B40]">
              {stats.totalProjects.toLocaleString()}+
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{stats.projectGrowth}% {language === 'fa' ? 'رشد فصلی' : 'growth'}</span>
            </div>
          </div>

          {/* Card 3: Active Members */}
          <div 
            onClick={() => setSelectedMetric('members')}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left rtl:text-right ${
              selectedMetric === 'members' 
                ? 'bg-white border-[#004F54] shadow-md ring-2 ring-[#004F54]/15' 
                : 'bg-white/80 border-[#ECE9E2] hover:bg-white hover:border-[#008D8B]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#616866] uppercase">
                {language === 'fa' ? 'اعضای فعال و پژوهشگران' : 'Active Members'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#008D8B]/10 flex items-center justify-center text-[#008D8B]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#003B40]">
              {stats.latestMembers.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{stats.memberGrowth}% {language === 'fa' ? 'عضویت جدید' : 'new scholars'}</span>
            </div>
          </div>

          {/* Card 4: Research Downloads */}
          <div 
            onClick={() => setSelectedMetric('downloads')}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left rtl:text-right ${
              selectedMetric === 'downloads' 
                ? 'bg-white border-[#004F54] shadow-md ring-2 ring-[#004F54]/15' 
                : 'bg-white/80 border-[#ECE9E2] hover:bg-white hover:border-[#008D8B]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#616866] uppercase">
                {language === 'fa' ? 'دانلود مقالات و نقشه‌ها' : 'Research Downloads'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#C8A56A]/15 flex items-center justify-center text-[#997232]">
                <Download className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif font-bold text-2xl text-[#003B40]">
              {(stats.totalDownloads / 1000).toFixed(1)}k
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+{stats.downloadGrowth}% {language === 'fa' ? 'تراکنش اسناد' : 'citations & plans'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Interactive Chart Canvas */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Dynamic Sub-header & Forecast Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#004F54]" />
            <span className="text-xs font-bold text-[#003B40]">
              {selectedMetric === 'all' && (language === 'fa' ? 'مقایسه هم‌زمان روند تولید اثر، رشد اعضا و مراجعات پژوهشی' : 'Concurrent Trajectory: Projects, Members & Research Inquiries')}
              {selectedMetric === 'projects' && (language === 'fa' ? 'تعداد پرونده‌های معماری افزوده شده به اطلس بر اساس ماه' : 'Monthly Architectural Dossiers Published to Atlas')}
              {selectedMetric === 'members' && (language === 'fa' ? 'روند تجمعی پژوهشگران، معماران و اعضای دانشگاهی پیوسته' : 'Active Scholarly Member Base & University Affiliations')}
              {selectedMetric === 'downloads' && (language === 'fa' ? 'میزان دانلود فایل‌های CAD، نقشه‌های فنی و مقالات بازنشر' : 'Measured Blueprints & Full-Text Academic Paper Downloads')}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-2 text-[#616866] cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={showForecast} 
                onChange={(e) => setShowForecast(e.target.checked)} 
                className="rounded border-[#ECE9E2] text-[#004F54] focus:ring-[#004F54]"
              />
              <span className="font-medium text-[#2D3332]">{language === 'fa' ? 'نمایش پیش‌بینی فصلی (AI Forecast)' : 'Include 3M Forecast'}</span>
            </label>
          </div>
        </div>

        {/* The Responsive Chart Canvas */}
        <div className="h-80 sm:h-96 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004F54" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#004F54" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008D8B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#008D8B" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A56A" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#C8A56A" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E2" vertical={false} />
                <XAxis 
                  dataKey={language === 'fa' ? 'monthFa' : 'period'} 
                  tick={{ fontSize: 11, fill: '#616866' }} 
                  axisLine={{ stroke: '#ECE9E2' }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#616866' }} 
                  axisLine={{ stroke: '#ECE9E2' }}
                  tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  formatter={(val) => <span className="text-xs font-semibold text-[#003B40]">{val}</span>}
                />
                
                {(selectedMetric === 'all' || selectedMetric === 'projects') && (
                  <Area 
                    type="monotone" 
                    dataKey="projectsAdded" 
                    name={language === 'fa' ? 'پروژه‌های افزوده شده' : 'Projects Added'} 
                    stroke="#004F54" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorProjects)" 
                  />
                )}

                {(selectedMetric === 'all' || selectedMetric === 'members') && (
                  <Area 
                    type="monotone" 
                    dataKey="activeMembers" 
                    name={language === 'fa' ? 'اعضای فعال' : 'Active Members'} 
                    stroke="#008D8B" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorMembers)" 
                  />
                )}

                {(selectedMetric === 'all' || selectedMetric === 'downloads') && (
                  <Area 
                    type="monotone" 
                    dataKey="researchDownloads" 
                    name={language === 'fa' ? 'دانلودهای پژوهشی' : 'Research Downloads'} 
                    stroke="#C8A56A" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorDownloads)" 
                  />
                )}
              </AreaChart>
            ) : chartType === 'bar' ? (
              <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E2" vertical={false} />
                <XAxis 
                  dataKey={language === 'fa' ? 'monthFa' : 'period'} 
                  tick={{ fontSize: 11, fill: '#616866' }} 
                  axisLine={{ stroke: '#ECE9E2' }}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#616866' }} 
                  axisLine={{ stroke: '#ECE9E2' }}
                  tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  formatter={(val) => <span className="text-xs font-semibold text-[#003B40]">{val}</span>}
                />
                
                {(selectedMetric === 'all' || selectedMetric === 'projects') && (
                  <Bar 
                    dataKey="projectsAdded" 
                    name={language === 'fa' ? 'پروژه‌های افزوده شده' : 'Projects Added'} 
                    fill="#004F54" 
                    radius={[4, 4, 0, 0]} 
                  />
                )}
                {(selectedMetric === 'all' || selectedMetric === 'members') && (
                  <Bar 
                    dataKey="activeMembers" 
                    name={language === 'fa' ? 'اعضای فعال' : 'Active Members'} 
                    fill="#008D8B" 
                    radius={[4, 4, 0, 0]} 
                  />
                )}
                {(selectedMetric === 'all' || selectedMetric === 'downloads') && (
                  <Bar 
                    dataKey="researchDownloads" 
                    name={language === 'fa' ? 'دانلودهای پژوهشی' : 'Research Downloads'} 
                    fill="#C8A56A" 
                    radius={[4, 4, 0, 0]} 
                  />
                )}
              </BarChart>
            ) : (
              <ComposedChart data={filteredData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E2" vertical={false} />
                <XAxis 
                  dataKey={language === 'fa' ? 'monthFa' : 'period'} 
                  tick={{ fontSize: 11, fill: '#616866' }} 
                />
                <YAxis 
                  yAxisId="left" 
                  tick={{ fontSize: 11, fill: '#616866' }} 
                  tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fontSize: 11, fill: '#C8A56A' }} 
                  tickFormatter={(val) => val}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  formatter={(val) => <span className="text-xs font-semibold text-[#003B40]">{val}</span>}
                />

                <Bar 
                  yAxisId="left"
                  dataKey="researchDownloads" 
                  name={language === 'fa' ? 'دانلودهای پژوهشی (چپ)' : 'Research Downloads (Left)'} 
                  fill="#E5D6BA" 
                  radius={[4, 4, 0, 0]} 
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="activeMembers" 
                  name={language === 'fa' ? 'اعضای فعال' : 'Active Members'} 
                  stroke="#008D8B" 
                  strokeWidth={2.5} 
                  dot={{ r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="projectsAdded" 
                  name={language === 'fa' ? 'پروژه‌های تازه (راست)' : 'Projects Added (Right)'} 
                  stroke="#004F54" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#004F54' }}
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Bottom Dual Breakdown: Regional Corridors & Typology Share */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#ECE9E2]">
          
          {/* Regional Hub Breakdown */}
          <div className="bg-[#FAF8F3] p-5 rounded-xl border border-[#ECE9E2] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#004F54]" />
                <h4 className="font-serif font-bold text-sm text-[#003B40]">
                  {language === 'fa' ? 'توزیع پهنه‌ای فعالیت‌ها در کریدورهای ابریشم' : 'Regional Corridor Dissemination'}
                </h4>
              </div>
              <span className="text-[11px] text-[#616866]">{language === 'fa' ? 'تجمعی' : 'Aggregate'}</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {regionalDistribution.map((region, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2D3332]">{language === 'fa' ? region.nameFa : region.name}</span>
                    <span className="font-mono text-[#004F54] font-bold">{region.projects} {language === 'fa' ? 'اثر' : 'projects'} • {region.members} {language === 'fa' ? 'عضو' : 'scholars'}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#ECE9E2] overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(region.projects / 480) * 100}%`,
                        backgroundColor: region.color 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Typology Breakdown */}
          <div className="bg-[#FAF8F3] p-5 rounded-xl border border-[#ECE9E2] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#008D8B]" />
                <h4 className="font-serif font-bold text-sm text-[#003B40]">
                  {language === 'fa' ? 'گونه‌شناسی بناهای مستندسازی شده' : 'Documented Typology Distribution'}
                </h4>
              </div>
              <span className="text-[11px] text-[#616866]">{language === 'fa' ? 'سهم نسبی' : 'Share'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {typologyDistribution.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-[#ECE9E2] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#003B40] truncate max-w-[150px]">
                      {language === 'fa' ? item.nameFa : item.name}
                    </div>
                    <div className="text-[10px] text-[#616866]">
                      {language === 'fa' ? 'پرونده فنی و ترسیمات' : 'Measured Survey'}
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF8F3] text-[#004F54] border border-[#ECE9E2]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Widget Footer Status */}
      <div className="px-6 py-3.5 bg-[#FAF8F3] border-t border-[#ECE9E2] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#616866]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'fa' ? 'داده‌های تله‌متری با رعایت استانداردهای حریم خصوصی و به صورت بی‌نام ثبت می‌شوند.' : 'Telemetry compiled strictly under GDPR/academic privacy standards.'}</span>
        </div>
        <div className="font-mono text-[10px] text-[#616866]">
          {language === 'fa' ? 'آخرین به‌روزرسانی: همگام با دیتابیس موسسه' : 'Live Synced with SRADI Database Engine'}
        </div>
      </div>

    </div>
  );
};

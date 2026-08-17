import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Globe2, 
  Download, 
  Users, 
  Building2, 
  FileText, 
  Calendar, 
  Search, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid
} from 'recharts';
import { InstitutionalMetricsDashboardWidget } from './InstitutionalMetricsDashboardWidget';

export const AnalyticsMetricsPortal: React.FC = () => {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '1y'>('30d');

  // Privacy-conscious aggregated metrics
  const impactSummary = [
    { labelEn: 'Documented Projects', labelFa: 'پروژه‌های ثبت‌شده', count: '1,420+', icon: Building2, change: '+18% this quarter' },
    { labelEn: 'Trans-National Cities', labelFa: 'شهرهای تحت پوشش', count: '38', icon: MapPin, change: '+4 new hubs' },
    { labelEn: 'Published Research Papers', labelFa: 'مقالات پژوهشی داوری‌شده', count: '348', icon: FileText, change: '100% open-access' },
    { labelEn: 'Scholarly Members', labelFa: 'پژوهشگران و معماران', count: '2,890', icon: Users, change: 'Across 14 nations' },
    { labelEn: 'Measured Survey Downloads', labelFa: 'دانلود نقشه‌های فنی', count: '48.6k', icon: Download, change: 'Archival blueprints' },
    { labelEn: 'Fellowship Applications', labelFa: 'پرونده‌های پذیرش دوره‌ها', count: '612', icon: Sparkles, change: '2026 Season' },
  ];

  const engagementByCountry = [
    { country: 'Iran', projects: 420, research: 110, downloads: 14200 },
    { country: 'Uzbekistan', projects: 310, research: 85, downloads: 11800 },
    { country: 'Turkey', projects: 290, research: 74, downloads: 9400 },
    { country: 'Azerbaijan', projects: 160, research: 42, downloads: 5200 },
    { country: 'Kazakhstan', projects: 130, research: 36, downloads: 4100 },
    { country: 'Pakistan', projects: 110, research: 28, downloads: 3900 },
  ];

  const topSearchedTerms = [
    { query: 'Windcatchers in Yazd', count: 1840, category: 'Climate & Vernacular' },
    { query: 'Muqarnas geometry plans', count: 1620, category: 'Measured Drawings' },
    { query: 'Samarkand glazed tile restoration', count: 1290, category: 'Conservation' },
    { query: 'Subterranean qanat cooling', count: 1180, category: 'Hydrology & Urbanism' },
    { query: 'Caravanserai structural spans', count: 960, category: 'Tectonics' },
    { query: 'Tabriz covered bazaar morphology', count: 870, category: 'Urban History' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Featured Main Interactive Widget */}
      <InstitutionalMetricsDashboardWidget />

      {/* Additional Deep-Dive Analytics & Regional Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Geographical Research Engagement */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#ECE9E2] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-serif font-bold text-base text-[#003B40]">
                {language === 'fa' ? 'تراکم پروژه‌ها و مقالات به تفکیک کشور' : 'Documented Assets by Country'}
              </h4>
              <p className="text-xs text-[#616866]">{language === 'fa' ? 'پوشش پرونده‌های معماری' : 'Catalogued buildings & field studies'}</p>
            </div>
            <Globe2 className="w-5 h-5 text-[#004F54]" />
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementByCountry} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E2" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#616866' }} />
                <YAxis dataKey="country" type="category" width={80} tick={{ fontSize: 11, fill: '#003B40', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#003B40', color: '#FFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
                />
                <Bar dataKey="projects" name="Atlas Projects" fill="#004F54" radius={[0, 4, 4, 0]} />
                <Bar dataKey="research" name="Research Papers" fill="#C8A56A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Top Search Queries & Academic Interest */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#ECE9E2] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#ECE9E2] pb-3">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[#004F54]" />
              <h4 className="font-serif font-bold text-base text-[#003B40]">
                {language === 'fa' ? 'پربسامدترین جستجوهای علمی در سامانه' : 'Most Inquired Tectonic & Historical Search Terms'}
              </h4>
            </div>
            <span className="text-xs text-[#616866]">{language === 'fa' ? 'تحلیل کوئری‌ها' : 'Query trends'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {topSearchedTerms.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#F7F5F0] border border-[#ECE9E2] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#003B40]">{item.query}</div>
                  <div className="text-[10px] text-[#616866]">{item.category}</div>
                </div>
                <span className="font-mono text-xs font-bold text-[#004F54] bg-white px-2 py-0.5 rounded-md border border-[#ECE9E2]">
                  {item.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

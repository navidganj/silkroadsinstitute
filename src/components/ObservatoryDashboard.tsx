import React, { useState } from 'react';
import { BarChart3, Download, Layers, ShieldCheck, TrendingUp, Info, Table, PieChart } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { initialObservatoryDatasets } from '../data/seedData';
import { ObservatoryDataset } from '../types';

export const ObservatoryDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(initialObservatoryDatasets[0].id);
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [csvDownloaded, setCsvDownloaded] = useState(false);

  const selectedDataset = initialObservatoryDatasets.find(d => d.id === selectedDatasetId) || initialObservatoryDatasets[0];

  const handleExportCSV = () => {
    const headers = ['Country', 'City', 'Value', 'Unit', 'Year', 'Confidence'];
    const rows = selectedDataset.dataPoints.map(dp => [
      dp.country,
      dp.city,
      dp.value,
      selectedDataset.unit,
      selectedDataset.year,
      selectedDataset.confidenceScore
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sradi_observatory_${selectedDataset.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCsvDownloaded(true);
    setTimeout(() => setCsvDownloaded(false), 2500);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#ECE9E2] pb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#004F54] font-semibold">
            <BarChart3 className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'دیده‌بان معماری، اقلیم و میراث جاده ابریشم' : 'Silk Road Architecture & Heritage Observatory'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003B40]">
            {language === 'fa' ? 'پایگاه داده‌های کمی و شاخص‌های تطبیقی' : 'Quantitative Environmental & Spatial Datasets'}
          </h1>
          <p className="text-xs sm:text-sm text-[#616866] max-w-2xl leading-relaxed">
            {language === 'fa'
              ? 'سنجش و پایش مستمر مصرف انرژی سرمایش غیرفعال، ردپای کربن مصالح سنتی، شاخص‌های حفاظت از میراث و تاب‌آوری لرزه‌ای در کشورهای منطقه.'
              : 'Standardized quantitative telemetry measuring passive thermal efficiency, embodied carbon in vernacular masonry, and heritage preservation budgets.'}
          </p>
        </div>

        {/* Dataset Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {initialObservatoryDatasets.map(ds => (
            <button
              key={ds.id}
              onClick={() => setSelectedDatasetId(ds.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedDatasetId === ds.id
                  ? 'bg-white border-[#004F54] ring-2 ring-[#004F54] shadow-md'
                  : 'bg-white/60 border-[#ECE9E2] hover:bg-white hover:border-[#008D8B]'
              }`}
            >
              <div className="text-[10px] text-[#008D8B] font-mono uppercase tracking-wider">{ds.category}</div>
              <h3 className="font-serif text-sm font-bold text-[#003B40] mt-1 line-clamp-1">
                {language === 'fa' ? ds.titleFa : ds.title}
              </h3>
              <div className="text-xs text-[#616866] mt-2 font-mono">
                {ds.dataPoints.length} {language === 'fa' ? 'داده ثبت‌شده' : 'indicators'} • {ds.unit}
              </div>
            </button>
          ))}
        </div>

        {/* Main Dataset Display Area */}
        <div className="bg-white border border-[#ECE9E2] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Dataset Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ECE9E2]">
            <div>
              <div className="text-xs text-[#008D8B] font-semibold uppercase tracking-wider">
                {selectedDataset.category.toUpperCase()} • {language === 'fa' ? 'واحد سنجش:' : 'Unit:'} {selectedDataset.unit}
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#003B40] mt-0.5">
                {language === 'fa' ? selectedDataset.titleFa : selectedDataset.title}
              </h2>
              <p className="text-xs text-[#616866] mt-1 max-w-xl">
                {language === 'fa' ? selectedDataset.methodologyFa : selectedDataset.methodology}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-[#F7F5F0] p-1 rounded-md border border-[#ECE9E2] flex items-center gap-1 text-xs">
                <button
                  onClick={() => setViewMode('chart')}
                  className={`px-3 py-1 rounded font-medium transition-colors ${
                    viewMode === 'chart' ? 'bg-[#004F54] text-white shadow-sm' : 'text-[#111817]'
                  }`}
                >
                  {language === 'fa' ? 'نمودار' : 'Chart'}
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded font-medium transition-colors ${
                    viewMode === 'table' ? 'bg-[#004F54] text-white shadow-sm' : 'text-[#111817]'
                  }`}
                >
                  {language === 'fa' ? 'جدول داده' : 'Data Table'}
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                className="bg-[#008D8B] hover:bg-[#008D8B]/85 text-white text-xs font-semibold px-3 py-2 rounded transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{csvDownloaded ? (language === 'fa' ? 'دریافت شد ✓' : 'Exported ✓') : 'Export CSV'}</span>
              </button>
            </div>
          </div>

          {/* View Container */}
          {viewMode === 'chart' ? (
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedDataset.dataPoints} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ECE9E2" />
                  <XAxis 
                    dataKey={language === 'fa' ? 'cityFa' : 'city'} 
                    stroke="#616866" 
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#616866" 
                    fontSize={11}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#003B40', 
                      borderColor: '#004F54', 
                      borderRadius: '8px', 
                      color: '#ECE9E2',
                      fontSize: '12px'
                    }} 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#004F54" 
                    radius={[4, 4, 0, 0]}
                    name={selectedDataset.unit}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#003B40] text-[#ECE9E2] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">{language === 'fa' ? 'شهر / کشور' : 'City / Country'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'مقدار ثبت‌شده' : 'Measured Value'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'واحد' : 'Unit'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'سال سنجش' : 'Year'}</th>
                    <th className="py-3 px-4">{language === 'fa' ? 'ضریب اطمینان' : 'Confidence'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE9E2]">
                  {selectedDataset.dataPoints.map((dp, i) => (
                    <tr key={i} className="hover:bg-[#F7F5F0]">
                      <td className="py-3 px-4 font-bold text-[#003B40]">
                        {language === 'fa' ? `${dp.cityFa} (${dp.countryFa})` : `${dp.city} (${dp.country})`}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#008D8B]">{dp.value}</td>
                      <td className="py-3 px-4 text-[#616866]">{selectedDataset.unit}</td>
                      <td className="py-3 px-4 font-mono">{selectedDataset.year}</td>
                      <td className="py-3 px-4">
                        <span className="bg-[#ECE9E2] text-[#004F54] px-2 py-0.5 rounded text-[10px] font-semibold">
                          {selectedDataset.confidenceScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Source & Provenance info */}
          <div className="bg-[#F7F5F0] p-4 rounded-lg border border-[#ECE9E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#616866]">
            <div>
              <span className="font-semibold text-[#003B40]">{language === 'fa' ? 'روش‌شناسی و منبع داده:' : 'Methodology & Data Source:'}</span> {selectedDataset.source}
            </div>
            <div className="font-mono text-[11px] shrink-0">
              {language === 'fa' ? 'سال داده:' : 'Survey Year:'} {selectedDataset.year}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BookOpen, Download, Copy, Check, FileText, Bookmark, BookmarkCheck, ExternalLink, Search, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { initialResearchItems } from '../data/seedData';
import { ResearchItem } from '../types';

export const ResearchPortal: React.FC = () => {
  const { language, t } = useLanguage();
  const { isResearchSaved, toggleSaveResearch } = useAuth();

  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(initialResearchItems[0]);
  const [copiedDoi, setCopiedDoi] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const copyDoi = (doi: string) => {
    navigator.clipboard.writeText(doi);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handleDownloadPdf = (res: ResearchItem) => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#ECE9E2] pb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#004F54] font-semibold">
            <BookOpen className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'سامانه پژوهش و نشریه معماری ابریشم' : 'Silk Road Architecture Journal & Research Platform'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003B40]">
            {language === 'fa' ? 'مجموعه مقالات داوری‌شده و مطالعات تطبیقی' : 'Peer-Reviewed Papers & Field Dossiers'}
          </h1>
          <p className="text-xs sm:text-sm text-[#616866] max-w-2xl leading-relaxed">
            {language === 'fa'
              ? 'پژوهش‌های علمی، تحلیل‌های حرارتی ریزاقلیم، مکانیک سازه‌های بومی و مستندنگاری تطبیقی با دسترسی آزاد (Open Access).'
              : 'Open-access academic investigations on microclimate thermodynamics, vernacular seismic engineering, and trans-regional typological continuity.'}
          </p>
        </div>

        {/* Two-Column Research Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Research Papers Index */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#004F54] flex items-center justify-between">
              <span>{language === 'fa' ? 'مقالات منتشر شده' : 'Published Articles'}</span>
              <span className="text-[#616866] font-normal">{initialResearchItems.length} {language === 'fa' ? 'مقاله' : 'papers'}</span>
            </div>

            <div className="space-y-3">
              {initialResearchItems.map(item => {
                const isSelected = selectedResearch?.id === item.id;
                const saved = isResearchSaved(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedResearch(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-white border-[#004F54] shadow-md ring-1 ring-[#004F54]'
                        : 'bg-white/70 border-[#ECE9E2] hover:bg-white hover:border-[#008D8B]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#616866]">
                      <span className="font-mono text-[#008D8B] font-semibold">{item.journalVolume} • {item.journalIssue}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveResearch(item.id);
                        }}
                        className="text-[#616866] hover:text-[#004F54]"
                      >
                        {saved ? <BookmarkCheck className="w-3.5 h-3.5 text-[#C8A56A]" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#003B40] leading-snug">
                      {language === 'fa' ? item.titleFa : item.title}
                    </h3>

                    <div className="text-xs text-[#616866]">
                      {item.authors.map(a => (language === 'fa' ? a.nameFa : a.name)).join(', ')}
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {(language === 'fa' ? item.keywordsFa : item.keywords).slice(0, 3).map((kw, i) => (
                        <span key={i} className="bg-[#ECE9E2] text-[#003B40] text-[9px] px-2 py-0.5 rounded font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Research Paper Detailed Reader */}
          <div className="lg:col-span-7">
            {selectedResearch ? (
              <div className="bg-white border border-[#ECE9E2] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Header Meta */}
                <div className="space-y-3 border-b border-[#ECE9E2] pb-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="bg-[#004F54] text-[#C8A56A] font-semibold px-2.5 py-1 rounded">
                      {selectedResearch.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="font-mono text-[#616866]">
                      Published: {selectedResearch.publicationDate}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#003B40] leading-tight">
                    {language === 'fa' ? selectedResearch.titleFa : selectedResearch.title}
                  </h2>

                  {/* Authors list */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#111817]">
                      {selectedResearch.authors.map((a, i) => (
                        <span key={i}>
                          {language === 'fa' ? a.nameFa : a.name}
                          <span className="text-[#616866] font-normal"> ({a.affiliation}, {a.country})</span>
                          {i < selectedResearch.authors.length - 1 ? '; ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DOI & Metrics */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[#616866]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#004F54]">DOI:</span>
                      <span className="font-mono text-xs">{selectedResearch.doi}</span>
                      <button
                        onClick={() => copyDoi(selectedResearch.doi || '')}
                        className="text-[#008D8B] hover:underline flex items-center gap-0.5"
                        title="Copy DOI"
                      >
                        {copiedDoi ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-4 font-mono text-[11px]">
                      <span>Downloads: {selectedResearch.downloadCount}</span>
                      <span>Citations: {selectedResearch.citationCount}</span>
                    </div>
                  </div>
                </div>

                {/* Abstract */}
                <div className="space-y-2 bg-[#F7F5F0] p-5 rounded-lg border border-[#ECE9E2]">
                  <h3 className="font-serif text-sm font-bold text-[#004F54] uppercase tracking-wider">
                    {language === 'fa' ? 'چکیده پژوهش (Abstract)' : 'Abstract'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#111817] leading-relaxed font-light">
                    {language === 'fa' ? selectedResearch.abstractFa : selectedResearch.abstract}
                  </p>
                </div>

                {/* Keywords */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#003B40]">
                    {language === 'fa' ? 'واژگان کلیدی:' : 'Keywords:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'fa' ? selectedResearch.keywordsFa : selectedResearch.keywords).map((kw, i) => (
                      <span key={i} className="bg-[#ECE9E2] text-[#004F54] text-xs px-2.5 py-1 rounded font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions: Download PDF / Cite */}
                <div className="p-4 bg-[#003B40] text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-[#C8A56A]">
                      {language === 'fa' ? 'متن کامل مقاله داوری‌شده' : 'Peer-Reviewed Full Dossier'}
                    </div>
                    <div className="text-xs text-[#ECE9E2]/80">
                      PDF Document ({selectedResearch.pdfSizeMb} MB) • Open Access Creative Commons
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadPdf(selectedResearch)}
                    className="w-full sm:w-auto bg-[#008D8B] hover:bg-[#008D8B]/85 text-white font-semibold text-xs px-5 py-2.5 rounded transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {downloadSuccess ? <Check className="w-4 h-4 text-[#C8A56A]" /> : <Download className="w-4 h-4" />}
                    <span>{downloadSuccess ? (language === 'fa' ? 'در حال دانلود...' : 'Downloaded') : t('downloadPdf')}</span>
                  </button>
                </div>

                {/* References & Citation */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-serif text-sm font-bold text-[#003B40]">
                    {language === 'fa' ? 'ارجاعات و منابع مقاله' : 'References & Bibliographic Notes'}
                  </h4>
                  <ul className="space-y-2 text-xs text-[#616866]">
                    {selectedResearch.references.map((ref, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-[#008D8B]">[{idx + 1}]</span>
                        <span>{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-xl border border-[#ECE9E2] text-[#616866]">
                {language === 'fa' ? 'لطفاً مقاله‌ای را انتخاب نمایید.' : 'Please select an article from the index.'}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

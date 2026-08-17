import React, { useState } from 'react';
import { Archive, Search, ZoomIn, Download, Layers, ShieldCheck, Filter, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { initialArchiveCollections, initialArchiveItems } from '../data/seedData';
import { ArchiveCollection, ArchiveItem } from '../types';

export const ArchivePortal: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(initialArchiveItems[0]);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredItems = selectedCollectionId === 'all'
    ? initialArchiveItems
    : initialArchiveItems.filter(item => item.collectionId === selectedCollectionId);

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#ECE9E2] pb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#008D8B] font-semibold">
            <Archive className="w-4 h-4" />
            <span>{language === 'fa' ? 'آرشیو دیجیتال و اسناد تاریخی ابریشم' : 'Digital Architectural Archive & Historic Plates'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003B40]">
            {language === 'fa' ? 'نقشه‌های دست‌ساز، شیشه‌نگاشت‌ها و نقشه‌برداری‌های تاریخی' : 'Historic Blueprints, Glass-Plate Negatives & Measured Surveys'}
          </h1>
          <p className="text-xs sm:text-sm text-[#616866] max-w-2xl leading-relaxed">
            {language === 'fa'
              ? 'مجموعه دست‌نخورده از نقشه‌های کاغذی، اسناد مرمتی قرن نوزدهم و بیستم، و نقشه‌برداری‌های میدانی کاروانسراها و ابنیه تاریخی.'
              : 'Preserved repository of ink-on-vellum surveys, early 20th-century restoration folios, and archaeological architectural photogrammetry.'}
          </p>
        </div>

        {/* Curated Collections Highlights */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#004F54]">
            {language === 'fa' ? 'مجموعه‌های ویژه آرشیو:' : 'Curated Archival Collections:'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {initialArchiveCollections.map(col => (
              <div
                key={col.id}
                onClick={() => setSelectedCollectionId(selectedCollectionId === col.id ? 'all' : col.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  selectedCollectionId === col.id
                    ? 'bg-white border-[#004F54] ring-2 ring-[#004F54] shadow-md'
                    : 'bg-white border-[#ECE9E2] hover:border-[#008D8B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#008D8B] font-medium mb-1">
                    <span>{col.era}</span>
                    <span className="bg-[#ECE9E2] text-[#003B40] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                      {col.itemCount} {language === 'fa' ? 'سند' : 'plates'}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#003B40]">
                    {language === 'fa' ? col.titleFa : col.title}
                  </h3>
                  <p className="text-xs text-[#616866] mt-1 line-clamp-2">
                    {language === 'fa' ? col.descriptionFa : col.description}
                  </p>
                </div>

                <div className="text-[11px] text-[#616866] pt-2 border-t border-[#ECE9E2] flex items-center justify-between">
                  <span>{col.curator}</span>
                  <span className="text-[#004F54] font-semibold">
                    {selectedCollectionId === col.id ? (language === 'fa' ? 'فیلتر شده ✓' : 'Filtered ✓') : (language === 'fa' ? 'نمایش اسناد' : 'Filter Collection')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Archive Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items Index */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#004F54]">
              <span>{language === 'fa' ? 'فهرست اسناد آرشیوی' : 'Archival Plates Index'}</span>
              <span className="text-[#616866] font-normal">{filteredItems.length} {language === 'fa' ? 'مورد' : 'items'}</span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredItems.map(item => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setZoomLevel(1);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                      isSelected
                        ? 'bg-white border-[#004F54] ring-1 ring-[#004F54] shadow-sm'
                        : 'bg-white border-[#ECE9E2] hover:bg-[#ECE9E2]/50'
                    }`}
                  >
                    <img
                      src={item.highResUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover bg-[#111817] shrink-0"
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="text-[10px] text-[#008D8B] font-mono">{item.date} • {item.mediaType}</div>
                      <h4 className="font-serif text-xs font-bold text-[#003B40] truncate">
                        {language === 'fa' ? item.titleFa : item.title}
                      </h4>
                      <div className="text-[11px] text-[#616866] truncate">{item.creator}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High Resolution Viewer Canvas */}
          <div className="lg:col-span-8">
            {selectedItem ? (
              <div className="bg-white border border-[#ECE9E2] rounded-xl p-6 shadow-sm space-y-4">
                
                {/* Viewer Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECE9E2]">
                  <div>
                    <div className="text-xs text-[#008D8B] font-mono">
                      {selectedItem.format} • {selectedItem.physicalDimensions}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-[#003B40]">
                      {language === 'fa' ? selectedItem.titleFa : selectedItem.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
                      className="px-2.5 py-1.5 bg-[#F7F5F0] hover:bg-[#ECE9E2] rounded border border-[#ECE9E2] text-xs font-semibold text-[#003B40] flex items-center gap-1"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>{Math.round(zoomLevel * 100)}%</span>
                    </button>

                    <button
                      onClick={() => setZoomLevel(1)}
                      className="px-2.5 py-1.5 bg-[#F7F5F0] hover:bg-[#ECE9E2] rounded border border-[#ECE9E2] text-xs text-[#616866]"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Main Archival Image Viewer Stage */}
                <div className="relative aspect-[16/10] bg-[#111817] rounded-xl overflow-hidden flex items-center justify-center p-2 border border-[#ECE9E2]">
                  <img
                    src={selectedItem.highResUrl}
                    alt={selectedItem.title}
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="max-h-full max-w-full object-contain transition-transform duration-200 cursor-grab"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    RESTRICTED HISTORICAL ARCHIVE
                  </div>
                </div>

                {/* Metadata & Provenance Description */}
                <div className="space-y-3 bg-[#F7F5F0] p-4 rounded-lg border border-[#ECE9E2] text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[#616866] block">{language === 'fa' ? 'پدیدآورنده:' : 'Creator / Surveyor:'}</span>
                      <span className="font-semibold text-[#003B40]">{selectedItem.creator}</span>
                    </div>
                    <div>
                      <span className="text-[#616866] block">{language === 'fa' ? 'سال تولید:' : 'Date Created:'}</span>
                      <span className="font-semibold text-[#003B40] font-mono">{selectedItem.yearCreated}</span>
                    </div>
                    <div>
                      <span className="text-[#616866] block">{language === 'fa' ? 'حقوق بازنشر:' : 'Rights Status:'}</span>
                      <span className="font-semibold text-[#008D8B]">{selectedItem.rights}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#ECE9E2]">
                    <span className="text-[#616866] block mb-0.5">{language === 'fa' ? 'محل نگهداری و اصالت سند:' : 'Provenance & Custodial Institution:'}</span>
                    <span className="text-[#111817] font-light">{selectedItem.provenance}</span>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
};

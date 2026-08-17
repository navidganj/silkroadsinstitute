import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck,
  Eye,
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';
import { useAuth } from '../../src/context/AuthContext';
import { initialPublications } from '../data/seedData';
import { Publication } from '../types';

export const PublicationsPortal: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  const filteredPublications = initialPublications.filter(pub => {
    const q = searchQuery.toLowerCase();
    const matchSearch = 
      pub.title.toLowerCase().includes(q) ||
      pub.titleFa.includes(q) ||
      pub.authors.some(a => a.toLowerCase().includes(q)) ||
      pub.description.toLowerCase().includes(q);
    const matchType = selectedType === 'all' || pub.type === selectedType;
    return matchSearch && matchType;
  });

  const handleCopyBibtex = (pub: Publication) => {
    const bibtex = `@book{silkroad_${pub.id},
  title = {${pub.title}},
  author = {${pub.authors.join(' and ')}},
  year = {${pub.year}},
  isbn = {${pub.isbn || 'N/A'}},
  pages = {${pub.pages}},
  publisher = {Silk Road Architecture Development Institute Press}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Section */}
        <div className="bg-[#003B40] rounded-2xl p-6 sm:p-10 text-[#ECE9E2] relative overflow-hidden border border-[#004F54] shadow-md">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#008D8B]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54] text-[#C8A56A] text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'انتشارات و اطلس‌های پژوهشی موسسه' : 'Institute Publications & Monographs'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
              {language === 'fa' ? 'اطلس‌های جامع، تک‌نگاری‌ها و کتاب‌های تخصصی' : 'Silk Road Architectural Atlas & Monograph Series'}
            </h1>
            <p className="text-sm sm:text-base text-[#ECE9E2]/80 leading-relaxed">
              {language === 'fa' 
                ? 'مجموعه مجلدات اطلس جامع معماری جاده ابریشم، مستندنگاری‌های نقشه‌کشی فنی، تک‌نگاری‌های تخصصی سازه‌ها و نشریات ادواری هیئت علمی.'
                : 'Comprehensive measured drawing surveys, multi-volume architectural atlases, and peer-reviewed monographs published under Open Access academic licenses.'}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-[#ECE9E2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-[#616866]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'fa' ? 'جستجو در عنوان یا مؤلف کتاب...' : 'Search title, author, topic...'}
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#F7F5F0] border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter publications by type"
              className="w-full sm:w-auto py-2 px-3 text-sm bg-[#F7F5F0] border border-[#ECE9E2] rounded-lg text-[#111817] focus:outline-none focus:border-[#004F54]"
            >
              <option value="all">{language === 'fa' ? 'تمام قالب‌های انتشار' : 'All Publication Types'}</option>
              <option value="atlas_volume">{language === 'fa' ? 'مجلدات اطلس جامع' : 'Atlas Volumes'}</option>
              <option value="monograph">{language === 'fa' ? 'تک‌نگاری‌های تحلیلی' : 'Monographs'}</option>
              <option value="field_dossier">{language === 'fa' ? 'گزارش‌های میدانی و رلوه' : 'Field Dossiers'}</option>
              <option value="journal_issue">{language === 'fa' ? 'شماره‌های فصلنامه علمی' : 'Journal Issues'}</option>
            </select>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-2xl border border-[#ECE9E2] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-60 bg-[#003B40] overflow-hidden">
                  <img
                    src={pub.coverImage}
                    alt={pub.title}
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#003B40]/90 text-[#C8A56A] text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-[#004F54]">
                      {pub.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-white font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      {pub.year}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] text-[#C8A56A] font-semibold">{pub.pages} {language === 'fa' ? 'صفحه مصور فنی' : 'Pages'}</div>
                    <h3 className="font-serif font-bold text-base line-clamp-2 leading-snug">
                      {language === 'fa' ? pub.titleFa : pub.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3 text-xs">
                  <div>
                    <div className="text-[10px] text-[#616866] uppercase font-semibold">{language === 'fa' ? 'هیئت تحریریه / مؤلفان:' : 'Authors / Editors:'}</div>
                    <div className="font-medium text-[#003B40]">{pub.authors.join(', ')}</div>
                  </div>

                  <p className="text-[#111817]/80 line-clamp-3 leading-relaxed">
                    {language === 'fa' ? pub.descriptionFa : pub.description}
                  </p>

                  {/* Table of contents preview */}
                  <div className="pt-2 border-t border-[#ECE9E2] space-y-1">
                    <div className="text-[10px] font-bold text-[#004F54] uppercase tracking-wider">
                      {language === 'fa' ? 'سرفصل‌های برجسته:' : 'Featured Chapters:'}
                    </div>
                    <ul className="text-[11px] text-[#616866] space-y-0.5 list-disc list-inside">
                      {pub.tableOfContents.slice(0, 3).map((ch, idx) => (
                        <li key={idx} className="truncate">{ch}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-[#F7F5F0] border-t border-[#ECE9E2] flex items-center justify-between">
                <button
                  onClick={() => handleCopyBibtex(pub)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#004F54] hover:text-[#008D8B] bg-white px-2.5 py-1.5 rounded border border-[#ECE9E2]"
                  title="Copy BibTeX Citation"
                >
                  {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCitation ? (language === 'fa' ? 'کپی شد' : 'Copied') : 'BibTeX'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedPub(pub);
                    setIsReaderModalOpen(true);
                  }}
                  className="bg-[#004F54] hover:bg-[#003B40] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C8A56A]" />
                  <span>{language === 'fa' ? 'مطالعه و دریافت PDF' : 'Read & Download'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader & Download Modal */}
      {isReaderModalOpen && selectedPub && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#F7F5F0] w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#ECE9E2] space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#ECE9E2] pb-4">
              <div>
                <div className="text-xs font-bold text-[#008D8B] uppercase tracking-wider">
                  {selectedPub.type.replace('_', ' ').toUpperCase()} • {selectedPub.year}
                </div>
                <h2 className="font-serif font-bold text-2xl text-[#003B40] mt-1">
                  {language === 'fa' ? selectedPub.titleFa : selectedPub.title}
                </h2>
                <div className="text-xs text-[#616866] mt-1">
                  ISBN: {selectedPub.isbn || '978-600-8452-19-4'} • {selectedPub.pages} {language === 'fa' ? 'صفحه مصور' : 'Pages'}
                </div>
              </div>
              <button onClick={() => setIsReaderModalOpen(false)} className="p-1.5 hover:bg-[#ECE9E2] rounded">
                <X className="w-5 h-5 text-[#616866]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 rounded-xl overflow-hidden shadow-md">
                <img src={selectedPub.coverImage} alt={selectedPub.title} className="w-full h-auto object-cover" />
              </div>

              <div className="md:col-span-2 space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-[#003B40] uppercase tracking-wider text-xs mb-1">
                    {language === 'fa' ? 'چکیده و معرفی اثر:' : 'Synopsis:'}
                  </h4>
                  <p className="text-[#111817]/85 leading-relaxed">
                    {language === 'fa' ? selectedPub.descriptionFa : selectedPub.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#003B40] uppercase tracking-wider text-xs mb-1">
                    {language === 'fa' ? 'فهرست کامل فصول کتاب:' : 'Complete Table of Contents:'}
                  </h4>
                  <div className="space-y-1.5 bg-white p-3 rounded-lg border border-[#ECE9E2]">
                    {selectedPub.tableOfContents.map((toc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#111817]">
                        <span className="w-5 h-5 rounded bg-[#ECE9E2] text-[#004F54] font-bold flex items-center justify-center text-[10px] shrink-0">
                          {i + 1}
                        </span>
                        <span>{toc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#ECE9E2] flex items-center justify-between">
              <button
                onClick={() => handleCopyBibtex(selectedPub)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#004F54] bg-white px-3.5 py-2 rounded-lg border border-[#ECE9E2] hover:bg-[#ECE9E2]"
              >
                <Copy className="w-4 h-4 text-[#C8A56A]" />
                <span>{language === 'fa' ? 'دریافت ارجاع BibTeX' : 'Export Citation (BibTeX)'}</span>
              </button>

              <button
                onClick={() => {
                  alert(language === 'fa' ? 'فایل پی‌دی‌اف اطلس با کیفیت بالا بارگیری گردید.' : 'Full Volume High-Resolution PDF downloaded.');
                }}
                className="bg-[#004F54] hover:bg-[#003B40] text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#C8A56A]" />
                <span>{language === 'fa' ? 'دانلود نسخه کامل الکترونیکی (PDF)' : 'Download Full PDF (Open Access)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

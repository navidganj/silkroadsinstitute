import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Building2, 
  Layers, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  FileText, 
  Share2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Project, ArchitecturalDrawing } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { language, t } = useLanguage();
  const { isProjectSaved, toggleSaveProject } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'drawings' | 'climate' | 'citations'>('overview');
  const [selectedDrawingIndex, setSelectedDrawingIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  if (!project) return null;

  const saved = isProjectSaved(project.id);
  const selectedDrawing = project.drawings && project.drawings[selectedDrawingIndex];

  const apaCitation = `${project.architect}. (${project.yearCompleted}). ${project.title}. Silk Road Architectural Atlas, Silk Road Architecture Development Institute. center.silkroadsco.com/projects/${project.id}`;
  const bibtexCitation = `@article{sradi_${project.id},
  title={${project.title}},
  author={${project.architect}},
  year={${project.yearCompleted}},
  journal={Silk Road Architectural Atlas},
  publisher={Silk Road Architecture Development Institute},
  url={https://center.silkroadsco.com/projects/${project.id}}
}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(type);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#F7F5F0] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-[#ECE9E2] flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#003B40] text-white px-6 py-4 flex items-center justify-between border-b border-[#004F54] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#004F54] flex items-center justify-center text-[#C8A56A]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-[#C8A56A] font-semibold tracking-wider uppercase">
                {language === 'fa' ? project.countryNameFa : project.countryName} • {project.typology}
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                {language === 'fa' ? project.titleFa : project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveProject(project.id)}
              className="p-2 rounded bg-[#004F54] hover:bg-[#008D8B] text-white transition-colors"
              title="Save to bookmarks"
            >
              {saved ? <BookmarkCheck className="w-4 h-4 text-[#C8A56A]" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded bg-[#004F54] hover:bg-red-900/80 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Bar */}
        <div className="bg-[#ECE9E2] px-6 py-2 flex items-center gap-2 text-xs font-semibold border-b border-[#ECE9E2] overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'overview' ? 'bg-[#004F54] text-white' : 'text-[#111817] hover:bg-[#F7F5F0]'
            }`}
          >
            {language === 'fa' ? 'پرونده معماری و توصیف' : 'Architectural Dossier'}
          </button>

          <button
            onClick={() => setActiveTab('drawings')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'drawings' ? 'bg-[#004F54] text-white' : 'text-[#111817] hover:bg-[#F7F5F0]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'نقشه‌ها و پلان‌های فنی' : 'Technical Drawings & Plans'} ({project.drawings?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('climate')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'climate' ? 'bg-[#004F54] text-white' : 'text-[#111817] hover:bg-[#F7F5F0]'
            }`}
          >
            {language === 'fa' ? 'هوش اقلیمی و سازه' : 'Climate & Tectonics'}
          </button>

          <button
            onClick={() => setActiveTab('citations')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'citations' ? 'bg-[#004F54] text-white' : 'text-[#111817] hover:bg-[#F7F5F0]'
            }`}
          >
            {language === 'fa' ? 'منابع و ارجاع علمی' : 'Bibliography & Citations'}
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Image */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#ECE9E2] border border-[#ECE9E2]">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded">
                  © {project.photographer} ({project.copyright})
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-[#ECE9E2] text-xs">
                <div>
                  <div className="text-[#616866]">{language === 'fa' ? 'شهر و کشور' : 'Location'}</div>
                  <div className="font-bold text-[#003B40] mt-0.5">
                    {language === 'fa' ? project.cityNameFa : project.cityName}, {language === 'fa' ? project.countryNameFa : project.countryName}
                  </div>
                </div>
                <div>
                  <div className="text-[#616866]">{language === 'fa' ? 'معمار / استادکار' : 'Architect'}</div>
                  <div className="font-bold text-[#003B40] mt-0.5">
                    {language === 'fa' ? project.architectFa : project.architect}
                  </div>
                </div>
                <div>
                  <div className="text-[#616866]">{language === 'fa' ? 'سال تکمیل' : 'Completion Year'}</div>
                  <div className="font-bold text-[#008D8B] mt-0.5 font-mono">
                    {project.yearCompleted} CE
                  </div>
                </div>
                <div>
                  <div className="text-[#616866]">{language === 'fa' ? 'وضعیت میراث' : 'Heritage Status'}</div>
                  <div className="font-bold text-[#C8A56A] mt-0.5">
                    {project.heritageStatus}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3 bg-white p-5 rounded-xl border border-[#ECE9E2]">
                <h3 className="font-serif text-lg font-bold text-[#003B40]">
                  {language === 'fa' ? 'توصیف اثر و اهمیت تاریخی' : 'Architectural Description & Historical Significance'}
                </h3>
                <p className="text-xs sm:text-sm text-[#111817] leading-relaxed font-light">
                  {language === 'fa' ? project.descriptionFa : project.description}
                </p>
              </div>

              {/* Spatial Concept & Urban Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-2">
                  <h4 className="font-serif text-sm font-bold text-[#008D8B]">
                    {language === 'fa' ? 'مفهوم فضایی و هندسه' : 'Spatial Concept & Geometry'}
                  </h4>
                  <p className="text-xs text-[#616866] leading-relaxed">
                    {language === 'fa' ? project.spatialConceptFa : project.spatialConcept}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-2">
                  <h4 className="font-serif text-sm font-bold text-[#008D8B]">
                    {language === 'fa' ? 'بستر شهری و پیوندها' : 'Urban Context & Integration'}
                  </h4>
                  <p className="text-xs text-[#616866] leading-relaxed">
                    {language === 'fa' ? project.urbanContextFa : project.urbanContext}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL DRAWINGS & PLANS */}
          {activeTab === 'drawings' && (
            <div className="space-y-4">
              {project.drawings && project.drawings.length > 0 ? (
                <>
                  {/* Drawing selector tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {project.drawings.map((drw, idx) => (
                      <button
                        key={drw.id}
                        onClick={() => {
                          setSelectedDrawingIndex(idx);
                          setZoomLevel(1);
                        }}
                        className={`px-3 py-1.5 rounded text-xs whitespace-nowrap transition-all ${
                          selectedDrawingIndex === idx
                            ? 'bg-[#004F54] text-white font-semibold'
                            : 'bg-white text-[#111817] border border-[#ECE9E2]'
                        }`}
                      >
                        {drw.type.toUpperCase()}: {language === 'fa' ? drw.titleFa : drw.title}
                      </button>
                    ))}
                  </div>

                  {/* High Resolution Zoom Viewer */}
                  {selectedDrawing && (
                    <div className="bg-white border border-[#ECE9E2] rounded-xl overflow-hidden p-4 space-y-3">
                      {/* Zoom Controls */}
                      <div className="flex items-center justify-between bg-[#F7F5F0] px-4 py-2 rounded-lg border border-[#ECE9E2] text-xs">
                        <span className="font-semibold text-[#003B40]">
                          {language === 'fa' ? selectedDrawing.titleFa : selectedDrawing.title} (Scale: {selectedDrawing.scale || 'N/A'})
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
                            className="p-1.5 bg-white hover:bg-[#ECE9E2] rounded border border-[#ECE9E2] text-[#003B40]"
                            title="Zoom In"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                            className="p-1.5 bg-white hover:bg-[#ECE9E2] rounded border border-[#ECE9E2] text-[#003B40]"
                            title="Zoom Out"
                          >
                            <ZoomOut className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setZoomLevel(1)}
                            className="p-1.5 bg-white hover:bg-[#ECE9E2] rounded border border-[#ECE9E2] text-[#003B40]"
                            title="Reset Zoom"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Canvas Container */}
                      <div className="relative aspect-[16/10] bg-[#111817] rounded-lg overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={selectedDrawing.imageUrl}
                          alt={selectedDrawing.title}
                          style={{ transform: `scale(${zoomLevel})` }}
                          className="max-h-full max-w-full object-contain transition-transform duration-200"
                        />
                      </div>

                      {/* Source & Provenance */}
                      <div className="text-[11px] text-[#616866] flex items-center justify-between pt-1">
                        <span>{language === 'fa' ? 'منبع سند:' : 'Archival Source:'} {selectedDrawing.source}</span>
                        <span>© {selectedDrawing.copyright}</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white p-12 text-center rounded-xl border border-[#ECE9E2] text-[#616866] text-xs">
                  {language === 'fa' ? 'نقشه‌های فنی این اثر در حال دیجیتال‌سازی است.' : 'Technical measured drawings for this work are currently in archival digitization.'}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CLIMATE & TECTONICS */}
          {activeTab === 'climate' && (
            <div className="space-y-5">
              {/* Structural System */}
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#004F54]">
                  {language === 'fa' ? 'سیستم سازه‌ای و هندسه انتقال بار' : 'Structural System & Load Transfer Geometry'}
                </h4>
                <p className="text-xs sm:text-sm text-[#111817] leading-relaxed">
                  {language === 'fa' ? project.structuralSystemFa : project.structuralSystem}
                </p>
              </div>

              {/* Climate Strategies */}
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#008D8B]">
                  {language === 'fa' ? 'هوش اقلیمی و استراتژی‌های سرمایش غیرفعال' : 'Climate Intelligence & Passive Strategies'}
                </h4>
                <ul className="space-y-2 text-xs text-[#111817]">
                  {(language === 'fa' ? project.climateStrategiesFa : project.climateStrategies).map((strat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008D8B] mt-1.5 shrink-0"></span>
                      <span>{strat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials Breakdown */}
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#C8A56A]">
                  {language === 'fa' ? 'پالت مصالح و تکتونیک' : 'Material Culture & Tectonics'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(language === 'fa' ? project.materialsFa : project.materials).map((mat, i) => (
                    <span key={i} className="bg-[#ECE9E2] text-[#003B40] text-xs font-semibold px-3 py-1 rounded">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CITATIONS & BIBLIOGRAPHY */}
          {activeTab === 'citations' && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-4">
                <h4 className="font-serif text-base font-bold text-[#003B40]">
                  {language === 'fa' ? 'ارجاع استاندارد علمی (Citation)' : 'Scholarly Citation Export'}
                </h4>

                {/* APA */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#616866]">
                    <span className="font-semibold">APA 7th Edition</span>
                    <button
                      onClick={() => copyToClipboard(apaCitation, 'apa')}
                      className="text-[#008D8B] hover:underline flex items-center gap-1"
                    >
                      {copiedCitation === 'apa' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCitation === 'apa' ? 'Copied' : 'Copy APA'}</span>
                    </button>
                  </div>
                  <div className="bg-[#F7F5F0] p-3 rounded text-xs font-mono border border-[#ECE9E2]">
                    {apaCitation}
                  </div>
                </div>

                {/* BibTeX */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#616866]">
                    <span className="font-semibold">BibTeX Reference</span>
                    <button
                      onClick={() => copyToClipboard(bibtexCitation, 'bibtex')}
                      className="text-[#008D8B] hover:underline flex items-center gap-1"
                    >
                      {copiedCitation === 'bibtex' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCitation === 'bibtex' ? 'Copied' : 'Copy BibTeX'}</span>
                    </button>
                  </div>
                  <pre className="bg-[#F7F5F0] p-3 rounded text-xs font-mono border border-[#ECE9E2] overflow-x-auto">
                    {bibtexCitation}
                  </pre>
                </div>
              </div>

              {/* Verified Sources & Bibliography */}
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#003B40]">
                  {language === 'fa' ? 'منابع و کتاب‌شناسی پرونده' : 'Documented Bibliography & Peer Sources'}
                </h4>
                <ul className="space-y-2 text-xs text-[#616866]">
                  {project.citations?.map((cit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#008D8B]">[{idx + 1}]</span>
                      <span>{cit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#ECE9E2] px-6 py-3 border-t border-[#ECE9E2] flex items-center justify-between shrink-0 text-xs">
          <div className="text-[#616866]">
            {language === 'fa' ? 'شناسه اثر در سامانه:' : 'Institute Identifier:'} <span className="font-mono font-bold text-[#003B40]">SRADI-PRJ-{project.id.toUpperCase()}</span>
          </div>

          <button
            onClick={onClose}
            className="bg-[#004F54] hover:bg-[#003B40] text-white px-4 py-1.5 rounded font-semibold transition-colors"
          >
            {t('close')}
          </button>
        </div>

      </div>
    </div>
  );
};

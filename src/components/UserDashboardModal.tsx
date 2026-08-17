import React, { useState } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Ticket, 
  GraduationCap, 
  X, 
  MapPin, 
  Calendar, 
  Building2, 
  Eye, 
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';
import { useAuth } from '../../src/context/AuthContext';
import { initialProjects, initialResearchItems, initialArchiveItems, initialPrograms, initialEvents } from '../data/seedData';
import { Project } from '../types';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const { language, t } = useLanguage();
  const { currentUser, userRole, toggleSaveProject, toggleSaveResearch, toggleSaveArchive } = useAuth();

  const [activeTab, setActiveTab] = useState<'saved_projects' | 'saved_research' | 'saved_archive' | 'applications' | 'submissions'>('saved_projects');

  if (!isOpen) return null;

  const savedProjectsList = initialProjects.filter(p => currentUser.savedProjectIds.includes(p.id));
  const savedResearchList = initialResearchItems.filter(r => currentUser.savedResearchIds.includes(r.id));
  const savedArchiveList = initialArchiveItems.filter(a => currentUser.savedArchiveIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#F7F5F0] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-[#ECE9E2] flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#003B40] p-6 text-white flex items-center justify-between border-b border-[#004F54]">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#C8A56A]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-xl">
                  {language === 'fa' ? currentUser.nameFa : currentUser.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#004F54] text-[#C8A56A] text-[10px] font-bold uppercase tracking-wider border border-[#008D8B]/30">
                  {userRole}
                </span>
              </div>
              <div className="text-xs text-[#ECE9E2]/80">
                {currentUser.organization || currentUser.profession} • {currentUser.city}, {currentUser.country}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-[#004F54] rounded-lg transition-colors text-[#ECE9E2]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#ECE9E2] bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab('saved_projects')}
            className={`pb-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'saved_projects' ? 'border-[#004F54] text-[#004F54]' : 'border-transparent text-[#616866] hover:text-[#111817]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'پروژه‌های ذخیره‌شده' : 'Saved Projects'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ECE9E2]">{savedProjectsList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('saved_research')}
            className={`pb-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'saved_research' ? 'border-[#004F54] text-[#004F54]' : 'border-transparent text-[#616866] hover:text-[#111817]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'مقالات نشان‌شده' : 'Bookmarked Papers'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ECE9E2]">{savedResearchList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'applications' ? 'border-[#004F54] text-[#004F54]' : 'border-transparent text-[#616866] hover:text-[#111817]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'درخواست‌های بورسیه' : 'Fellowship Applications'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ECE9E2]">{currentUser.applications.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'submissions' ? 'border-[#004F54] text-[#004F54]' : 'border-transparent text-[#616866] hover:text-[#111817]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'fa' ? 'پروژه‌های ارسالی من' : 'My Submissions'}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ECE9E2]">{currentUser.submissions.length}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">

          {/* Saved Projects */}
          {activeTab === 'saved_projects' && (
            <div className="space-y-3">
              {savedProjectsList.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#616866]">
                  {language === 'fa' ? 'هیچ پروژه‌ای ذخیره نشده است.' : 'No saved architectural projects in your collection yet.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedProjectsList.map((p) => (
                    <div key={p.id} className="bg-white p-3 rounded-xl border border-[#ECE9E2] flex items-center justify-between gap-3 shadow-sm hover:shadow transition-shadow">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={p.heroImage} alt={p.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#003B40] truncate">
                            {language === 'fa' ? p.titleFa : p.title}
                          </h4>
                          <div className="text-[11px] text-[#616866] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span>{p.cityName}, {p.countryName}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProject(p);
                          }}
                          className="p-1.5 rounded bg-[#ECE9E2] hover:bg-[#004F54] hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleSaveProject(p.id)}
                          className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Research Papers */}
          {activeTab === 'saved_research' && (
            <div className="space-y-3">
              {savedResearchList.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#616866]">
                  {language === 'fa' ? 'هیچ مقاله پژوهشی نشان نشده است.' : 'No bookmarked research papers.'}
                </div>
              ) : (
                <div className="space-y-2">
                  {savedResearchList.map((r) => (
                    <div key={r.id} className="bg-white p-4 rounded-xl border border-[#ECE9E2] flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#003B40]">
                          {language === 'fa' ? r.titleFa : r.title}
                        </h4>
                        <div className="text-xs text-[#616866] mt-1">
                          {r.authors.map(a => a.name).join(', ')} • {r.publicationDate}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveResearch(r.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Fellowship Applications Status */}
          {activeTab === 'applications' && (
            <div className="space-y-3">
              {currentUser.applications.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#616866]">
                  {language === 'fa' ? 'شما تاکنون درخواستی ثبت نکرده‌اید.' : 'No active program applications.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentUser.applications.map((app, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-[#ECE9E2] flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-sm text-[#003B40]">
                          {app.programTitle}
                        </h4>
                        <div className="text-xs text-[#616866]">
                          {language === 'fa' ? `تاریخ ارسال پرونده: ${app.submittedAt}` : `Submitted on: ${app.submittedAt}`}
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{app.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User Architectural Submissions */}
          {activeTab === 'submissions' && (
            <div className="space-y-3">
              {currentUser.submissions.length === 0 ? (
                <div className="text-center py-12 text-xs text-[#616866]">
                  {language === 'fa' ? 'هیچ پروژه‌ای توسط شما ثبت نشده است.' : 'No submitted proposals.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentUser.submissions.map((sub, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-[#ECE9E2] flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-sm text-[#003B40]">
                          {sub.title}
                        </h4>
                        <div className="text-xs text-[#616866]">
                          {language === 'fa' ? `تاریخ ثبت: ${sub.submittedAt}` : `Submitted on: ${sub.submittedAt}`}
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-teal-100 text-teal-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{sub.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

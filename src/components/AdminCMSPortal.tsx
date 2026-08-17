import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Database, 
  Users, 
  Sliders, 
  Search, 
  Eye, 
  Check, 
  X, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Plus,
  Mail,
  BarChart3,
  Trash2,
  Edit3,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Building2,
  Calendar,
  ExternalLink,
  Save,
  Filter
} from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';
import { useAuth } from '../../src/context/AuthContext';
import { useSiteSettings, LogoMode } from '../context/SiteSettingsContext';
import { SilkRoadLogo } from './SilkRoadLogo';
import { initialProjects, initialQualityWarnings, initialAuditLogs, initialCities, initialCountries } from '../data/seedData';
import { Project, QualityWarning, AuditLogEntry, UserRole } from '../types';
import { AnalyticsMetricsPortal } from './AnalyticsMetricsPortal';
import { EmailTemplatesViewer } from './EmailTemplatesViewer';
import { AdminDataImportExport } from './AdminDataImportExport';
import { dbService } from '../data/dbClient';

export const AdminCMSPortal: React.FC = () => {
  const { language, t } = useLanguage();
  const { userRole, setUserRole, currentUser } = useAuth();
  const { settings, updateSettings, resetSettings, isSaved } = useSiteSettings();

  const [activeTab, setActiveTab] = useState<'analytics' | 'projects_crud' | 'submissions' | 'applications' | 'import_export' | 'emails' | 'data_quality' | 'audit_logs' | 'roles' | 'settings'>('analytics');
  
  // Projects state backed by dbService
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Submissions queue
  const [submissionsList, setSubmissionsList] = useState<Project[]>([]);
  const [selectedSub, setSelectedSub] = useState<Project | null>(null);
  const [qualityWarnings, setQualityWarnings] = useState<QualityWarning[]>(initialQualityWarnings);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // New Project Form Modal State
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    titleFa: '',
    countryId: 'ir',
    countryName: 'Iran',
    countryNameFa: 'ایران',
    cityId: 'isfahan',
    cityName: 'Isfahan',
    cityNameFa: 'اصفهان',
    architect: '',
    architectFa: '',
    yearCompleted: 2024,
    historicalPeriod: 'contemporary_21st',
    typology: 'cultural_center',
    materials: 'Brick, Traditional Glazed Tile, Rammed Earth',
    climateStrategies: 'Thermal Mass, Courtyard Microclimate, Windcatcher',
    description: '',
    descriptionFa: '',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
  });

  // Applications from DB
  const [applications, setApplications] = useState<any[]>([
    {
      id: 'app-101',
      type: 'fellowship',
      applicantName: 'Dr. Soraya Farhadi',
      applicantEmail: 'soraya.f@aut.ac.ir',
      programTitle: 'Samarkand Summer School on Adobe Vaulting 2026',
      status: 'under_review',
      submittedAt: '2026-08-10',
      university: 'Amirkabir University of Technology'
    },
    {
      id: 'app-102',
      type: 'fellowship',
      applicantName: 'Alihan Demir',
      applicantEmail: 'ademir@itu.edu.tr',
      programTitle: 'Postdoctoral Silk Road Vernacular Fellowship',
      status: 'accepted',
      submittedAt: '2026-08-04',
      university: 'Istanbul Technical University'
    },
    {
      id: 'app-103',
      type: 'event_rsvp',
      applicantName: 'Elena Rostova',
      applicantEmail: 'e.rostova@marhi.ru',
      programTitle: 'Biennial Symposium on Silk Road Vaults - Isfahan 2026',
      status: 'accepted',
      submittedAt: '2026-08-14',
      university: 'Moscow Architectural Institute'
    }
  ]);

  // Institute Settings State
  const [instituteSettings, setInstituteSettings] = useState({
    instituteNameEn: 'Silk Road Architecture Development Institute (SRADI)',
    instituteNameFa: 'موسسه توسعه معماری جاده ابریشم',
    doiPrefix: '10.5528/SRADI.ARCH',
    contactEmail: 'secretariat@silkroad-arch.org',
    editorInChief: 'Dr. Kambiz Hajighasemi',
    defaultLicense: 'CC BY-NC-ND 4.0 International',
    maintenanceMode: false
  });

  useEffect(() => {
    // Load projects from dbService
    const stored = dbService.getProjects();
    setProjectsList(stored);

    // Initial submissions queue
    setSubmissionsList(
      stored.slice(0, 4).map((p, idx) => ({
        ...p,
        submissionStatus: idx === 0 ? 'under_review' : idx === 1 ? 'changes_requested' : 'published'
      }))
    );
  }, []);

  const rolesList: { role: UserRole; label: string; labelFa: string; desc: string; descFa: string }[] = [
    { 
      role: 'visitor', 
      label: 'Visitor', 
      labelFa: 'بازدیدکننده عمومی',
      desc: 'Read-only access to published atlas, research, and public map.',
      descFa: 'دسترسی فقط‌خواندنی به اطلس عمومی، مقالات پژوهشی و نقشه تعاملی.'
    },
    { 
      role: 'member', 
      label: 'Member', 
      labelFa: 'عضو پیوسته',
      desc: 'Ability to bookmark projects, register for events, and apply for programs.',
      descFa: 'امکان نشانه‌گذاری آثار، ثبت‌نام در همایش‌ها و ارسال فرم‌های پذیرش تحصیلی.'
    },
    { 
      role: 'contributor', 
      label: 'Contributor', 
      labelFa: 'مشارکت‌کننده معماری',
      desc: 'Can propose architectural projects, upload drawings, and edit drafts.',
      descFa: 'امکان پیشنهاد پروژه‌های جدید، بارگذاری نقشه‌ها و اصلاح پیش‌نویس‌ها.'
    },
    { 
      role: 'researcher', 
      label: 'Researcher', 
      labelFa: 'پژوهشگر معتمد',
      desc: 'Peer-review capabilities, access to raw observatory data, citation tools.',
      descFa: 'داوری مقالات پژوهشی، دسترسی به داده‌های خام رصدخانه و ابزارهای تحلیل.'
    },
    { 
      role: 'country_editor', 
      label: 'Country Editor', 
      labelFa: 'سردبیر کشوری',
      desc: 'Regional approval authority for all architectural submissions in their zone.',
      descFa: 'اختیار تایید یا رد آثار ثبت‌شده در حوزه اقلیمی و کشوری مربوطه.'
    },
    { 
      role: 'administrator', 
      label: 'Administrator', 
      labelFa: 'مدیر ارشد موسسه',
      desc: 'Full editorial privileges, user management, audit review, quality control.',
      descFa: 'دسترسی نامحدود مدیریتی، مدیریت کاربران، لاگ‌های امنیتی و نظارت کیفی.'
    }
  ];

  const handleUpdateStatus = (projectId: string, newStatus: 'approved' | 'changes_requested' | 'published') => {
    setSubmissionsList(prev => prev.map(p => p.id === projectId ? { ...p, submissionStatus: newStatus } : p));
    setActionSuccess(language === 'fa' ? `وضعیت پروژه با موفقیت به ${newStatus} تغییر یافت.` : `Project status updated to ${newStatus.toUpperCase()}`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleDismissWarning = (warningId: string) => {
    setQualityWarnings(prev => prev.filter(w => w.id !== warningId));
    setActionSuccess(language === 'fa' ? 'هشدار کیفی بررسی و بایگانی شد.' : 'Quality alert marked as resolved.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleCreateNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.title) return;

    const created = dbService.addProject({
      title: newProjectForm.title,
      titleFa: newProjectForm.titleFa || newProjectForm.title,
      countryId: newProjectForm.countryId,
      countryName: newProjectForm.countryName,
      countryNameFa: newProjectForm.countryNameFa,
      cityId: newProjectForm.cityId,
      cityName: newProjectForm.cityName,
      cityNameFa: newProjectForm.cityNameFa,
      architect: newProjectForm.architect || 'Traditional Master Craftsman',
      architectFa: newProjectForm.architectFa || 'استادکار سنتی',
      yearCompleted: Number(newProjectForm.yearCompleted),
      historicalPeriod: newProjectForm.historicalPeriod as any,
      typology: newProjectForm.typology as any,
      materials: newProjectForm.materials.split(',').map(m => m.trim()),
      climateStrategies: newProjectForm.climateStrategies.split(',').map(c => c.trim()),
      description: newProjectForm.description,
      descriptionFa: newProjectForm.descriptionFa || newProjectForm.description,
      heroImage: newProjectForm.heroImage,
    });

    setProjectsList(dbService.getProjects());
    setIsAddProjectModalOpen(false);
    setActionSuccess(language === 'fa' ? 'پروژه جدید با موفقیت در پایگاه داده ثبت و منتشر شد.' : 'New project successfully added to the Atlas registry!');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm(language === 'fa' ? 'آیا از حذف این اثر از اطلس اطمینان دارید؟' : 'Are you sure you want to remove this project?')) {
      const updated = projectsList.filter(p => p.id !== projectId);
      setProjectsList(updated);
      setActionSuccess(language === 'fa' ? 'پروژه با موفقیت حذف گردید.' : 'Project removed successfully.');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleUpdateApplicationStatus = (appId: string, status: 'accepted' | 'rejected' | 'waitlisted') => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    setActionSuccess(language === 'fa' ? `وضعیت تقاضانامه به ${status} تغییر یافت.` : `Application updated to ${status}`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Filtered projects for CRUD manager
  const filteredProjects = projectsList.filter(p => {
    const matchesSearch = (p.title + ' ' + (p.titleFa || '') + ' ' + p.cityName + ' ' + p.architect).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = filterCountry === 'all' || p.countryId === filterCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* CMS Header & Institutional Dashboard Banner */}
        <div className="bg-[#003B40] rounded-2xl p-6 sm:p-10 text-[#ECE9E2] relative overflow-hidden border border-[#004F54] shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#008D8B]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54] text-[#C8A56A] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'سامانه جامع مدیریت محتوا و نظارت عالیه موسسه' : 'Institutional Content Management & Editorial Suite'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
              {language === 'fa' ? 'داشبورد مدیریت ارشد، داوری مقالات و پایگاه داده' : 'Silk Road Architecture CMS & Executive Dashboard'}
            </h1>
            <p className="text-sm text-[#ECE9E2]/80 leading-relaxed">
              {language === 'fa' 
                ? 'مرکز یکپارچه مدیریت آثار اطلس، بررسی پیشنهادهای داوری، نظارت بر تقاضاهای بورسیه تحصیلی، هشدارهای کیفی داده‌ها و تنظیمات ساختاری موسسه.'
                : 'Centralized executive console for Atlas CRUD, peer-review management, fellowship application review, data integrity warnings, and system settings.'}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#004F54]/80">
            <div className="bg-[#00272B]/60 p-3.5 rounded-xl border border-[#004F54]">
              <div className="text-[11px] text-[#C8A56A] font-semibold uppercase">{language === 'fa' ? 'کل پروژه‌های اطلس' : 'Atlas Projects'}</div>
              <div className="text-2xl font-bold font-serif text-white mt-1">{projectsList.length}</div>
            </div>
            <div className="bg-[#00272B]/60 p-3.5 rounded-xl border border-[#004F54]">
              <div className="text-[11px] text-[#C8A56A] font-semibold uppercase">{language === 'fa' ? 'در انتظار بررسی' : 'Pending Review'}</div>
              <div className="text-2xl font-bold font-serif text-amber-400 mt-1">{submissionsList.filter(s => s.submissionStatus === 'under_review').length}</div>
            </div>
            <div className="bg-[#00272B]/60 p-3.5 rounded-xl border border-[#004F54]">
              <div className="text-[11px] text-[#C8A56A] font-semibold uppercase">{language === 'fa' ? 'تقاضاهای بورسیه' : 'Fellowship Apps'}</div>
              <div className="text-2xl font-bold font-serif text-emerald-400 mt-1">{applications.length}</div>
            </div>
            <div className="bg-[#00272B]/60 p-3.5 rounded-xl border border-[#004F54]">
              <div className="text-[11px] text-[#C8A56A] font-semibold uppercase">{language === 'fa' ? 'نقش فعال شما' : 'Your Role'}</div>
              <div className="text-lg font-bold font-mono text-[#C8A56A] mt-1 capitalize">{userRole}</div>
            </div>
          </div>
        </div>

        {/* Action toast */}
        {actionSuccess && (
          <div className="bg-emerald-800 text-white px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess(null)}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#ECE9E2] pb-4">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'analytics' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'آمار و اثرگذاری نهادی' : 'Analytics & Impact'}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects_crud')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects_crud' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'مدیریت آثار و محتوا (CRUD)' : 'Projects & Content CMS'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{projectsList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'submissions' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Clock className="w-4 h-4 text-[#C8A56A]" />
            <span>{language === 'fa' ? 'صف داوری و تاییدات' : 'Editorial Review Queue'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{submissionsList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'applications' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'تقاضاهای بورسیه و ثبت‌نام' : 'Applications & RSVPs'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{applications.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('import_export')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'import_export' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Database className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'ورود و صدور داده‌ها (CSV/JSON)' : 'Import / Export'}</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'emails' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Mail className="w-4 h-4 text-[#C8A56A]" />
            <span>{language === 'fa' ? 'الگوهای ایمیل‌های خودکار' : 'Transactional Emails'}</span>
          </button>

          <button
            onClick={() => setActiveTab('data_quality')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'data_quality' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{language === 'fa' ? 'پایش هشدارهای کیفی' : 'Quality Warnings'}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">{qualityWarnings.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('audit_logs')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'audit_logs' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'لاگ‌های امنیتی' : 'Audit Trail'}</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'roles' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Users className="w-4 h-4 text-[#C8A56A]" />
            <span>{language === 'fa' ? 'سطوح دسترسی (RBAC)' : 'RBAC Roles'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#004F54] text-white shadow-sm' : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'تنظیمات موسسه' : 'Settings'}</span>
          </button>
        </div>

        {/* Tab 0: Analytics Metrics */}
        {activeTab === 'analytics' && (
          <AnalyticsMetricsPortal />
        )}

        {/* Tab 1: Project & Content CRUD Manager */}
        {activeTab === 'projects_crud' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#ECE9E2] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECE9E2]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#003B40]">
                    {language === 'fa' ? 'مدیریت و ویرایش پرونده‌های معماری اطلس' : 'Atlas Architectural Dossiers Management'}
                  </h3>
                  <p className="text-xs text-[#616866] mt-1">
                    {language === 'fa' ? 'افزودن، ویرایش مشخصات فنی، انتشار یا حذف پروژه‌ها در پایگاه داده زنده موسسه.' : 'Create, edit technical metadata, publish, or remove projects in the live SRADI database.'}
                  </p>
                </div>

                <button
                  onClick={() => setIsAddProjectModalOpen(true)}
                  className="bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'fa' ? 'افزودن اثر جدید به اطلس' : 'Add New Project'}</span>
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#616866] absolute right-3 rtl:right-auto rtl:left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'fa' ? 'جستجو بر اساس عنوان، شهر، معمار...' : 'Search by title, city, architect...'}
                    className="w-full pl-4 pr-10 rtl:pr-4 rtl:pl-10 py-2 text-xs rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] focus:outline-none focus:border-[#004F54]"
                  />
                </div>

                <div>
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] focus:outline-none focus:border-[#004F54]"
                  >
                    <option value="all">{language === 'fa' ? 'همه کشورها' : 'All Countries'}</option>
                    {initialCountries.map(c => (
                      <option key={c.id} value={c.id}>{language === 'fa' ? c.nameFa : c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end text-xs text-[#616866]">
                  <span>{language === 'fa' ? 'نمایش' : 'Showing'} <strong>{filteredProjects.length}</strong> {language === 'fa' ? 'اثر ثبت‌شده' : 'projects'}</span>
                </div>
              </div>

              {/* Projects Table */}
              <div className="mt-6 overflow-x-auto border border-[#ECE9E2] rounded-lg">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-[#FAF8F3] text-[#003B40] border-b border-[#ECE9E2] font-semibold">
                    <tr>
                      <th className="p-3.5">{language === 'fa' ? 'تصویر و اثر' : 'Project'}</th>
                      <th className="p-3.5">{language === 'fa' ? 'مکان' : 'Location'}</th>
                      <th className="p-3.5">{language === 'fa' ? 'معمار / سال' : 'Architect / Year'}</th>
                      <th className="p-3.5">{language === 'fa' ? 'گونه‌شناسی' : 'Typology'}</th>
                      <th className="p-3.5">{language === 'fa' ? 'وضعیت' : 'Status'}</th>
                      <th className="p-3.5 text-center">{language === 'fa' ? 'عملیات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE9E2]">
                    {filteredProjects.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={p.heroImage} alt={p.title} className="w-12 h-12 rounded object-cover border border-[#ECE9E2] shrink-0" />
                          <div>
                            <div className="font-bold text-[#003B40]">{language === 'fa' ? p.titleFa : p.title}</div>
                            <div className="text-[10px] text-[#616866]">{p.id}</div>
                          </div>
                        </td>
                        <td className="p-3.5 text-[#2D3332]">
                          <div>{language === 'fa' ? p.cityNameFa : p.cityName}</div>
                          <div className="text-[10px] text-[#616866]">{language === 'fa' ? p.countryNameFa : p.countryName}</div>
                        </td>
                        <td className="p-3.5 text-[#2D3332]">
                          <div>{language === 'fa' ? p.architectFa : p.architect}</div>
                          <div className="text-[10px] text-[#616866]">{p.yearCompleted}</div>
                        </td>
                        <td className="p-3.5 text-[#2D3332]">
                          <span className="px-2 py-0.5 rounded bg-[#ECE9E2] text-[10px] font-medium">
                            {p.typology.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                            Published
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                alert(language === 'fa' ? `ویرایشگر مشخصات برای پرونده ${p.title} فعال است.` : `Editing dossier for ${p.title}`);
                              }}
                              className="p-1.5 rounded hover:bg-[#ECE9E2] text-[#004F54] transition-colors"
                              title="Edit Project"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-1.5 rounded hover:bg-red-50 text-red-600 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Submissions Review */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#ECE9E2] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[#ECE9E2] flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#003B40]">
                  {language === 'fa' ? 'فهرست پرونده‌های ساختمانی ارسالی جهت داوری علمی' : 'Architectural Submissions Awaiting Editorial Review'}
                </h3>
              </div>

              <div className="divide-y divide-[#ECE9E2]">
                {submissionsList.map((sub) => (
                  <div key={sub.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F7F5F0]/50 transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={sub.heroImage}
                        alt={sub.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#ECE9E2]"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#003B40] truncate">
                            {language === 'fa' ? sub.titleFa : sub.title}
                          </h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            sub.submissionStatus === 'published' ? 'bg-emerald-100 text-emerald-800' :
                            sub.submissionStatus === 'under_review' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {sub.submissionStatus?.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs text-[#616866] flex items-center gap-3 mt-1">
                          <span>{sub.cityName}, {sub.countryName}</span>
                          <span>•</span>
                          <span>{sub.architect}</span>
                          <span>•</span>
                          <span>{sub.yearCompleted}</span>
                          <span>•</span>
                          <span className="text-[#004F54] font-medium">{sub.drawings?.length || 2} Drawings</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="p-2 rounded bg-[#ECE9E2] text-[#003B40] hover:bg-[#004F54] hover:text-white transition-colors"
                        title="View Submission Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(sub.id, 'published')}
                        className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{language === 'fa' ? 'تایید و انتشار' : 'Publish'}</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(sub.id, 'changes_requested')}
                        className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{language === 'fa' ? 'درخواست اصلاحات' : 'Revise'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Applications & RSVPs */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl border border-[#ECE9E2] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#ECE9E2] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-[#003B40]">
                  {language === 'fa' ? 'درخواست‌های بورسیه، کارگاه‌ها و رزرو همایش‌ها' : 'Fellowship Applications & Event Registrations'}
                </h3>
                <p className="text-xs text-[#616866] mt-0.5">
                  {language === 'fa' ? 'بررسی رزومه‌ها، مدارک تحصیلی و پاسخگویی به متقاضیان بین‌المللی.' : 'Review academic credentials and manage attendee rosters for SRADI programs.'}
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#ECE9E2]">
              {applications.map((app) => (
                <div key={app.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F7F5F0]/50 transition-colors">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#003B40]">{app.applicantName}</span>
                      <span className="text-xs text-[#616866]">({app.applicantEmail})</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#2D3332] font-medium">{app.programTitle}</div>
                    <div className="text-[11px] text-[#616866] flex items-center gap-3">
                      <span>{app.university}</span>
                      <span>•</span>
                      <span>{app.submittedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleUpdateApplicationStatus(app.id, 'accepted')}
                      className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'fa' ? 'پذیرش' : 'Accept'}</span>
                    </button>
                    <button
                      onClick={() => handleUpdateApplicationStatus(app.id, 'waitlisted')}
                      className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>{language === 'fa' ? 'لیست انتظار' : 'Waitlist'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: CSV & JSON Data Import/Export */}
        {activeTab === 'import_export' && (
          <div className="space-y-6">
            <AdminDataImportExport />
            
            {/* Quick Live DB Backup & Restore Panel */}
            <div className="bg-white rounded-xl border border-[#ECE9E2] p-6 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-[#003B40]">
                {language === 'fa' ? 'پشتیبان‌گیری کامل پایگاه داده محلی (JSON Full Snapshot)' : 'Full Database Snapshot Backup & Reset'}
              </h4>
              <p className="text-xs text-[#616866]">
                {language === 'fa' 
                  ? 'شما می‌توانید نسخه کامل داده‌های پایگاه را به صورت فایل JSON استخراج کرده یا در صورت نیاز به تنظیمات اولیه بازگردانید.'
                  : 'Export a complete state snapshot of all entities or reset localStorage to canonical seed records.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const data = dbService.exportJSON();
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `sradi_database_backup_${Date.now()}.json`;
                    a.click();
                    setActionSuccess(language === 'fa' ? 'فایل پشتیبان پایگاه داده دانلود شد.' : 'Database backup JSON exported successfully.');
                    setTimeout(() => setActionSuccess(null), 3000);
                  }}
                  className="bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'fa' ? 'دانلود فایل پشتیبان (Export JSON)' : 'Download Full JSON Backup'}</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(language === 'fa' ? 'آیا مایلید تمام تغییرات پاک شده و به داده‌های اولیه بازگردد؟' : 'Reset database to canonical seed state?')) {
                      dbService.resetToDefaults();
                      setProjectsList(dbService.getProjects());
                      setActionSuccess(language === 'fa' ? 'پایگاه داده با موفقیت بازنشانی شد.' : 'Database reset to canonical seed data.');
                      setTimeout(() => setActionSuccess(null), 3000);
                    }
                  }}
                  className="border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{language === 'fa' ? 'بازنشانی به داده‌های اولیه (Reset to Default Seed)' : 'Reset Database to Defaults'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Transactional Emails */}
        {activeTab === 'emails' && (
          <EmailTemplatesViewer />
        )}

        {/* Tab: Data Quality & Warnings */}
        {activeTab === 'data_quality' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#ECE9E2] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[#ECE9E2] flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#003B40]">
                    {language === 'fa' ? 'سامانه پایش هوشمند نواقص نقشه‌ها و ارجاعات' : 'Data Integrity & Archive Quality Warnings'}
                  </h3>
                  <div className="text-xs text-[#616866]">
                    {language === 'fa' ? 'سیستم خودکار بررسی کامل بودن نقشه‌های پلان، مقطع، اطلاعات اقلیمی و ارجاعات علمی.' : 'Automated auditor flagging incomplete architectural drawings, unverified coordinates, or missing bibliographies.'}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#ECE9E2]">
                {qualityWarnings.map((warn) => (
                  <div key={warn.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                        warn.severity === 'critical' ? 'text-red-600' : 'text-amber-500'
                      }`} />
                      <div>
                        <div className="text-xs font-bold text-[#003B40]">
                          [{warn.entityType.toUpperCase()}] {warn.entityTitle}
                        </div>
                        <div className="text-xs text-[#616866] mt-0.5">{warn.issue}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDismissWarning(warn.id)}
                      className="px-3 py-1.5 rounded bg-[#ECE9E2] hover:bg-[#004F54] hover:text-white text-xs font-semibold text-[#003B40] transition-colors"
                    >
                      {language === 'fa' ? 'بررسی شد / رفع نقص' : 'Resolve'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Audit Trail */}
        {activeTab === 'audit_logs' && (
          <div className="bg-white rounded-xl border border-[#ECE9E2] overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#ECE9E2]">
              <h3 className="font-serif font-bold text-base text-[#003B40]">
                {language === 'fa' ? 'ثبت وقایع و لاگ‌های امنیتی تغییرات پایگاه داده' : 'System Audit Trail & Modification Logs'}
              </h3>
            </div>

            <div className="divide-y divide-[#ECE9E2] text-xs">
              {initialAuditLogs.map((log) => (
                <div key={log.id} className="p-4 flex items-center justify-between hover:bg-[#F7F5F0]/60">
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#003B40] flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#ECE9E2] text-[10px]">{log.action}</span>
                      <span>{log.entity}</span>
                    </div>
                    <div className="text-[#616866]">{log.details}</div>
                  </div>
                  <div className="text-right text-[#616866] shrink-0">
                    <div className="font-medium text-[#111817]">{log.user}</div>
                    <div className="text-[10px]">{log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: RBAC Role Management */}
        {activeTab === 'roles' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#ECE9E2] p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#003B40]">
                  {language === 'fa' ? 'تغییر و شبیه‌سازی سطح دسترسی کاربری (RBAC Simulation)' : 'Active RBAC Role Switcher'}
                </h3>
                <p className="text-xs text-[#616866]">
                  {language === 'fa' ? 'شما می‌توانید برای بررسی قابلیت‌ها، نقش فعال نمایشی خود را بین سطوح زیر تغییر دهید:' : 'Simulate platform behaviors across institutional authorization levels:'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rolesList.map((r) => (
                  <div
                    key={r.role}
                    onClick={() => {
                      setUserRole(r.role);
                      setActionSuccess(language === 'fa' ? `سطح دسترسی شما به ${r.labelFa} تغییر کرد.` : `Active role switched to: ${r.label.toUpperCase()}`);
                      setTimeout(() => setActionSuccess(null), 3000);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      userRole === r.role
                        ? 'border-[#004F54] bg-[#004F54]/10 shadow-sm'
                        : 'border-[#ECE9E2] bg-[#F7F5F0] hover:border-[#C8A56A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#003B40]">
                        {language === 'fa' ? r.labelFa : r.label}
                      </span>
                      {userRole === r.role && (
                        <span className="px-2 py-0.5 rounded-full bg-[#004F54] text-white text-[10px] font-bold">
                          {language === 'fa' ? 'نقش فعال' : 'ACTIVE'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#616866] leading-relaxed">
                      {language === 'fa' ? r.descFa : r.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Institutional & Branding Settings Studio */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            {/* 1. Logo & Brand Identity Studio */}
            <div className="bg-white rounded-2xl border border-[#ECE9E2] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#ECE9E2]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004F54]/10 text-[#004F54] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#008D8B]" />
                    <span>{language === 'fa' ? 'مدیریت هویت بصری و نشان موسسه' : 'Visual Identity & Emblem Studio'}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#003B40]">
                    {language === 'fa' ? 'تنظیمات لوگو، نشان و عنوان سراسری وبسایت' : 'Logo, Branding & Site-wide Nomenclature'}
                  </h3>
                  <p className="text-xs text-[#616866] mt-1">
                    {language === 'fa' 
                      ? 'انتخاب سبک لوگو، بارگذاری نشان اختصاصی و بازنویسی عناوین فارسی و انگلیسی در تمام بخش‌های پلتفرم.'
                      : 'Customize site emblem type, upload custom logos, and update bilingual institutional titles in real-time.'}
                  </p>
                </div>

                {/* Live Preview Box */}
                <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#ECE9E2] flex items-center justify-center min-w-[220px]">
                  <SilkRoadLogo size="md" variant="light" />
                </div>
              </div>

              {/* Logo Mode Selection Grid */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#003B40] block">
                  {language === 'fa' ? 'سبک نمایش نشان (Logo Mode):' : 'Emblem Display Mode:'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      mode: 'vector' as LogoMode,
                      title: 'Faceted Emblem (3D Vector)',
                      titleFa: 'نشان سه‌بعدی اوریگامی ابریشم',
                      desc: '4-cluster faceted cross geometry in ochre and turquoise.',
                      descFa: 'نماد چندوجهی طلایی و فیروزه‌ای جاده ابریشم'
                    },
                    {
                      mode: 'custom_image' as LogoMode,
                      title: 'Custom Image URL',
                      titleFa: 'بارگذاری تصویر اختصاصی / لینک',
                      desc: 'Display any custom PNG/SVG/WebP logo URL.',
                      descFa: 'استفاده از آدرس تصویر اختصاصی یا نشان سازمانی'
                    },
                    {
                      mode: 'monogram' as LogoMode,
                      title: 'Architectural Monogram',
                      titleFa: 'مونوگرام معماری SRADI',
                      desc: 'Modernist gold and deep teal typography seal.',
                      descFa: 'مهر تایپوگرافی مدرنیستی زرین و سرمه‌ای'
                    },
                    {
                      mode: 'text_badge' as LogoMode,
                      title: 'Compass Emblem',
                      titleFa: 'نشان قطب‌نمای ابریشم',
                      desc: 'Minimalist golden directional brass emblem.',
                      descFa: 'نشان برنجی ناوبری و جهت‌یابی ابریشم'
                    }
                  ].map((item) => (
                    <div
                      key={item.mode}
                      onClick={() => updateSettings({ logoMode: item.mode })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        settings.logoMode === item.mode
                          ? 'border-[#004F54] bg-[#004F54]/5 ring-2 ring-[#004F54]/20 shadow-xs'
                          : 'border-[#ECE9E2] bg-[#FAF8F3] hover:border-[#C8A56A]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-[#003B40]">
                          {language === 'fa' ? item.titleFa : item.title}
                        </span>
                        {settings.logoMode === item.mode && (
                          <Check className="w-3.5 h-3.5 text-[#004F54]" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#616866] leading-relaxed">
                        {language === 'fa' ? item.descFa : item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Image URL Input if custom_image is active */}
              {settings.logoMode === 'custom_image' && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs">
                  <label className="font-bold text-[#003B40] block">
                    {language === 'fa' ? 'آدرس تصویر لوگوی سفارشی (URL):' : 'Custom Logo Image URL (PNG, SVG, WebP):'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={settings.customLogoUrl}
                      onChange={(e) => updateSettings({ customLogoUrl: e.target.value })}
                      placeholder="https://example.org/logo.png"
                      className="w-full p-2.5 rounded-lg border border-amber-300 bg-white text-[#111817] focus:outline-hidden"
                    />
                    {settings.customLogoUrl && (
                      <button
                        onClick={() => updateSettings({ customLogoUrl: '' })}
                        className="px-3 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
                      >
                        {language === 'fa' ? 'پاک‌کردن' : 'Clear'}
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-amber-800">
                    {language === 'fa' 
                      ? 'می‌توانید آدرس هر تصویر لوگو با پس‌زمینه شفاف را وارد کنید تا بلافاصله در هدر و فوتر اعمال شود.' 
                      : 'Provide a direct transparent image link; updates instantly in header, footer, and navigation.'}
                  </p>
                </div>
              )}

              {/* Site Bilingual Names & Subtitles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عنوان انگلیسی موسسه در هدر:' : 'Site Title (EN):'}</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => updateSettings({ siteName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332] font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عنوان فارسی موسسه در هدر:' : 'Site Title (FA):'}</label>
                  <input
                    type="text"
                    value={settings.siteNameFa}
                    onChange={(e) => updateSettings({ siteNameFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332] font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'زیرعنوان انگلیسی (Subtitle EN):' : 'Site Subtitle (EN):'}</label>
                  <input
                    type="text"
                    value={settings.siteSubtitle}
                    onChange={(e) => updateSettings({ siteSubtitle: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'زیرعنوان فارسی (Subtitle FA):' : 'Site Subtitle (FA):'}</label>
                  <input
                    type="text"
                    value={settings.siteSubtitleFa}
                    onChange={(e) => updateSettings({ siteSubtitleFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Top Announcement Bar Manager */}
            <div className="bg-white rounded-2xl border border-[#ECE9E2] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#ECE9E2]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#003B40]">
                    {language === 'fa' ? 'نوار اعلان و فراخوان سراسری بالای سایت' : 'Top Global Announcement Bar'}
                  </h3>
                  <p className="text-xs text-[#616866] mt-0.5">
                    {language === 'fa' ? 'نمایش یا پنهان‌سازی بنر سراسری فراخوان‌ها و بورسیه‌ها در بالای هدر.' : 'Display prominent announcement banner for open fellowship calls.'}
                  </p>
                </div>

                <button
                  onClick={() => updateSettings({ showAnnouncementBar: !settings.showAnnouncementBar })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    settings.showAnnouncementBar 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {settings.showAnnouncementBar 
                    ? (language === 'fa' ? 'فعال و نمایان' : 'Active (Visible)')
                    : (language === 'fa' ? 'غیرفعال (مخفی)' : 'Disabled (Hidden)')}
                </button>
              </div>

              {settings.showAnnouncementBar && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'متن اعلان (انگلیسی):' : 'Announcement Text (EN):'}</label>
                    <input
                      type="text"
                      value={settings.announcementText}
                      onChange={(e) => updateSettings({ announcementText: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'متن اعلان (فارسی):' : 'Announcement Text (FA):'}</label>
                    <input
                      type="text"
                      value={settings.announcementTextFa}
                      onChange={(e) => updateSettings({ announcementTextFa: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 3. Hero Headlines & Slogans */}
            <div className="bg-white rounded-2xl border border-[#ECE9E2] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="pb-4 border-b border-[#ECE9E2]">
                <h3 className="font-serif font-bold text-lg text-[#003B40]">
                  {language === 'fa' ? 'متن‌های سربرگ صفحه نخست (Hero Slogans & Headlines)' : 'Homepage Hero Slogans & Headlines'}
                </h3>
                <p className="text-xs text-[#616866] mt-0.5">
                  {language === 'fa' ? 'تغییر شعارها، عناوین اصلی و پاراگراف معرفی صفحه اصلی پلتفرم.' : 'Edit main heroic headlines, subtitles, and mission descriptions.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عبارت خط اول انگلیسی:' : 'Headline Part 1 (EN):'}</label>
                  <input
                    type="text"
                    value={settings.heroHeadline1}
                    onChange={(e) => updateSettings({ heroHeadline1: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عبارت خط اول فارسی:' : 'Headline Part 1 (FA):'}</label>
                  <input
                    type="text"
                    value={settings.heroHeadline1Fa}
                    onChange={(e) => updateSettings({ heroHeadline1Fa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عبارت خط دوم انگلیسی:' : 'Headline Part 2 (EN):'}</label>
                  <input
                    type="text"
                    value={settings.heroHeadline2}
                    onChange={(e) => updateSettings({ heroHeadline2: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عبارت خط دوم فارسی:' : 'Headline Part 2 (FA):'}</label>
                  <input
                    type="text"
                    value={settings.heroHeadline2Fa}
                    onChange={(e) => updateSettings({ heroHeadline2Fa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عبارت هایلایت شده انگلیسی:' : 'Highlighted Slogan (EN):'}</label>
                  <input
                    type="text"
                    value={settings.heroHighlight}
                    onChange={(e) => updateSettings({ heroHighlight: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#008D8B] font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'عبارت هایلایت شده فارسی:' : 'Highlighted Slogan (FA):'}</label>
                  <input
                    type="text"
                    value={settings.heroHighlightFa}
                    onChange={(e) => updateSettings({ heroHighlightFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#008D8B] font-bold"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'پاراگراف معرفی هیرو (فارسی):' : 'Hero Description (FA):'}</label>
                  <textarea
                    rows={2}
                    value={settings.heroDescriptionFa}
                    onChange={(e) => updateSettings({ heroDescriptionFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Secretariat Contacts & DOI Metadata */}
            <div className="bg-white rounded-2xl border border-[#ECE9E2] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="pb-4 border-b border-[#ECE9E2]">
                <h3 className="font-serif font-bold text-lg text-[#003B40]">
                  {language === 'fa' ? 'اطلاعات دبیرخانه، آدرس و پیشوند رسمی DOI' : 'Secretariat Information & Academic DOI'}
                </h3>
                <p className="text-xs text-[#616866] mt-0.5">
                  {language === 'fa' ? 'تنظیم راه‌های ارتباطی دبیرخانه و متادیتاهای استنادی بین‌المللی.' : 'Configure official secretariat contacts and CrossRef DOI publication prefixes.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'ایمیل رسمی دبیرخانه:' : 'Secretariat Official Email:'}</label>
                  <input
                    type="email"
                    value={settings.secretariatEmail}
                    onChange={(e) => updateSettings({ secretariatEmail: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'شماره تماس دبیرخانه:' : 'Secretariat Phone:'}</label>
                  <input
                    type="text"
                    value={settings.secretariatPhone}
                    onChange={(e) => updateSettings({ secretariatPhone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'پیشوند استاندارد ثبت DOI:' : 'DOI Prefix:'}</label>
                  <input
                    type="text"
                    value={settings.doiPrefix}
                    onChange={(e) => updateSettings({ doiPrefix: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#003B40]">{language === 'fa' ? 'آدرس فیزیکی دبیرخانه (فارسی):' : 'Secretariat Address (FA):'}</label>
                  <input
                    type="text"
                    value={settings.secretariatAddressFa}
                    onChange={(e) => updateSettings({ secretariatAddressFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3] text-[#2D3332]"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions: Save and Reset */}
            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#ECE9E2] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#004F54] font-semibold">
                {isSaved ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full animate-fade-in">
                    <Check className="w-4 h-4" />
                    <span>{language === 'fa' ? 'تغییرات با موفقیت در سراسر وبسایت ذخیره و همگام شد.' : 'Settings saved and synced across all pages!'}</span>
                  </span>
                ) : (
                  <span>{language === 'fa' ? 'تمام تغییرات بلافاصله در حافظه محلی و دیتابیس ثبت می‌شوند.' : 'Changes are automatically persisted and broadcast.'}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (window.confirm(language === 'fa' ? 'آیا مایل به بازگردانی تمام تنظیمات به حالت اولیه پیش‌فرض هستید؟' : 'Reset all site settings to factory defaults?')) {
                      resetSettings();
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1 rtl:mr-0 rtl:ml-1" />
                  <span>{language === 'fa' ? 'بازنشانی به پیش‌فرض' : 'Reset to Defaults'}</span>
                </button>

                <button
                  onClick={() => {
                    setActionSuccess(language === 'fa' ? 'تنظیمات با موفقیت ذخیره گردید.' : 'Settings updated successfully.');
                    setTimeout(() => setActionSuccess(null), 3000);
                  }}
                  className="bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#C8A56A]" />
                  <span>{language === 'fa' ? 'تایید و ذخیره نهایی' : 'Save & Publish All'}</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Modal: Add New Project Quick Modal */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-[#ECE9E2] max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE9E2]">
              <h3 className="font-serif font-bold text-lg text-[#003B40]">
                {language === 'fa' ? 'ثبت پرونده ساختمانی جدید در اطلس' : 'Add New Architectural Project'}
              </h3>
              <button onClick={() => setIsAddProjectModalOpen(false)}>
                <X className="w-5 h-5 text-[#616866]" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#003B40] block mb-1">{language === 'fa' ? 'عنوان انگلیسی:' : 'Project Title (EN):'}</label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.title}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3]"
                    placeholder="e.g. Borujerdi House"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#003B40] block mb-1">{language === 'fa' ? 'عنوان فارسی:' : 'Project Title (FA):'}</label>
                  <input
                    type="text"
                    value={newProjectForm.titleFa}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, titleFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3]"
                    placeholder="مثال: خانه بروجردی‌ها"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-[#003B40] block mb-1">{language === 'fa' ? 'شهر:' : 'City:'}</label>
                  <input
                    type="text"
                    value={newProjectForm.cityName}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, cityName: e.target.value, cityNameFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3]"
                    placeholder="e.g. Kashan"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#003B40] block mb-1">{language === 'fa' ? 'معمار:' : 'Architect:'}</label>
                  <input
                    type="text"
                    value={newProjectForm.architect}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, architect: e.target.value, architectFa: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3]"
                    placeholder="Ustad Ali Maryam"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#003B40] block mb-1">{language === 'fa' ? 'سال ساخت:' : 'Year Completed:'}</label>
                  <input
                    type="number"
                    value={newProjectForm.yearCompleted}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, yearCompleted: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#003B40] block mb-1">{language === 'fa' ? 'آدرس تصویر کاور:' : 'Hero Image URL:'}</label>
                <input
                  type="url"
                  value={newProjectForm.heroImage}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, heroImage: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#003B40] block mb-1">{language === 'fa' ? 'توضیحات و مشخصات معماری:' : 'Description:'}</label>
                <textarea
                  rows={3}
                  value={newProjectForm.description}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value, descriptionFa: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#ECE9E2] bg-[#FAF8F3]"
                  placeholder="Spatial layout, thermal strategies, history..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#ECE9E2]">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#ECE9E2] hover:bg-[#F7F5F0]"
                >
                  {language === 'fa' ? 'انصراف' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-[#004F54] hover:bg-[#003B40] text-white font-semibold px-5 py-2 rounded-lg"
                >
                  {language === 'fa' ? 'ثبت و انتشار در اطلس' : 'Publish to Atlas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  Compass, 
  Sliders, 
  BookOpen, 
  Archive, 
  BarChart3, 
  Users, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  Bookmark, 
  PlusCircle, 
  Sparkles,
  ExternalLink,
  Megaphone,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { SilkRoadLogo } from './SilkRoadLogo';
import { UserRole } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenSubmitProject: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup' | 'role_switch') => void;
  onOpenProfileEditor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenSubmitProject,
  onOpenAuth,
  onOpenProfileEditor
}) => {
  const { language, toggleLanguage, t, direction } = useLanguage();
  const { currentUser, userRole, logout } = useAuth();
  const { settings } = useSiteSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [dismissAnnouncement, setDismissAnnouncement] = useState(false);

  const navItems = [
    { id: 'about', label: 'About', labelFa: 'درباره ما', tab: 'design-system' },
    { id: 'research', label: 'Research', labelFa: 'پژوهش', tab: 'research' },
    { id: 'atlas', label: 'Atlas', labelFa: 'اطلس', tab: 'atlas' },
    { id: 'compare', label: 'Compare', labelFa: 'تطبیق شهرها', tab: 'compare' },
    { id: 'observatory', label: 'Observatory', labelFa: 'دیده‌بان', tab: 'observatory' },
    { id: 'programs', label: 'Programs', labelFa: 'برنامه‌ها', tab: 'programs' },
    { id: 'network', label: 'Network', labelFa: 'شبکه', tab: 'network' },
    { id: 'events', label: 'Events', labelFa: 'رویدادها', tab: 'events' },
    { id: 'publications', label: 'Publications', labelFa: 'انتشارات', tab: 'publications' },
    { id: 'admin', label: 'Admin CMS', labelFa: 'پنل مدیریت', tab: 'admin' },
  ];

  const rolesList: { role: UserRole; label: string; labelFa: string }[] = [
    { role: 'visitor', label: 'Visitor', labelFa: 'بازدیدکننده' },
    { role: 'member', label: 'Member', labelFa: 'عضو پیوسته' },
    { role: 'contributor', label: 'Contributor', labelFa: 'مشارکت‌کننده' },
    { role: 'researcher', label: 'Researcher', labelFa: 'پژوهشگر' },
    { role: 'country_editor', label: 'Country Editor', labelFa: 'سردبیر کشوری' },
    { role: 'administrator', label: 'Administrator', labelFa: 'مدیر ارشد' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#ECE9E2] transition-colors">
      
      {/* Top Announcement Bar if enabled by Admin Settings */}
      {settings.showAnnouncementBar && !dismissAnnouncement && (
        <div className="bg-[#003B40] text-[#ECE9E2] px-4 py-2 text-xs border-b border-[#004F54] flex items-center justify-between transition-all">
          <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A56A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A56A]"></span>
              </span>
              <p className="truncate text-[11px] sm:text-xs">
                {language === 'fa' ? settings.announcementTextFa : settings.announcementText}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setActiveTab(settings.announcementLinkTab || 'programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#C8A56A] hover:text-white font-bold flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
              >
                <span>{language === 'fa' ? 'مشاهده جزییات' : 'View Details'}</span>
                {direction === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setDismissAnnouncement(true)}
                className="text-[#ECE9E2]/60 hover:text-white transition-colors cursor-pointer p-0.5"
                title={language === 'fa' ? 'بستن' : 'Dismiss'}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button
          id="header-logo-btn"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="focus:outline-none flex items-center group cursor-pointer"
        >
          <SilkRoadLogo size="md" variant="light" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  setActiveTab(item.tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 text-xs xl:text-sm font-medium transition-all rounded-full ${
                  isActive 
                    ? 'text-[#004F54] font-semibold bg-[#ECE9E2]' 
                    : 'text-[#2D3332] hover:text-[#004F54] hover:bg-[#ECE9E2]/60'
                }`}
              >
                {language === 'fa' ? item.labelFa : item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Elements */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger Button */}
          <button
            id="header-search-icon-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2D3332] hover:text-[#004F54] hover:bg-[#ECE9E2] rounded-full transition-colors cursor-pointer"
            title="Search & AI Assistant (⌘K)"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
            <span className="hidden sm:inline">{language === 'fa' ? 'جستجو' : 'Search'}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="header-lang-btn"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 text-xs font-semibold text-[#2D3332] hover:text-[#004F54] px-2.5 py-1.5 rounded-full hover:bg-[#ECE9E2] transition-colors"
            >
              <span className="uppercase">{language === 'en' ? 'EN' : 'FA'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isLangDropdownOpen && (
              <div 
                className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-32 bg-[#FBF9F4] border border-[#ECE9E2] rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setIsLangDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    if (language !== 'en') toggleLanguage();
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full text-left rtl:text-right px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-[#ECE9E2] transition-colors ${
                    language === 'en' ? 'font-bold text-[#004F54]' : 'text-[#2D3332]'
                  }`}
                >
                  <span>English (EN)</span>
                  {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#004F54]"></span>}
                </button>
                <button
                  onClick={() => {
                    if (language !== 'fa') toggleLanguage();
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full text-left rtl:text-right px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-[#ECE9E2] transition-colors ${
                    language === 'fa' ? 'font-bold text-[#004F54]' : 'text-[#2D3332]'
                  }`}
                >
                  <span>فارسی (FA)</span>
                  {language === 'fa' && <span className="w-1.5 h-1.5 rounded-full bg-[#004F54]"></span>}
                </button>
              </div>
            )}
          </div>

          {/* User Account / Profile Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                id="header-user-avatar-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#004F54]/30 transition-all"
                title="Scholar Profile & Dossiers"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#C8A56A]"
                />
                <span className="hidden xl:inline text-xs font-semibold text-[#003B40] max-w-[100px] truncate">
                  {language === 'fa' ? currentUser.nameFa : currentUser.name}
                </span>
                <ChevronDown className="w-3 h-3 text-[#616866] hidden xl:inline" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-64 bg-white border border-[#ECE9E2] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-[#ECE9E2]">
                    <div className="font-serif font-bold text-sm text-[#003B40]">
                      {language === 'fa' ? currentUser.nameFa : currentUser.name}
                    </div>
                    <div className="text-[11px] text-[#616866] truncate">{currentUser.email}</div>
                    <div className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-[#004F54] text-[#C8A56A] text-[9px] font-bold uppercase tracking-wider font-mono">
                      {userRole}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('user');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2 text-xs text-[#2D3332] hover:bg-[#F7F5F0] hover:text-[#004F54] flex items-center gap-2.5 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-[#B38048]" />
                      <span>{language === 'fa' ? 'نشان‌شده‌ها و سوابق من' : 'My Saved Dossiers'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenProfileEditor();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2 text-xs text-[#2D3332] hover:bg-[#F7F5F0] hover:text-[#004F54] flex items-center gap-2.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#008D8B]" />
                      <span>{language === 'fa' ? 'ویرایش مشخصات و بیوگرافی' : 'Edit Scholar Profile'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenSubmitProject();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2 text-xs text-[#2D3332] hover:bg-[#F7F5F0] hover:text-[#004F54] flex items-center gap-2.5 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-[#004F54]" />
                      <span>{language === 'fa' ? 'ارسال پروژه جدید به اطلس' : 'Submit Project to Atlas'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2 text-xs text-[#2D3332] hover:bg-[#F7F5F0] hover:text-[#004F54] flex items-center gap-2.5 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#004F54]" />
                      <span>{language === 'fa' ? 'پنل مدیریت موسسه (CMS)' : 'Institute Admin CMS'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAuth('role_switch');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2 text-xs text-[#2D3332] hover:bg-[#F7F5F0] hover:text-[#004F54] flex items-center gap-2.5 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#8A918F]" />
                      <span>{language === 'fa' ? 'تغییر نقش کاربری' : 'Switch Role (RBAC)'}</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-[#ECE9E2]">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                    >
                      <span>{language === 'fa' ? 'خروج از حساب' : 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('signin')}
              className="bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>{language === 'fa' ? 'ورود اعضا' : 'Sign In'}</span>
            </button>
          )}

          {/* Circular Hamburger Menu Button */}
          <button
            id="header-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-[#003B40] hover:bg-[#004F54] text-white flex items-center justify-center transition-all shadow-sm hover:shadow"
            title="Menu & Institute Navigation"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Menu Drawer (Mobile + Desktop Extended Directory) */}
      {isMobileMenuOpen && (
        <div className="bg-[#FBF9F4] border-b border-[#ECE9E2] shadow-2xl py-6 px-4 sm:px-8 lg:px-12 animate-in slide-in-from-top-2">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Core Portals */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B38048] pb-1 border-b border-[#ECE9E2]">
                {language === 'fa' ? 'بخش‌های اصلی اطلس' : 'Atlas Portals'}
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('atlas'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#008D8B]" />
                  <span>{t('navAtlas')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('compare'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Sliders className="w-4 h-4 text-[#B38048]" />
                  <span>{t('compareCities')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('archive'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Archive className="w-4 h-4 text-[#008D8B]" />
                  <span>{t('navArchive')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('observatory'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <BarChart3 className="w-4 h-4 text-[#004F54]" />
                  <span>{t('navObservatory')}</span>
                </button>
              </div>
            </div>

            {/* Column 2: Research & Programs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B38048] pb-1 border-b border-[#ECE9E2]">
                {language === 'fa' ? 'پژوهش و آکادمی' : 'Research & Academy'}
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('research'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#004F54]" />
                  <span>{t('navResearch')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('publications'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-[#B38048]" />
                  <span>{t('navPublications')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('programs'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#008D8B]" />
                  <span>{t('navPrograms')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('events'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Layers className="w-4 h-4 text-[#B38048]" />
                  <span>{t('navEvents')}</span>
                </button>
              </div>
            </div>

            {/* Column 3: Institutional & Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B38048] pb-1 border-b border-[#ECE9E2]">
                {language === 'fa' ? 'ابزارها و مدیریت' : 'Institutional Tools'}
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('network'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Users className="w-4 h-4 text-[#008D8B]" />
                  <span>{t('navNetwork')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#004F54] hover:bg-[#ECE9E2] font-semibold flex items-center gap-2.5 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#004F54]" />
                  <span>{t('navAdmin')}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('design-system'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-sm text-[#2D3332] hover:bg-[#ECE9E2] hover:text-[#004F54] flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#B38048]" />
                  <span>{t('navDesignSystem')}</span>
                </button>
              </div>
            </div>

            {/* Column 4: Quick Actions & RBAC */}
            <div className="bg-[#ECE9E2]/50 p-4 rounded-xl border border-[#ECE9E2] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#003B40]">
                  {language === 'fa' ? 'نقش فعال:' : 'Active Role:'}
                </span>
                <span className="text-[11px] font-mono font-bold bg-[#004F54] text-[#C8A56A] px-2 py-0.5 rounded">
                  {userRole}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onOpenSubmitProject();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-[#C8A56A]" />
                  <span>{t('navSubmitProject')}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('user');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-white hover:bg-[#ECE9E2] text-[#004F54] border border-[#ECE9E2] text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#B38048]" />
                  <span>{language === 'fa' ? 'نشان‌شده‌های من' : 'My Dossiers & Bookmarks'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

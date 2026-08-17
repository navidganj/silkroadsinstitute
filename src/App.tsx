import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NetworkHero } from './components/NetworkHero';
import { HomeEditorialSections } from './components/HomeEditorialSections';
import { AtlasExplorer } from './components/AtlasExplorer';
import { CityComparison } from './components/CityComparison';
import { ResearchPortal } from './components/ResearchPortal';
import { ArchivePortal } from './components/ArchivePortal';
import { ObservatoryDashboard } from './components/ObservatoryDashboard';
import { NetworkPortal } from './components/NetworkPortal';
import { ProgramsPortal } from './components/ProgramsPortal';
import { EventsPortal } from './components/EventsPortal';
import { PublicationsPortal } from './components/PublicationsPortal';
import { AdminCMSPortal } from './components/AdminCMSPortal';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';

import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CityDetailModal } from './components/CityDetailModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { SubmitProjectModal } from './components/SubmitProjectModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileEditorModal } from './components/UserProfileEditorModal';
import { LegalPoliciesModal, PolicyTab } from './components/LegalPoliciesModal';

import { initialProjects, initialCities } from './data/seedData';
import { Project, City } from './types';

const MainAppContent: React.FC = () => {
  const { direction } = useLanguage();

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [preselectedCountryId, setPreselectedCountryId] = useState<string | null>(null);

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitProjectOpen, setIsSubmitProjectOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'role_switch'>('signin');
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<PolicyTab | null>(null);

  // Keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCityById = (cityId: string) => {
    const found = initialCities.find(c => c.id === cityId);
    if (found) setSelectedCity(found);
  };

  const handleCompareCity = (cityId: string) => {
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#FBF9F4] text-[#111817] flex flex-col font-sans ${direction === 'rtl' ? 'rtl' : 'ltr'}`} dir={direction}>
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'user') {
            setIsUserDashboardOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmitProject={() => setIsSubmitProjectOpen(true)}
        onOpenAuth={(mode = 'signin') => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onOpenProfileEditor={() => setIsProfileEditorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12 sm:space-y-16 pb-16">
            
            {/* Grand Hero Section with Silk Road Constellation & Quick Access Hub */}
            <NetworkHero
              onExploreAtlas={() => {
                setActiveTab('atlas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreNetwork={() => {
                setActiveTab('network');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCity={(city) => setSelectedCity(city)}
              onCompareCity={handleCompareCity}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Editorial Home Sections (Isfahan vs. Samarkand, Curated Projects, Featured Research, Upcoming Events, Opportunities & Network) */}
            <HomeEditorialSections
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProject={(project) => setSelectedProject(project)}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

          </div>
        )}

        {/* Atlas Explorer View */}
        {activeTab === 'atlas' && (
          <AtlasExplorer
            onSelectProject={(p) => setSelectedProject(p)}
            onSelectCity={handleSelectCityById}
            preselectedCountryId={preselectedCountryId}
          />
        )}

        {/* City Comparison View */}
        {activeTab === 'compare' && (
          <CityComparison
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {/* Research Portal View */}
        {activeTab === 'research' && (
          <ResearchPortal
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {/* Archive Portal View */}
        {activeTab === 'archive' && (
          <ArchivePortal
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}

        {/* Observatory Dashboard View */}
        {activeTab === 'observatory' && (
          <ObservatoryDashboard />
        )}

        {/* Network & Directory Portal View */}
        {activeTab === 'network' && (
          <NetworkPortal />
        )}

        {/* Academic Programs & Summer Schools View */}
        {activeTab === 'programs' && (
          <ProgramsPortal />
        )}

        {/* Events & Biennial Symposia View */}
        {activeTab === 'events' && (
          <EventsPortal />
        )}

        {/* Publications & Monographs View */}
        {activeTab === 'publications' && (
          <PublicationsPortal />
        )}

        {/* Institutional Admin & CMS View */}
        {activeTab === 'admin' && (
          <AdminCMSPortal />
        )}

        {/* Design System Showcase */}
        {activeTab === 'design-system' && (
          <DesignSystemShowcase />
        )}

      </main>

      {/* Global Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedCity && (
        <CityDetailModal
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
          onSelectProject={(p) => {
            setSelectedCity(null);
            setSelectedProject(p);
          }}
          onCompareWithCity={handleCompareCity}
        />
      )}

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={(p) => {
          setIsSearchOpen(false);
          setSelectedProject(p);
        }}
        onSelectCity={(cityId) => {
          setIsSearchOpen(false);
          handleSelectCityById(cityId);
        }}
      />

      <SubmitProjectModal
        isOpen={isSubmitProjectOpen}
        onClose={() => setIsSubmitProjectOpen(false)}
      />

      <UserDashboardModal
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        onSelectProject={(p) => {
          setIsUserDashboardOpen(false);
          setSelectedProject(p);
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <UserProfileEditorModal
        isOpen={isProfileEditorOpen}
        onClose={() => setIsProfileEditorOpen(false)}
      />

      {legalModalTab && (
        <LegalPoliciesModal
          initialTab={legalModalTab}
          onClose={() => setLegalModalTab(null)}
        />
      )}

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCountry={(countryId) => {
          setPreselectedCountryId(countryId);
          setActiveTab('atlas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPolicy={(tab) => setLegalModalTab(tab)}
      />

    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SiteSettingsProvider>
          <MainAppContent />
        </SiteSettingsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

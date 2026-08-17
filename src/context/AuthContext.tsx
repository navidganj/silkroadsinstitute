import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

const defaultUser: UserProfile = {
  id: 'usr-navid-admin',
  name: 'Navid Ganji',
  nameFa: 'نوید گنجی',
  email: 'navidganjii@gmail.com',
  role: 'administrator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  country: 'Iran',
  city: 'Tehran',
  organization: 'Silk Road Architecture Development Institute',
  profession: 'Architectural Director & Computational Researcher',
  bio: 'Directing the Silk Road Architecture knowledge platform with focus on cross-border typological synthesis, earthen tectonics, and architectural archive digitization.',
  bioFa: 'مدیریت پلتفرم دانش معماری جاده ابریشم با تمرکز بر سنتز گونه‌شناسی فرامرزی، تکتونیک خشت و دیجیتال‌سازی اسناد آرشیوی.',
  expertise: ['Digital Heritage', 'Architectural Curation', 'Desert Urbanism', 'Cross-Border Collaboration'],
  languages: ['Persian', 'English', 'Turkish'],
  researchInterests: ['Oasis Morphology', 'Safavid & Timurid Geometry', 'Seismic Resilience in Earth Structures'],
  website: 'https://center.silkroadsco.com',
  orcid: '0000-0002-8419-4912',
  isPublic: true,
  savedProjectIds: ['sheikh-lotfollah-mosque', 'heydar-aliyev-center', 'sancaklar-mosque'],
  savedResearchIds: ['res-microclimate-courtyard'],
  savedArchiveIds: ['arc-registan-1905-photo'],
  eventRegistrations: ['evt-silk-road-biennial-2026'],
  applications: [
    {
      programId: 'prog-bukhara-summer-school',
      programTitle: 'Silk Road Summer School 2026: Earthen Tectonics in Bukhara',
      status: 'submitted',
      submittedAt: '2026-08-10'
    }
  ],
  submissions: [
    {
      projectId: 'sub-meybod-yakhchal',
      title: 'Meybod Yakhchal (Ice House) Thermal Geometry Documentation',
      status: 'under_review',
      submittedAt: '2026-08-12'
    }
  ]
};

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  toggleSaveProject: (projectId: string) => void;
  isProjectSaved: (projectId: string) => boolean;
  toggleSaveResearch: (researchId: string) => void;
  isResearchSaved: (researchId: string) => boolean;
  toggleSaveArchive: (archiveId: string) => void;
  isArchiveSaved: (archiveId: string) => boolean;
  registerForEvent: (eventId: string) => boolean;
  submitProgramApplication: (programId: string, programTitle: string) => void;
  submitProjectProposal: (title: string) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('sradi_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sradi_user_profile', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const userRole: UserRole = currentUser?.role || 'visitor';

  const setUserRole = (role: UserRole) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
    } else {
      setCurrentUser({ ...defaultUser, role });
    }
  };

  const login = (email: string, role: UserRole = 'member') => {
    setCurrentUser({
      ...defaultUser,
      email,
      role
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('sradi_user_profile');
  };

  const toggleSaveProject = (projectId: string) => {
    if (!currentUser) return;
    const exists = currentUser.savedProjectIds.includes(projectId);
    const updated = exists
      ? currentUser.savedProjectIds.filter(id => id !== projectId)
      : [...currentUser.savedProjectIds, projectId];
    setCurrentUser({ ...currentUser, savedProjectIds: updated });
  };

  const isProjectSaved = (projectId: string): boolean => {
    return currentUser?.savedProjectIds.includes(projectId) || false;
  };

  const toggleSaveResearch = (researchId: string) => {
    if (!currentUser) return;
    const exists = currentUser.savedResearchIds.includes(researchId);
    const updated = exists
      ? currentUser.savedResearchIds.filter(id => id !== researchId)
      : [...currentUser.savedResearchIds, researchId];
    setCurrentUser({ ...currentUser, savedResearchIds: updated });
  };

  const isResearchSaved = (researchId: string): boolean => {
    return currentUser?.savedResearchIds.includes(researchId) || false;
  };

  const toggleSaveArchive = (archiveId: string) => {
    if (!currentUser) return;
    const exists = currentUser.savedArchiveIds.includes(archiveId);
    const updated = exists
      ? currentUser.savedArchiveIds.filter(id => id !== archiveId)
      : [...currentUser.savedArchiveIds, archiveId];
    setCurrentUser({ ...currentUser, savedArchiveIds: updated });
  };

  const isArchiveSaved = (archiveId: string): boolean => {
    return currentUser?.savedArchiveIds.includes(archiveId) || false;
  };

  const registerForEvent = (eventId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.eventRegistrations.includes(eventId)) return true;
    setCurrentUser({
      ...currentUser,
      eventRegistrations: [...currentUser.eventRegistrations, eventId]
    });
    return true;
  };

  const submitProgramApplication = (programId: string, programTitle: string) => {
    if (!currentUser) return;
    const newApp = {
      programId,
      programTitle,
      status: 'submitted' as const,
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser({
      ...currentUser,
      applications: [...currentUser.applications, newApp]
    });
  };

  const submitProjectProposal = (title: string) => {
    if (!currentUser) return;
    const newSubmission = {
      projectId: 'sub-' + Date.now(),
      title,
      status: 'submitted' as const,
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser({
      ...currentUser,
      submissions: [...currentUser.submissions, newSubmission]
    });
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...updated });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        userRole,
        setUserRole,
        login,
        logout,
        toggleSaveProject,
        isProjectSaved,
        toggleSaveResearch,
        isResearchSaved,
        toggleSaveArchive,
        isArchiveSaved,
        registerForEvent,
        submitProgramApplication,
        submitProjectProposal,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

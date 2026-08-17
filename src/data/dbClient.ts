import { 
  initialCountries, 
  initialCities, 
  initialProjects, 
  initialArchitects, 
  initialPractices, 
  initialUniversities, 
  initialResearchItems, 
  initialArchiveCollections, 
  initialArchiveItems, 
  initialObservatoryDatasets, 
  initialNetworkMembers, 
  initialCollaborationOpportunities, 
  initialPrograms, 
  initialEvents, 
  initialPublications 
} from './seedData';
import { Project, City, Country, ResearchItem, ArchiveItem, EventItem, Program, ObservatoryDataset, NetworkMember } from '../types';

export interface DatabaseState {
  version: string;
  lastUpdated: string;
  countries: Country[];
  cities: City[];
  projects: Project[];
  research: ResearchItem[];
  archiveItems: ArchiveItem[];
  observatory: ObservatoryDataset[];
  members: NetworkMember[];
  programs: Program[];
  events: EventItem[];
  bookmarks: string[];
  userApplications: any[];
}

const STORAGE_KEY = 'sradi_database_v1';

export class DatabaseService {
  private state: DatabaseState;

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): DatabaseState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from local storage, using seed data', e);
    }

    return {
      version: '1.4.0',
      lastUpdated: new Date().toISOString(),
      countries: initialCountries,
      cities: initialCities,
      projects: initialProjects,
      research: initialResearchItems,
      archiveItems: initialArchiveItems,
      observatory: initialObservatoryDatasets,
      members: initialNetworkMembers,
      programs: initialPrograms,
      events: initialEvents,
      bookmarks: ['proj-1', 'proj-3', 'res-1'],
      userApplications: []
    };
  }

  private persist() {
    try {
      this.state.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // --- Projects ---
  public getProjects(): Project[] {
    return this.state.projects;
  }

  public addProject(project: Partial<Project>): Project {
    const newRecord: Project = {
      id: `proj-${Date.now()}`,
      title: project.title || 'Untitled Project',
      titleFa: project.titleFa || project.title || 'پروژه جدید',
      countryId: project.countryId || 'ir',
      countryName: project.countryName || 'Iran',
      countryNameFa: project.countryNameFa || 'ایران',
      cityId: project.cityId || 'isfahan',
      cityName: project.cityName || 'Isfahan',
      cityNameFa: project.cityNameFa || 'اصفهان',
      coordinates: project.coordinates || { lat: 32.6546, lng: 51.6680 },
      architect: project.architect || 'Traditional Master / Studio',
      architectFa: project.architectFa || 'استادکار سنتی / آتلیه',
      yearCompleted: project.yearCompleted || 2024,
      historicalPeriod: project.historicalPeriod || 'contemporary_21st',
      typology: project.typology || 'cultural_center',
      status: project.status || 'built_contemporary',
      heritageStatus: project.heritageStatus || 'national_heritage',
      materials: project.materials || ['Brick', 'Stone'],
      materialsFa: project.materialsFa || ['آجر', 'سنگ'],
      structuralSystem: project.structuralSystem || 'Brick Vaulting & Post-Tensioned Frame',
      structuralSystemFa: project.structuralSystemFa || 'طاق‌زنی آجری و سازه مرکب',
      climateStrategies: project.climateStrategies || ['Thermal Mass', 'Natural Ventilation'],
      climateStrategiesFa: project.climateStrategiesFa || ['جرم حرارتی', 'تهویه طبیعی'],
      description: project.description || '',
      descriptionFa: project.descriptionFa || '',
      spatialConcept: project.spatialConcept || 'Courtyard and Spatial Continuity',
      spatialConceptFa: project.spatialConceptFa || 'حیاط مرکزی و تداوم فضایی',
      urbanContext: project.urbanContext || 'Historic Core Transit Spine',
      urbanContextFa: project.urbanContextFa || 'ستون فقرات ترانزیتی بافت تاریخی',
      heroImage: project.heroImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      galleryImages: project.galleryImages || [],
      drawings: project.drawings || [],
      citations: project.citations || ['SRADI Survey Vol 1'],
      photographer: project.photographer || 'Silk Road Heritage Documentation Team',
      copyright: project.copyright || 'CC BY-NC 4.0 SRADI Archive',
      isFeaturedHomepage: true,
      submissionStatus: 'approved'
    };

    this.state.projects.unshift(newRecord);
    this.persist();
    return newRecord;
  }

  // --- Bookmarks ---
  public getBookmarks(): string[] {
    return this.state.bookmarks;
  }

  public toggleBookmark(id: string): boolean {
    const exists = this.state.bookmarks.includes(id);
    if (exists) {
      this.state.bookmarks = this.state.bookmarks.filter(b => b !== id);
    } else {
      this.state.bookmarks.push(id);
    }
    this.persist();
    return !exists;
  }

  // --- Events RSVP ---
  public rsvpEvent(eventId: string, userName: string, userEmail: string): boolean {
    const event = this.state.events.find(e => e.id === eventId);
    if (event) {
      event.registeredCount = (event.registeredCount || 0) + 1;
      this.state.userApplications.push({
        type: 'event_rsvp',
        id: `rsvp-${Date.now()}`,
        eventId,
        eventTitle: event.title,
        userName,
        userEmail,
        timestamp: new Date().toISOString()
      });
      this.persist();
      return true;
    }
    return false;
  }

  // --- Program Fellowship Application ---
  public submitApplication(programId: string, data: any): string {
    const appId = `app-${Date.now()}`;
    const record = {
      id: appId,
      type: 'program_application',
      programId,
      ...data,
      status: 'under_review',
      submittedAt: new Date().toISOString()
    };
    this.state.userApplications.unshift(record);
    this.persist();
    return appId;
  }

  // --- Database Export & Backup ---
  public exportJSON(): string {
    return JSON.stringify(this.state, null, 2);
  }

  public importJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.projects && parsed.cities) {
        this.state = parsed;
        this.persist();
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON structure for database restore:', e);
    }
    return false;
  }

  public resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadInitialState();
    this.persist();
  }
}

export const dbService = new DatabaseService();


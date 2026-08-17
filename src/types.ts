export type Language = 'en' | 'fa';
export type Direction = 'ltr' | 'rtl';

export type UserRole = 
  | 'visitor'
  | 'member'
  | 'contributor'
  | 'researcher'
  | 'country_editor'
  | 'editor'
  | 'administrator'
  | 'super_admin';

export interface UserProfile {
  id: string;
  name: string;
  nameFa: string;
  email: string;
  role: UserRole;
  avatar?: string;
  country: string;
  city: string;
  organization?: string;
  profession: string;
  bio: string;
  bioFa?: string;
  expertise: string[];
  languages: string[];
  researchInterests: string[];
  website?: string;
  orcid?: string;
  isPublic: boolean;
  savedProjectIds: string[];
  savedResearchIds: string[];
  savedArchiveIds: string[];
  eventRegistrations: string[];
  applications: {
    programId: string;
    programTitle: string;
    status: 'draft' | 'submitted' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
    submittedAt: string;
  }[];
  submissions: {
    projectId: string;
    title: string;
    status: 'draft' | 'submitted' | 'under_review' | 'changes_requested' | 'approved' | 'published';
    submittedAt: string;
  }[];
}

export interface Country {
  id: string;
  code: string;
  name: string;
  nameFa: string;
  region: string;
  regionFa: string;
  capital: string;
  capitalFa: string;
  overview: string;
  overviewFa: string;
  heroImage: string;
  majorCities: string[];
  climateZones: string[];
  architecturalTraditions: string[];
  architecturalTraditionsFa: string[];
  heritageSitesCount: number;
  documentedProjectsCount: number;
  activeResearchersCount: number;
  timeline: {
    period: string;
    periodFa: string;
    dates: string;
    description: string;
    descriptionFa: string;
    keyMonuments: string[];
  }[];
}

export interface City {
  id: string;
  name: string;
  nameFa: string;
  countryId: string;
  countryName: string;
  countryNameFa: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  networkPosition: {
    x: number; // percentage in svg canvas
    y: number;
  };
  population: string;
  elevation: string;
  climate: string;
  climateFa: string;
  overview: string;
  overviewFa: string;
  heroImage: string;
  morphology: string;
  morphologyFa: string;
  heritageStatus: string;
  heritageStatusFa: string;
  traditionalMaterials: string[];
  traditionalMaterialsFa: string[];
  keyPeriods: string[];
  indicators: {
    historicDensity: number; // 0-100
    modernExpansion: number;
    heritageProtection: number;
    climateResilience: number;
    culturalContinuity: number;
    publicSpaceRatio: number;
  };
  connectedCityIds: string[];
}

export type Typology = 
  | 'caravanserai'
  | 'mosque'
  | 'madrasa'
  | 'mausoleum'
  | 'bazaar'
  | 'courtyard_house'
  | 'palace'
  | 'bathhouse'
  | 'water_infrastructure'
  | 'citadel'
  | 'civic_center'
  | 'cultural_center'
  | 'museum'
  | 'modern_residential'
  | 'contemporary_mixed_use'
  | 'educational_facility';

export type HistoricalPeriod = 
  | 'ancient_pre_islamic'
  | 'early_islamic'
  | 'seljuk'
  | 'timurid'
  | 'safavid'
  | 'ottoman'
  | 'mughal'
  | 'qajar'
  | 'early_modern_20th'
  | 'soviet_modernism'
  | 'late_modern'
  | 'contemporary_21st';

export interface ArchitecturalDrawing {
  id: string;
  title: string;
  titleFa: string;
  type: 'plan' | 'section' | 'elevation' | 'axonometric' | 'detail' | 'site_plan';
  imageUrl: string;
  scale?: string;
  level?: string;
  copyright: string;
  source: string;
}

export interface Project {
  id: string;
  title: string;
  titleFa: string;
  nativeTitle?: string;
  countryId: string;
  countryName: string;
  countryNameFa: string;
  cityId: string;
  cityName: string;
  cityNameFa: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  architect: string;
  architectFa: string;
  architectId?: string;
  practice?: string;
  yearDesigned?: number;
  yearCompleted: number;
  historicalPeriod: HistoricalPeriod;
  typology: Typology;
  status: 'historic_preserved' | 'historic_ruin' | 'restored' | 'built_contemporary' | 'under_construction' | 'unbuilt';
  areaM2?: number;
  heritageStatus: 'unesco_world_heritage' | 'national_heritage' | 'local_significance' | 'unregistered';
  materials: string[];
  materialsFa: string[];
  structuralSystem: string;
  structuralSystemFa: string;
  climateStrategies: string[];
  climateStrategiesFa: string[];
  description: string;
  descriptionFa: string;
  spatialConcept: string;
  spatialConceptFa: string;
  urbanContext: string;
  urbanContextFa: string;
  heroImage: string;
  galleryImages: string[];
  drawings: ArchitecturalDrawing[];
  citations: string[];
  photographer: string;
  copyright: string;
  isFeaturedHomepage?: boolean;
  submissionStatus?: 'draft' | 'submitted' | 'under_review' | 'changes_requested' | 'approved' | 'published';
}

export interface Architect {
  id: string;
  name: string;
  nameFa: string;
  nativeName?: string;
  country: string;
  countryFa: string;
  city: string;
  cityFa: string;
  era: string;
  eraFa: string;
  birthYear?: number;
  deathYear?: number;
  portrait: string;
  bio: string;
  bioFa: string;
  expertise: string[];
  notableProjects: string[];
  awards?: string[];
  publications?: string[];
  teaching?: string;
}

export interface ArchitecturePractice {
  id: string;
  name: string;
  nameFa: string;
  country: string;
  countryFa: string;
  city: string;
  cityFa: string;
  yearEstablished: number;
  founders: string[];
  foundersFa: string[];
  logo?: string;
  heroImage: string;
  description: string;
  descriptionFa: string;
  specialization: string[];
  notableProjects: string[];
  website?: string;
}

export interface University {
  id: string;
  name: string;
  nameFa: string;
  department: string;
  departmentFa: string;
  country: string;
  countryFa: string;
  city: string;
  cityFa: string;
  heroImage: string;
  description: string;
  descriptionFa: string;
  researchFocus: string[];
  programsOffered: string[];
  exchangePartnershipAvailable: boolean;
  website?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  titleFa: string;
  type: 'peer_reviewed_paper' | 'comparative_study' | 'field_report' | 'policy_brief' | 'essay' | 'data_study';
  authors: {
    name: string;
    nameFa: string;
    affiliation: string;
    country: string;
  }[];
  journalVolume?: string;
  journalIssue?: string;
  publicationDate: string;
  doi?: string;
  abstract: string;
  abstractFa: string;
  fullText?: string;
  keywords: string[];
  keywordsFa: string[];
  geographicalFocus: string[];
  relatedProjectIds: string[];
  pdfSizeMb: number;
  downloadCount: number;
  citationCount: number;
  references: string[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  titleFa: string;
  collectionId: string;
  collectionName: string;
  collectionNameFa: string;
  mediaType: 'historical_photo' | 'architectural_drawing' | 'restoration_blueprint' | 'manuscript_plate' | 'field_survey_map' | 'audio_oral_history';
  date: string;
  creator: string;
  country: string;
  countryFa: string;
  city: string;
  cityFa: string;
  imageUrl: string;
  highResUrl?: string;
  description: string;
  descriptionFa: string;
  physicalLocation: string;
  rights: string;
  copyright: string;
  provenance: string;
  keywords: string[];
  relatedProjectIds?: string[];
}

export interface ArchiveCollection {
  id: string;
  title: string;
  titleFa: string;
  curator: string;
  curatorFa: string;
  itemCount: number;
  coverImage: string;
  description: string;
  descriptionFa: string;
  theme: string;
  era: string;
}

export interface ObservatoryDataset {
  id: string;
  category: 'housing' | 'urban_morphology' | 'heritage_preservation' | 'climate_adaptation' | 'vernacular_materials' | 'academic_mobility' | 'construction_costs';
  title: string;
  titleFa: string;
  unit: string;
  unitFa: string;
  year: number;
  source: string;
  methodology: string;
  methodologyFa: string;
  confidenceScore: 'A+' | 'A' | 'B+' | 'B';
  dataPoints: {
    country: string;
    countryFa: string;
    city: string;
    cityFa: string;
    value: number;
    benchmarkValue?: number;
    trend: 'up' | 'down' | 'stable';
    note?: string;
  }[];
}

export interface NetworkMember {
  id: string;
  name: string;
  nameFa: string;
  role: 'architect' | 'researcher' | 'professor' | 'student' | 'restorer' | 'urban_planner' | 'publisher' | 'photographer';
  roleFa: string;
  country: string;
  countryFa: string;
  city: string;
  cityFa: string;
  organization: string;
  avatar: string;
  bio: string;
  bioFa: string;
  expertise: string[];
  collaborationStatus: 'open_for_projects' | 'open_for_research' | 'open_for_guest_lectures' | 'seeking_partners';
  collaborationInterests: string[];
  portfolioLinks: { title: string; url: string }[];
  contactAvailable: boolean;
}

export interface CollaborationOpportunity {
  id: string;
  title: string;
  titleFa: string;
  type: 'research_partner' | 'joint_studio' | 'exhibition' | 'publication_call' | 'fieldwork_team' | 'grant_consortium';
  organization: string;
  country: string;
  countryFa: string;
  city: string;
  cityFa: string;
  deadline: string;
  description: string;
  descriptionFa: string;
  requirements: string[];
  contactEmail: string;
  postedAt: string;
}

export interface Program {
  id: string;
  title: string;
  titleFa: string;
  type: 'summer_school' | 'fellowship' | 'residency' | 'joint_studio' | 'masterclass' | 'field_expedition';
  typeFa: string;
  location: string;
  locationFa: string;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  heroImage: string;
  overview: string;
  overviewFa: string;
  faculty: string[];
  eligibility: string;
  eligibilityFa: string;
  scholarshipsAvailable: boolean;
  tuition: string;
  maxParticipants: number;
  status: 'open' | 'reviewing' | 'closed';
  curriculumHighlights: {
    week: string;
    topic: string;
    topicFa: string;
    description: string;
  }[];
}

export interface EventItem {
  id: string;
  title: string;
  titleFa: string;
  type: 'biennial_forum' | 'symposium' | 'public_lecture' | 'exhibition_opening' | 'panel_discussion' | 'workshop';
  typeFa: string;
  format: 'in_person' | 'hybrid' | 'virtual';
  location: string;
  locationFa: string;
  venueName?: string;
  startDate: string;
  endDate?: string;
  time: string;
  timezone: string;
  heroImage: string;
  description: string;
  descriptionFa: string;
  speakers: {
    name: string;
    nameFa: string;
    role: string;
    affiliation: string;
    avatar: string;
  }[];
  capacity: number;
  registeredCount: number;
  isFree: boolean;
  registrationOpen: boolean;
}

export interface Publication {
  id: string;
  title: string;
  titleFa: string;
  type: 'monograph' | 'atlas_volume' | 'field_dossier' | 'journal_issue' | 'exhibition_catalogue';
  authors: string[];
  editors?: string[];
  year: number;
  isbn?: string;
  pages: number;
  languages: string[];
  coverImage: string;
  description: string;
  descriptionFa: string;
  downloadUrl?: string;
  tableOfContents: string[];
}

export interface QualityWarning {
  id: string;
  entityType: 'project' | 'research' | 'archive' | 'city';
  entityId: string;
  entityTitle: string;
  issue: string;
  severity: 'warning' | 'critical' | 'info';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  details: string;
}

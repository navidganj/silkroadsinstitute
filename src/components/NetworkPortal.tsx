import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Briefcase, 
  Mail, 
  ExternalLink, 
  GraduationCap, 
  BookOpen, 
  Handshake, 
  CheckCircle2, 
  PlusCircle, 
  X,
  MessageSquare,
  Globe,
  Sparkles,
  Share2,
  Compass
} from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';
import { useAuth } from '../../src/context/AuthContext';
import { NetworkMapVisualizer } from './NetworkMapVisualizer';
import { 
  initialNetworkMembers, 
  initialCollaborationOpportunities, 
  initialUniversities, 
  initialPractices,
  initialCountries 
} from '../data/seedData';
import { NetworkMember, CollaborationOpportunity, University, ArchitecturePractice } from '../types';

export const NetworkPortal: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, userRole } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'map' | 'members' | 'opportunities' | 'universities' | 'practices'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [collaborationFilter, setCollaborationFilter] = useState<string>('all');

  // Modals state
  const [selectedMember, setSelectedMember] = useState<NetworkMember | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<CollaborationOpportunity | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return initialNetworkMembers.filter(m => {
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        m.name.toLowerCase().includes(q) ||
        m.nameFa.includes(q) ||
        m.organization.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.expertise.some(e => e.toLowerCase().includes(q));

      const matchRole = roleFilter === 'all' || m.role === roleFilter;
      const matchCountry = countryFilter === 'all' || m.country.toLowerCase() === countryFilter.toLowerCase();
      const matchCollab = collaborationFilter === 'all' || m.collaborationStatus === collaborationFilter;

      return matchSearch && matchRole && matchCountry && matchCollab;
    });
  }, [searchQuery, roleFilter, countryFilter, collaborationFilter]);

  // Filtered opportunities
  const filteredOpportunities = useMemo(() => {
    return initialCollaborationOpportunities.filter(o => {
      const q = searchQuery.toLowerCase();
      return (
        o.title.toLowerCase().includes(q) ||
        o.titleFa.includes(q) ||
        o.organization.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.country.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setIsContactModalOpen(false);
      setContactSubject('');
      setContactMessage('');
    }, 2000);
  };

  const getCollabStatusBadge = (status: NetworkMember['collaborationStatus']) => {
    switch (status) {
      case 'open_for_projects':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          text: language === 'fa' ? 'آماده همکاری در پروژه' : 'Open for Projects'
        };
      case 'open_for_research':
        return {
          bg: 'bg-teal-50 text-teal-800 border-teal-200',
          text: language === 'fa' ? 'آماده پژوهش مشترک' : 'Open for Joint Research'
        };
      case 'open_for_guest_lectures':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          text: language === 'fa' ? 'سخنرانی و استادی میهمان' : 'Available for Lectures'
        };
      case 'seeking_partners':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          text: language === 'fa' ? 'در جستجوی شریک علمی' : 'Seeking Partners'
        };
      default:
        return { bg: 'bg-stone-50 text-stone-700 border-stone-200', text: status };
    }
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title Section */}
        <div className="bg-[#003B40] rounded-2xl p-6 sm:p-10 text-[#ECE9E2] relative overflow-hidden border border-[#004F54] shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#008D8B]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54] text-[#C8A56A] text-xs font-semibold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'شبکه بین‌المللی پژوهشگران و معماران' : 'Trans-National Architectural Network'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
              {language === 'fa' ? 'شبکه نخبگان و هم‌افزایی علمی جاده ابریشم' : 'Silk Road Scholars & Practitioners Network'}
            </h1>
            <p className="text-sm sm:text-base text-[#ECE9E2]/80 leading-relaxed">
              {language === 'fa' 
                ? 'پلی پایدار میان معماران پیشگام، استادان تاریخ معماری، پژوهشگران مرمت و دانشکده‌های کشورهای جاده ابریشم جهت تبادل دانش، برگزاری استودیوهای مشترک و هدایت پژوهش‌های فرامرزی.'
                : 'Connecting leading contemporary architects, architectural historians, conservation scientists, and academic faculties across 14 Silk Road nations for collaborative studios, field expeditions, and joint research initiatives.'}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#004F54]/80 text-center sm:text-left">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C8A56A]">{initialNetworkMembers.length * 15}+</div>
              <div className="text-xs text-[#ECE9E2]/70">{language === 'fa' ? 'پژوهشگر و معمار عضو' : 'Verified Fellows'}</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{initialUniversities.length * 8}+</div>
              <div className="text-xs text-[#ECE9E2]/70">{language === 'fa' ? 'دانشکده همکار' : 'Partner Universities'}</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#008D8B]">{initialPractices.length * 12}+</div>
              <div className="text-xs text-[#ECE9E2]/70">{language === 'fa' ? 'دفتر معماری پیشرو' : 'Leading Practices'}</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">{initialCollaborationOpportunities.length * 6}+</div>
              <div className="text-xs text-[#ECE9E2]/70">{language === 'fa' ? 'فرصت فعال همکاری' : 'Active Calls & Studios'}</div>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#ECE9E2] pb-4">
          <button
            id="network-tab-map"
            onClick={() => setActiveSubTab('map')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'map' 
                ? 'bg-[#004F54] text-white shadow-sm font-semibold' 
                : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#C8A56A]" />
            <span>{language === 'fa' ? 'نقشه تعاملی و کریدورهای پژوهشی' : 'Interactive Network Map'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-100 font-mono">Live</span>
          </button>

          <button
            id="network-tab-members"
            onClick={() => setActiveSubTab('members')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'members' 
                ? 'bg-[#004F54] text-white shadow-sm font-semibold' 
                : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Users className="w-4 h-4 text-[#C8A56A]" />
            <span>{language === 'fa' ? 'فهرست پژوهشگران و اعضا' : 'Scholars & Practitioners'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">{filteredMembers.length}</span>
          </button>

          <button
            id="network-tab-opportunities"
            onClick={() => setActiveSubTab('opportunities')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'opportunities' 
                ? 'bg-[#004F54] text-white shadow-sm font-semibold' 
                : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Handshake className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'فراخوان‌ها و استودیوهای مشترک' : 'Joint Studios & Calls'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">{filteredOpportunities.length}</span>
          </button>

          <button
            id="network-tab-universities"
            onClick={() => setActiveSubTab('universities')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'universities' 
                ? 'bg-[#004F54] text-white shadow-sm font-semibold' 
                : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#C8A56A]" />
            <span>{language === 'fa' ? 'دانشگاه‌ها و مراکز آکادمیک' : 'Partner Faculties'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">{initialUniversities.length}</span>
          </button>

          <button
            id="network-tab-practices"
            onClick={() => setActiveSubTab('practices')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'practices' 
                ? 'bg-[#004F54] text-white shadow-sm font-semibold' 
                : 'bg-white text-[#111817] hover:bg-[#ECE9E2]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#008D8B]" />
            <span>{language === 'fa' ? 'دفاتر و استودیوهای معماری' : 'Practices & Studios'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">{initialPractices.length}</span>
          </button>
        </div>

        {/* Interactive Map Sub-Tab */}
        {activeSubTab === 'map' && (
          <div className="space-y-6">
            <NetworkMapVisualizer 
              onSelectNode={(node) => {
                // optionally find matching member/university
              }}
            />
          </div>
        )}

        {/* Members Directory Sub-Tab */}
        {activeSubTab === 'members' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-xl p-4 border border-[#ECE9E2] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-4 relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-[#616866]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'fa' ? 'جستجو بر اساس نام، تخصص، دانشگاه یا شهر...' : 'Search by name, expertise, institution...'}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-[#F7F5F0] border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                />
              </div>

              <div className="md:col-span-3">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  aria-label="Filter by specialization"
                  className="w-full py-2 px-3 text-sm bg-[#F7F5F0] border border-[#ECE9E2] rounded-lg text-[#111817] focus:outline-none focus:border-[#004F54]"
                >
                  <option value="all">{language === 'fa' ? 'تمام تخصص‌ها و نقش‌ها' : 'All Specializations'}</option>
                  <option value="architect">{language === 'fa' ? 'معمار و طراح' : 'Architect & Designer'}</option>
                  <option value="researcher">{language === 'fa' ? 'پژوهشگر ارشد' : 'Senior Researcher'}</option>
                  <option value="professor">{language === 'fa' ? 'استاد دانشگاه' : 'University Professor'}</option>
                  <option value="restorer">{language === 'fa' ? 'مرمت‌گر و کارشناس میراث' : 'Restoration Specialist'}</option>
                  <option value="urban_planner">{language === 'fa' ? 'طراح و برنامه‌ریز شهری' : 'Urban Planner'}</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  aria-label="Filter by country"
                  className="w-full py-2 px-3 text-sm bg-[#F7F5F0] border border-[#ECE9E2] rounded-lg text-[#111817] focus:outline-none focus:border-[#004F54]"
                >
                  <option value="all">{language === 'fa' ? 'تمام کشورها' : 'All Countries'}</option>
                  {initialCountries.map(c => (
                    <option key={c.id} value={c.name}>{language === 'fa' ? c.nameFa : c.name}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <select
                  value={collaborationFilter}
                  onChange={(e) => setCollaborationFilter(e.target.value)}
                  aria-label="Filter by collaboration status"
                  className="w-full py-2 px-3 text-sm bg-[#F7F5F0] border border-[#ECE9E2] rounded-lg text-[#111817] focus:outline-none focus:border-[#004F54]"
                >
                  <option value="all">{language === 'fa' ? 'وضعیت همکاری' : 'Collab Status'}</option>
                  <option value="open_for_projects">{language === 'fa' ? 'پروژه‌های اجرایی' : 'Projects'}</option>
                  <option value="open_for_research">{language === 'fa' ? 'پژوهش مشترک' : 'Research'}</option>
                  <option value="seeking_partners">{language === 'fa' ? 'شریک علمی' : 'Partnership'}</option>
                </select>
              </div>
            </div>

            {/* Members Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => {
                const badge = getCollabStatusBadge(member.collaborationStatus);
                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl border border-[#ECE9E2] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start gap-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#C8A56A]/40 shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="font-serif font-bold text-base text-[#003B40] truncate">
                            {language === 'fa' ? member.nameFa : member.name}
                          </h3>
                          <div className="text-xs text-[#008D8B] font-medium flex items-center gap-1 mt-0.5">
                            <Briefcase className="w-3 h-3" />
                            <span>{language === 'fa' ? member.roleFa : member.role}</span>
                          </div>
                          <div className="text-xs text-[#616866] flex items-center gap-1 mt-1 truncate">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{language === 'fa' ? `${member.cityFa}، ${member.countryFa}` : `${member.city}, ${member.country}`}</span>
                          </div>
                        </div>
                      </div>

                      {/* Organization & Bio */}
                      <div className="mt-4 pt-3 border-t border-[#ECE9E2] space-y-2">
                        <div className="text-xs font-semibold text-[#111817]">
                          {member.organization}
                        </div>
                        <p className="text-xs text-[#616866] line-clamp-3 leading-relaxed">
                          {language === 'fa' ? member.bioFa : member.bio}
                        </p>
                      </div>

                      {/* Expertise Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {member.expertise.slice(0, 3).map((exp, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 bg-[#ECE9E2]/60 text-[#003B40] rounded font-medium"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions & Collab Badge */}
                    <div className="mt-4 pt-4 border-t border-[#ECE9E2] flex items-center justify-between">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${badge.bg}`}>
                        {badge.text}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedMember(member);
                          setIsContactModalOpen(true);
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-[#004F54] hover:text-[#008D8B] bg-[#ECE9E2]/50 hover:bg-[#ECE9E2] px-3 py-1.5 rounded transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{language === 'fa' ? 'ارتباط مستقیم' : 'Connect'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Collaboration Opportunities Sub-Tab */}
        {activeSubTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-white rounded-xl border border-[#ECE9E2] p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#004F54] text-white">
                        {opp.type.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-amber-700 font-medium">
                        {language === 'fa' ? `مهلت: ${opp.deadline}` : `Deadline: ${opp.deadline}`}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#003B40] leading-snug">
                      {language === 'fa' ? opp.titleFa : opp.title}
                    </h3>

                    <div className="text-xs text-[#616866] flex items-center gap-4">
                      <span className="font-medium text-[#111817]">{opp.organization}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {language === 'fa' ? opp.cityFa : opp.city}
                      </span>
                    </div>

                    <p className="text-xs text-[#111817]/80 leading-relaxed">
                      {language === 'fa' ? opp.descriptionFa : opp.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-semibold text-[#004F54] uppercase tracking-wider">
                        {language === 'fa' ? 'شرایط و ملزومات:' : 'Requirements:'}
                      </div>
                      <ul className="text-xs text-[#616866] space-y-1 list-disc list-inside">
                        {opp.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#ECE9E2] flex items-center justify-between">
                    <span className="text-xs text-[#616866]">
                      {language === 'fa' ? `تاریخ انتشار: ${opp.postedAt}` : `Posted: ${opp.postedAt}`}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOpportunity(opp);
                        setIsContactModalOpen(true);
                      }}
                      className="bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Handshake className="w-4 h-4 text-[#C8A56A]" />
                      <span>{language === 'fa' ? 'ارسال درخواست مشارکت' : 'Submit Proposal'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partner Universities Sub-Tab */}
        {activeSubTab === 'universities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialUniversities.map((uni) => (
              <div
                key={uni.id}
                className="bg-white rounded-xl border border-[#ECE9E2] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 relative bg-[#003B40]">
                    <img
                      src={uni.heroImage}
                      alt={uni.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-serif font-bold text-base leading-tight">
                        {language === 'fa' ? uni.nameFa : uni.name}
                      </h3>
                      <div className="text-xs text-[#C8A56A]">{uni.department}</div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1 text-xs text-[#616866]">
                      <MapPin className="w-3.5 h-3.5 text-[#008D8B]" />
                      <span>{language === 'fa' ? `${uni.cityFa}، ${uni.countryFa}` : `${uni.city}, ${uni.country}`}</span>
                    </div>

                    <p className="text-xs text-[#111817]/80 line-clamp-3 leading-relaxed">
                      {language === 'fa' ? uni.descriptionFa : uni.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-semibold text-[#004F54] uppercase tracking-wider">
                        {language === 'fa' ? 'حوزه‌های کلیدی پژوهش:' : 'Research Focus:'}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {uni.researchFocus.map((f, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-[#ECE9E2] rounded text-[#003B40]">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#F7F5F0] border-t border-[#ECE9E2] flex items-center justify-between">
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {language === 'fa' ? 'پذیرش تبادل دانشجو' : 'Exchange Active'}
                  </span>
                  <a
                    href={uni.website || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#004F54] hover:text-[#008D8B] flex items-center gap-1"
                  >
                    <span>{language === 'fa' ? 'سایت رسمی' : 'Faculty Page'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Architecture Practices Sub-Tab */}
        {activeSubTab === 'practices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialPractices.map((practice) => (
              <div
                key={practice.id}
                className="bg-white rounded-xl border border-[#ECE9E2] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 relative bg-[#003B40]">
                    <img
                      src={practice.heroImage}
                      alt={practice.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-serif font-bold text-base">
                        {language === 'fa' ? practice.nameFa : practice.name}
                      </h3>
                      <div className="text-xs text-[#ECE9E2]/80">
                        {language === 'fa' ? `تاسیس: ${practice.yearEstablished}` : `Est. ${practice.yearEstablished}`}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1 text-xs text-[#616866]">
                      <MapPin className="w-3.5 h-3.5 text-[#008D8B]" />
                      <span>{language === 'fa' ? `${practice.cityFa}، ${practice.countryFa}` : `${practice.city}, ${practice.country}`}</span>
                    </div>

                    <p className="text-xs text-[#111817]/80 line-clamp-3 leading-relaxed">
                      {language === 'fa' ? practice.descriptionFa : practice.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      <div className="text-[11px] font-semibold text-[#004F54] uppercase tracking-wider">
                        {language === 'fa' ? 'تخصص‌های دفتر:' : 'Specialization:'}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {practice.specialization.map((s, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-[#ECE9E2] rounded text-[#003B40]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#F7F5F0] border-t border-[#ECE9E2] flex items-center justify-between">
                  <span className="text-xs text-[#616866]">
                    {practice.notableProjects.length} {language === 'fa' ? 'پروژه ثبت‌شده' : 'Documented Projects'}
                  </span>
                  <a
                    href={practice.website || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#004F54] hover:text-[#008D8B] flex items-center gap-1"
                  >
                    <span>{language === 'fa' ? 'پورتفولیو' : 'Portfolio'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Direct Contact & Collaboration Inquiry Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-[#ECE9E2] space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECE9E2] pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#004F54]" />
                <h3 className="font-serif font-bold text-lg text-[#003B40]">
                  {selectedMember 
                    ? (language === 'fa' ? `پیام به ${selectedMember.nameFa}` : `Inquiry to ${selectedMember.name}`)
                    : (language === 'fa' ? 'ارسال درخواست مشارکت در استودیو' : 'Submit Studio Proposal')}
                </h3>
              </div>
              <button onClick={() => setIsContactModalOpen(false)} className="p-1 hover:bg-[#ECE9E2] rounded">
                <X className="w-5 h-5 text-[#616866]" />
              </button>
            </div>

            {contactSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <div className="font-serif font-bold text-lg text-[#003B40]">
                  {language === 'fa' ? 'پیام شما با موفقیت ارسال گردید.' : 'Inquiry Dispatched Successfully!'}
                </div>
                <div className="text-xs text-[#616866]">
                  {language === 'fa' ? 'رونوشت به ایمیل موسسه و طرف مقابل ارسال شد.' : 'A certified notification has been sent via institutional gateway.'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-[#111817] mb-1">
                    {language === 'fa' ? 'موضوع استعلام / همکاری:' : 'Subject / Area of Collaboration:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder={language === 'fa' ? 'مثال: دعوت به سخنرانی در کارگاه طاق‌های خشتی' : 'e.g. Joint Research on Isfahan-Samarkand Faience Tectonics'}
                    className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111817] mb-1">
                    {language === 'fa' ? 'متن پیام یا معرفی طرح:' : 'Message / Project Description:'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={language === 'fa' ? 'توضیحات لازم پیرامون چارچوب همکاری و زمان‌بندی...' : 'Outline your institutional affiliation, scope of work, and expected timeline...'}
                    className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                  ></textarea>
                </div>

                <div className="p-3 bg-[#ECE9E2]/50 rounded-lg text-xs text-[#616866] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#008D8B] shrink-0 mt-0.5" />
                  <span>
                    {language === 'fa' 
                      ? 'تمامی مکاتبات علمی از طریق زیرساخت رمزگذاری‌شده و دبیرخانه موسسه جاده ابریشم تسهیل می‌گردد.'
                      : 'All academic communications are verified and facilitated through the Silk Road Architecture Institute secretariat.'}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#ECE9E2]">
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#616866] hover:bg-[#ECE9E2]"
                  >
                    {language === 'fa' ? 'انصراف' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#004F54] hover:bg-[#003B40] text-white transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C8A56A]" />
                    <span>{language === 'fa' ? 'ارسال درخواست رسمی' : 'Send Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

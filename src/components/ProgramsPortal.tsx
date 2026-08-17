import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  GraduationCap, 
  Clock, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  DollarSign,
  X,
  Upload
} from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';
import { useAuth } from '../../src/context/AuthContext';
import { initialPrograms } from '../data/seedData';
import { Program } from '../types';

export const ProgramsPortal: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, applyToProgram } = useAuth();

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantStatement, setApplicantStatement] = useState('');
  const [requestScholarship, setRequestScholarship] = useState(true);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    applyToProgram(selectedProgram.id, selectedProgram.title);
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setIsApplyModalOpen(false);
      setApplicantStatement('');
    }, 2200);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Section */}
        <div className="bg-[#003B40] rounded-2xl p-6 sm:p-10 text-[#ECE9E2] relative overflow-hidden border border-[#004F54] shadow-md">
          <div className="absolute -top-10 right-0 w-96 h-96 bg-[#008D8B]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54] text-[#C8A56A] text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'آکادمی و برنامه‌های توانمندسازی معماران' : 'Academic Fellowships & Field Residencies'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
              {language === 'fa' ? 'مدرسه‌های تابستانه، دوره‌های اقامت و پژوهش‌های میدانی' : 'Silk Road Summer Schools & Research Residencies'}
            </h1>
            <p className="text-sm sm:text-base text-[#ECE9E2]/80 leading-relaxed">
              {language === 'fa' 
                ? 'دوره‌های فشرده تخصصی در شهرهای تاریخی راه ابریشم با تمرکز بر احیای فنون طاق‌زنی، معماری خاک و خشت، شبیه‌سازی اقلیم سنتی و مواجهه با چالش‌های معاصر شهرنشینی.'
                : 'Intensive on-site summer schools, masterclasses, and fully-funded research residencies combining vernacular craftsmanship, structural vaulting, and computational climate modeling.'}
            </p>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {initialPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-[#ECE9E2] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Hero image with status badge */}
                <div className="relative h-64 bg-[#003B40]">
                  <img
                    src={prog.heroImage}
                    alt={prog.title}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#003B40]/90 text-[#C8A56A] text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-[#004F54]">
                      {language === 'fa' ? prog.typeFa : prog.type.replace('_', ' ')}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-semibold backdrop-blur-sm">
                      {language === 'fa' ? 'پذیرش فعال' : 'Applications Open'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-sm">
                      {language === 'fa' ? prog.titleFa : prog.title}
                    </h2>
                  </div>
                </div>

                {/* Key metadata banner */}
                <div className="grid grid-cols-3 gap-2 bg-[#ECE9E2]/50 p-4 border-b border-[#ECE9E2] text-xs text-[#111817]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#008D8B] shrink-0" />
                    <div>
                      <div className="text-[10px] text-[#616866]">{language === 'fa' ? 'مکان برگزاری' : 'Location'}</div>
                      <div className="font-semibold truncate">{language === 'fa' ? prog.locationFa : prog.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#C8A56A] shrink-0" />
                    <div>
                      <div className="text-[10px] text-[#616866]">{language === 'fa' ? 'بازه زمانی' : 'Duration'}</div>
                      <div className="font-semibold truncate">{prog.startDate}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#004F54] shrink-0" />
                    <div>
                      <div className="text-[10px] text-[#616866]">{language === 'fa' ? 'مهلت ثبت‌نام' : 'Deadline'}</div>
                      <div className="font-semibold text-amber-700 truncate">{prog.applicationDeadline}</div>
                    </div>
                  </div>
                </div>

                {/* Overview & Curriculum */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-[#111817]/85 leading-relaxed">
                    {language === 'fa' ? prog.overviewFa : prog.overview}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-[#003B40] uppercase tracking-wider">
                      {language === 'fa' ? 'اساتید و هیئت علمی دوره:' : 'Distinguished Faculty:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.faculty.map((fac, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 bg-[#ECE9E2] text-[#004F54] rounded-lg font-medium">
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum Highlights */}
                  <div className="space-y-2 pt-2 border-t border-[#ECE9E2]">
                    <div className="text-xs font-bold text-[#003B40] uppercase tracking-wider">
                      {language === 'fa' ? 'سرفصل‌های کارگاهی و میدانی:' : 'Curriculum Highlights:'}
                    </div>
                    <div className="space-y-2">
                      {prog.curriculumHighlights.map((curr, idx) => (
                        <div key={idx} className="bg-[#F7F5F0] p-3 rounded-lg border border-[#ECE9E2] text-xs">
                          <div className="font-bold text-[#004F54] flex items-center justify-between">
                            <span>{curr.week}: {language === 'fa' ? curr.topicFa : curr.topic}</span>
                          </div>
                          <p className="text-[#616866] mt-1">{curr.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-[#F7F5F0] border-t border-[#ECE9E2] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#616866]">{language === 'fa' ? 'شهریه و بورسیه:' : 'Tuition & Grants:'}</div>
                  <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#C8A56A]" />
                    <span>{prog.tuition}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProgram(prog);
                    setIsApplyModalOpen(true);
                  }}
                  className="bg-[#004F54] hover:bg-[#003B40] text-white px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all shadow-sm flex items-center gap-2"
                >
                  <span>{language === 'fa' ? 'ثبت درخواست بورسیه / پذیرش' : 'Apply Now'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A56A]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Program Application Modal */}
      {isApplyModalOpen && selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#ECE9E2] space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECE9E2] pb-4">
              <div>
                <div className="text-xs font-bold text-[#008D8B] uppercase tracking-wider">
                  {language === 'fa' ? 'فرم درخواست پذیرش و بورسیه' : 'Fellowship Application Form'}
                </div>
                <h3 className="font-serif font-bold text-xl text-[#003B40]">
                  {language === 'fa' ? selectedProgram.titleFa : selectedProgram.title}
                </h3>
              </div>
              <button onClick={() => setIsApplyModalOpen(false)} className="p-1.5 hover:bg-[#ECE9E2] rounded">
                <X className="w-5 h-5 text-[#616866]" />
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-serif font-bold text-xl text-[#003B40]">
                  {language === 'fa' ? 'درخواست شما با موفقیت ثبت شد!' : 'Application Submitted Successfully!'}
                </h4>
                <p className="text-xs text-[#616866] max-w-md mx-auto">
                  {language === 'fa' 
                    ? 'شماره پیگیری در پنل کاربری شما ثبت گردید. هیئت ارزیابی موسسه نتیجه بررسی را ظرف ۲ هفته اعلام خواهد نمود.'
                    : 'Your dossier has been routed to the academic committee. You can track your application status in your User Dashboard.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-[#111817] mb-1">
                    {language === 'fa' ? 'نام و نام خانوادگی متقاضی:' : 'Applicant Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={currentUser.name}
                    className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#111817] mb-1">
                      {language === 'fa' ? 'کشور / دانشگاه مبدا:' : 'Country / Institution:'}
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue={`${currentUser.city}, ${currentUser.country}`}
                      className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#111817] mb-1">
                      {language === 'fa' ? 'مقطع تحصیلی / سابقه:' : 'Academic Level:'}
                    </label>
                    <select aria-label="Academic Level" className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]">
                      <option>{language === 'fa' ? 'کارشناسی ارشد معماری' : 'M.Arch Student'}</option>
                      <option>{language === 'fa' ? 'دانشجوی دکتری' : 'Ph.D. Candidate'}</option>
                      <option>{language === 'fa' ? 'معمار و طراح حرفه‌ای' : 'Practicing Architect'}</option>
                      <option>{language === 'fa' ? 'استاد یا پژوهشگر دانشگاهی' : 'Faculty / Academic'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111817] mb-1">
                    {language === 'fa' ? 'بیانیه انگیزه و اهداف پژوهشی (Research Statement):' : 'Statement of Purpose (Max 300 words):'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={applicantStatement}
                    onChange={(e) => setApplicantStatement(e.target.value)}
                    placeholder={language === 'fa' ? 'چرا تمایل به حضور در این دوره دارید و چگونه این کارگاه به رساله یا پروژه‌های شما کمک می‌کند؟' : 'Describe your specific interest in Silk Road earthen tectonics and how this residency aligns with your research...'}
                    className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 p-3 bg-[#ECE9E2]/50 rounded-lg">
                  <input
                    type="checkbox"
                    id="scholarship-check"
                    checked={requestScholarship}
                    onChange={(e) => setRequestScholarship(e.target.checked)}
                    className="rounded text-[#004F54] focus:ring-0"
                  />
                  <label htmlFor="scholarship-check" className="text-xs text-[#111817] font-medium cursor-pointer">
                    {language === 'fa' ? 'تقاضای دریافت بورسیه کامل اقامت و شهریه (Silk Road Travel Grant)' : 'Apply for Full Tuition & Accommodation Travel Scholarship'}
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ECE9E2]">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#616866] hover:bg-[#ECE9E2]"
                  >
                    {language === 'fa' ? 'انصراف' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#004F54] hover:bg-[#003B40] text-white transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A56A]" />
                    <span>{language === 'fa' ? 'ارسال پرونده پذیرش' : 'Submit Application'}</span>
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

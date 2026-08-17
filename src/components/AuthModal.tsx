import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Globe, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  KeyRound,
  GraduationCap,
  Sparkles,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { SilkRoadLogo } from './SilkRoadLogo';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup' | 'role_switch';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin'
}) => {
  const { language, direction } = useLanguage();
  const { currentUser, login, setUserRole } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'role_switch'>(initialMode);
  const [email, setEmail] = useState(currentUser?.email || 'navidganjii@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Navid Ganji');
  const [organization, setOrganization] = useState('Silk Road Architecture Development Institute');
  const [country, setCountry] = useState('Iran');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser?.role || 'administrator');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'signin') {
        login(email, selectedRole);
        setSuccessMessage(language === 'fa' ? 'ورود با موفقیت انجام شد.' : 'Signed in successfully.');
      } else if (mode === 'signup') {
        login(email, selectedRole);
        setSuccessMessage(language === 'fa' ? 'ثبت‌نام با موفقیت انجام شد.' : 'Account created successfully.');
      } else {
        setUserRole(selectedRole);
        setSuccessMessage(language === 'fa' ? 'نقش کاربری تغییر یافت.' : 'Role updated successfully.');
      }

      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1000);
    }, 600);
  };

  const roleOptions: { role: UserRole; title: string; titleFa: string; desc: string; descFa: string }[] = [
    {
      role: 'administrator',
      title: 'Institute Administrator',
      titleFa: 'مدیر ارشد موسسه',
      desc: 'Full access to CMS, audit logs, dataset curation and submissions review.',
      descFa: 'دسترسی کامل به مدیریت داده‌ها، تایید پروژه‌ها و گزارش‌های رصدخانه.'
    },
    {
      role: 'country_editor',
      title: 'Country & Regional Editor',
      titleFa: 'سردبیر منطقه‌ای و کشوری',
      desc: 'Curate regional exhibitions, peer-review monographs, manage national archives.',
      descFa: 'داوری مقالات منطقه‌ای، سازماندهی آرشیو دیجیتال و تدوین نمایشگاه‌ها.'
    },
    {
      role: 'researcher',
      title: 'Academic Researcher',
      titleFa: 'پژوهشگر دانشگاهی',
      desc: 'Publish papers, access deep observatory telemetry, apply for grants.',
      descFa: 'ارسال مقاله به نشریه، دسترسی به داده‌های خام رصدخانه و بورسیه‌ها.'
    },
    {
      role: 'contributor',
      title: 'Practicing Contributor',
      titleFa: 'معمار و طراح مشارکت‌کننده',
      desc: 'Submit vernacular & contemporary projects, join practice directories.',
      descFa: 'ثبت پروژه‌ها در اطلس، معرفی دفتر معماری و همکاری‌های فرامرزی.'
    },
    {
      role: 'member',
      title: 'Institutional Member / Fellow',
      titleFa: 'عضو پیوسته / پژوهشگر جوان',
      desc: 'Apply for summer schools, workshops, access open educational archives.',
      descFa: 'ثبت‌نام در مدارس تابستانه، کارگاه‌های خشت و دسترسی به منابع آموزشی.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-[#FBF9F4] text-[#111817] w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-[#004F54]/20 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-[#003B40] via-[#004F54] to-[#02282C] text-white p-6 relative overflow-hidden">
          {/* Subtle Islamic Grid Watermark */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-15 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" stroke="#C8A56A" strokeWidth="1">
              <polygon points="50,5 64,36 98,36 70,57 81,90 50,70 19,90 30,57 2,36 36,36" />
            </svg>
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <SilkRoadLogo size="md" variant="dark" />
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 relative z-10">
            <h2 className="font-serif font-bold text-2xl tracking-tight text-white">
              {mode === 'signin' && (language === 'fa' ? 'ورود به سامانه اعضا' : 'Member Sign In')}
              {mode === 'signup' && (language === 'fa' ? 'عضویت در شبکه معماران ابریشم' : 'Join the Architectural Network')}
              {mode === 'role_switch' && (language === 'fa' ? 'تغییر نقش کاربری سامانه' : 'Switch Active Platform Role')}
            </h2>
            <p className="text-xs text-[#ECE9E2]/80 mt-1 font-light">
              {language === 'fa' 
                ? 'دسترسی امن به اطلس، پرونده‌های پژوهشی، رصدخانه و پنل مدیریت.'
                : 'Secure access to the Silk Road Atlas, research archives, and curation tools.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-[#004F54]/60">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                mode === 'signin' ? 'bg-[#C8A56A] text-[#002428] font-bold' : 'text-[#ECE9E2]/70 hover:text-white'
              }`}
            >
              {language === 'fa' ? 'ورود' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                mode === 'signup' ? 'bg-[#C8A56A] text-[#002428] font-bold' : 'text-[#ECE9E2]/70 hover:text-white'
              }`}
            >
              {language === 'fa' ? 'ثبت‌نام جدید' : 'Register'}
            </button>
            <button
              type="button"
              onClick={() => setMode('role_switch')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                mode === 'role_switch' ? 'bg-[#C8A56A] text-[#002428] font-bold' : 'text-[#ECE9E2]/70 hover:text-white'
              }`}
            >
              {language === 'fa' ? 'نقش کاربری' : 'Switch Role'}
            </button>
          </div>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {successMessage ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#003B40]">{successMessage}</h3>
              <p className="text-xs text-[#616866]">{language === 'fa' ? 'در حال هدایت به پنل...' : 'Redirecting...'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* If Sign Up: Extra Information */}
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                      {language === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full bg-white text-xs text-[#111817] pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
                        placeholder="Dr. Parisa Shokouhi"
                      />
                      <User className="w-4 h-4 text-[#8A918F] absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                        {language === 'fa' ? 'دانشگاه / موسسه' : 'Institution / Practice'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          className="w-full bg-white text-xs text-[#111817] pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
                          placeholder="University of Tehran"
                        />
                        <Building className="w-4 h-4 text-[#8A918F] absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                        {language === 'fa' ? 'کشور محل سکونت' : 'Country'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-white text-xs text-[#111817] pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
                          placeholder="Iran / Uzbekistan / Türkiye"
                        />
                        <Globe className="w-4 h-4 text-[#8A918F] absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Email & Password */}
              {mode !== 'role_switch' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                      {language === 'fa' ? 'پست الکترونیک (ایمیل)' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-white text-xs text-[#111817] pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
                        placeholder="researcher@silkroadsco.org"
                      />
                      <Mail className="w-4 h-4 text-[#8A918F] absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                      {language === 'fa' ? 'رمز عبور' : 'Password'}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-white text-xs text-[#111817] pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
                      />
                      <Lock className="w-4 h-4 text-[#8A918F] absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                    </div>
                  </div>
                </>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-2">
                  {language === 'fa' ? 'انتخاب نقش و سطح دسترسی' : 'Select Access Role'}
                </label>
                <div className="space-y-2">
                  {roleOptions.map((opt) => (
                    <div
                      key={opt.role}
                      onClick={() => setSelectedRole(opt.role)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        selectedRole === opt.role 
                          ? 'border-[#004F54] bg-[#004F54]/5 ring-1 ring-[#004F54]' 
                          : 'border-[#ECE9E2] bg-white hover:border-[#004F54]/40'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-serif font-bold text-xs sm:text-sm text-[#003B40] flex items-center gap-2">
                          <span>{language === 'fa' ? opt.titleFa : opt.title}</span>
                          {opt.role === 'administrator' && (
                            <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-mono font-bold">ROOT</span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#616866]">
                          {language === 'fa' ? opt.descFa : opt.desc}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        selectedRole === opt.role ? 'border-[#004F54] bg-[#004F54]' : 'border-[#8A918F]'
                      }`}>
                        {selectedRole === opt.role && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#004F54] hover:bg-[#003B40] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>
                      {mode === 'signin' && (language === 'fa' ? 'ورود به سامانه' : 'Sign In')}
                      {mode === 'signup' && (language === 'fa' ? 'تکمیل عضویت در شبکه' : 'Create Account')}
                      {mode === 'role_switch' && (language === 'fa' ? 'اعمال نقش کاربری' : 'Apply Role Switch')}
                    </span>
                    {direction === 'rtl' ? (
                      <ArrowLeft className="w-4 h-4 text-[#C8A56A]" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#C8A56A]" />
                    )}
                  </>
                )}
              </button>

            </form>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#FAF8F3] px-6 py-3 border-t border-[#ECE9E2] flex items-center justify-between text-[11px] text-[#8A918F]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008D8B]" />
            <span>Silk Road Identity & SSO Gateway</span>
          </span>
          <button 
            type="button" 
            onClick={() => {
              login('navidganjii@gmail.com', 'administrator');
              onClose();
            }}
            className="text-[#004F54] hover:underline font-medium"
          >
            {language === 'fa' ? 'ورود سریع ادمین (نوید گنجی)' : 'Quick Admin Bypass'}
          </button>
        </div>

      </div>
    </div>
  );
};

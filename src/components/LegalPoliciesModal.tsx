import React, { useState } from 'react';
import { X, Shield, Lock, FileText, Scale, Eye, CheckCircle2, Download, AlertCircle, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type PolicyTab = 'privacy' | 'terms' | 'copyright' | 'cookies' | 'contributor';

interface LegalPoliciesModalProps {
  initialTab?: PolicyTab;
  onClose: () => void;
}

export const LegalPoliciesModal: React.FC<LegalPoliciesModalProps> = ({
  initialTab = 'privacy',
  onClose
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [copied, setCopied] = useState(false);

  const handleCopyCitationTemplate = () => {
    const citation = `Silk Road Architecture Development Institute (SRADI). (2026). Digital Knowledge Repository, Architectural Atlas & Archive. https://sradi.arch.org`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#F7F5F0] w-full max-w-4xl rounded-2xl border border-[#ECE9E2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#003B40] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#004F54]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004F54] border border-[#C8A56A]/30 flex items-center justify-center text-[#C8A56A]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                {language === 'fa' ? 'قوانین، حقوق مولفین و سیاست‌های حریم خصوصی' : 'Institutional Policies, Privacy & Copyright'}
              </h2>
              <p className="text-xs text-[#ECE9E2]/75 font-light">
                {language === 'fa' 
                  ? 'استانداردهای حفاظت از داده‌ها، مجوزهای اسناد معماری و چارچوب حقوقی موسسه'
                  : 'Data governance, open architectural licensing, and academic attribution protocols.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#ECE9E2] transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#ECE9E2] bg-white px-6 overflow-x-auto gap-2 sm:gap-6 py-2 text-xs font-semibold">
          {[
            { id: 'privacy', labelEn: 'Privacy Policy', labelFa: 'حریم خصوصی', icon: Lock },
            { id: 'terms', labelEn: 'Terms of Use', labelFa: 'شرایط استفاده', icon: FileText },
            { id: 'copyright', labelEn: 'Copyright & Licensing', labelFa: 'حقوق مولف و مجوزها', icon: Shield },
            { id: 'cookies', labelEn: 'Cookie Policy', labelFa: 'سیاست کوکی‌ها', icon: Eye },
            { id: 'contributor', labelEn: 'Contributor Terms', labelFa: 'تعهدات پژوهشگران', icon: Scale },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PolicyTab)}
                className={`py-3 px-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#004F54] text-[#004F54] font-bold'
                    : 'border-transparent text-[#616866] hover:text-[#111817]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'fa' ? tab.labelFa : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#111817] leading-relaxed bg-[#F7F5F0]/60">
          
          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#004F54] font-bold text-base font-serif">
                <Lock className="w-5 h-5 text-[#C8A56A]" />
                <h3>{language === 'fa' ? 'سیاست جامع حریم خصوصی و امنیت داده‌ها (GDPR & International Compliance)' : 'Comprehensive Privacy & Data Protection Policy'}</h3>
              </div>
              <p className="text-xs text-[#616866]">
                {language === 'fa' ? 'آخرین به‌روزرسانی: فوریه ۲۰۲۶' : 'Effective Date: February 2026 | Compliant with international data protection frameworks.'}
              </p>
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3 shadow-2xs">
                <h4 className="font-bold text-[#003B40] text-xs uppercase tracking-wider">
                  {language === 'fa' ? '۱. گردآوری و پردازش داده‌ها' : '1. Data Collection & Academic Purpose'}
                </h4>
                <p>
                  {language === 'fa'
                    ? 'موسسه توسعه معماری جاده ابریشم (SRADI) تنها اطلاعات ضروری شامل نام، وابستگی دانشگاهی، سوابق پژوهشی، و ایمیل را به منظور ثبت نام در دوره‌ها، داوری مقالات و انتشار پروژه‌ها گردآوری می‌کند. هیچ‌یک از داده‌های هویتی اعضا به نهادهای تجاری شخص ثالث فروخته یا واگذار نمی‌گردد.'
                    : 'The Silk Road Architecture Development Institute collects essential identifiers—such as institutional affiliation, research records, ORCID, and email—solely for academic peer-review, residency submissions, and professional verification. No user data is sold, brokered, or leveraged for third-party commercial advertising.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3 shadow-2xs">
                <h4 className="font-bold text-[#003B40] text-xs uppercase tracking-wider">
                  {language === 'fa' ? '۲. حقوق کاربران و حق ناشناسی' : '2. Member Privacy Controls & Right to Erasure'}
                </h4>
                <p>
                  {language === 'fa'
                    ? 'اعضای شبکه می‌توانند از طریق بخش تنظیمات کاربری (User Dashboard) نمای عمومی مشخصات، ایمیل و سوابق خود را پنهان کرده و در هر زمان درخواست حذف کامل حساب کاربری و اطلاعات ثبت‌شده را ارسال نمایند.'
                    : 'Network scholars and students maintain full sovereign control over their directory visibility via the User Dashboard, including granular controls to toggle public portfolio visibility and request total erasure of personal telemetry.'}
                </p>
              </div>
            </div>
          )}

          {/* TERMS OF USE */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#004F54] font-bold text-base font-serif">
                <FileText className="w-5 h-5 text-[#C8A56A]" />
                <h3>{language === 'fa' ? 'شرایط استفاده از زیرساخت دیجیتال موسسه' : 'Terms of Use & Platform Governance'}</h3>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3 shadow-2xs">
                <h4 className="font-bold text-[#003B40] text-xs uppercase tracking-wider">
                  {language === 'fa' ? '۱. استفاده غیرتجاری و پژوهشی' : '1. Academic & Non-Commercial Use'}
                </h4>
                <p>
                  {language === 'fa'
                    ? 'تمامی داده‌های منتشرشده در اطلس، نشریه و رصدخانه برای استفاده در پژوهش‌های دانشگاهی، تدریس در مدارس معماری، و حفاظت میراث فرهنگی آزاد و رایگان است. هرگونه بهره‌برداری تجاری نیازمند مجوز رسمی از دبیرخانه موسسه و صاحبان حق امتیاز اثر می‌باشد.'
                    : 'All datasets, architectural drawings, and field reports hosted across SRADI are made openly accessible for university scholarship, heritage preservation, and academic teaching under fair-use protocols. Commercial re-packaging requires formal written authorization.'}
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3 shadow-2xs">
                <h4 className="font-bold text-[#003B40] text-xs uppercase tracking-wider">
                  {language === 'fa' ? '۲. صحت اسناد و امانت علمی' : '2. Scientific Integrity & Attribution'}
                </h4>
                <p>
                  {language === 'fa'
                    ? 'استناد دقیق به پدیدآورندگان نقشه‌ها، عکاسان معماری و نویسندگان مقالات الزامی است. نقض استانداردهای ارجاع‌دهی منجر به تعلیق عضویت خواهد شد.'
                    : 'Users agree to uphold strict academic integrity by providing formal citations for all spatial data, measured survey plans, and photographic documentation downloaded from this platform.'}
                </p>
              </div>
            </div>
          )}

          {/* COPYRIGHT & LICENSING */}
          {activeTab === 'copyright' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#004F54] font-bold text-base font-serif">
                <Shield className="w-5 h-5 text-[#C8A56A]" />
                <h3>{language === 'fa' ? 'حقوق مؤلفین، مالکیت معنوی و مجوزهای Creative Commons' : 'Intellectual Property, Licensing & Creative Commons'}</h3>
              </div>
              <div className="bg-[#003B40] text-white p-5 rounded-xl border border-[#004F54] space-y-3">
                <h4 className="font-serif font-bold text-sm text-[#C8A56A]">
                  {language === 'fa' ? 'الگوی استاندارد ارجاع علمی (Universal Citation Standard)' : 'Official Institute Citation Template'}
                </h4>
                <div className="bg-[#002428] p-3.5 rounded-lg font-mono text-xs text-[#ECE9E2] border border-[#004F54] flex items-center justify-between gap-4">
                  <span className="truncate">
                    Silk Road Architecture Development Institute (SRADI). (2026). Architectural Atlas & Digital Archive. https://sradi.arch.org
                  </span>
                  <button
                    onClick={handleCopyCitationTemplate}
                    className="shrink-0 p-1.5 rounded-md bg-[#004F54] hover:bg-[#008D8B] text-white transition-colors flex items-center gap-1.5 text-[11px]"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (language === 'fa' ? 'کپی شد' : 'Copied') : (language === 'fa' ? 'کپی ارجاع' : 'Copy')}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#ECE9E2] space-y-2">
                  <h5 className="font-bold text-xs text-[#003B40] uppercase">Creative Commons CC BY-NC 4.0</h5>
                  <p className="text-xs text-[#616866]">
                    {language === 'fa'
                      ? 'مقالات پژوهشی و داده‌های رصدخانه تحت مجوز انتساب-غیرتجاری منتشر می‌شوند.'
                      : 'Scholarly papers and Observatory indicators are distributed under CC BY-NC 4.0.'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#ECE9E2] space-y-2">
                  <h5 className="font-bold text-xs text-[#003B40] uppercase">Archival Measured Drawings</h5>
                  <p className="text-xs text-[#616866]">
                    {language === 'fa'
                      ? 'پلان‌ها و نقشه‌های فنی متعلق به آرشیو نهادهای همکار و معماران با ذکر نام پدیدآورنده محفوظ است.'
                      : 'Technical measured drawings remain copyright of their respective survey teams and archives.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* COOKIE POLICY */}
          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#004F54] font-bold text-base font-serif">
                <Eye className="w-5 h-5 text-[#C8A56A]" />
                <h3>{language === 'fa' ? 'سیاست کوکی‌ها و نشست‌های امنیتی' : 'Cookie & Local Storage Governance'}</h3>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3">
                <p>
                  {language === 'fa'
                    ? 'این وب‌سایت تنها از کوکی‌های ضروری فنی برای حفظ زبان انتخابی (فارسی / انگلیسی)، نشانه‌گذاری پروژه‌های مورد علاقه و نشست امنیتی اعضا استفاده می‌کند. هیچ‌گونه کوکی ردیابی تبلیغاتی شخص ثالث بارگذاری نمی‌شود.'
                    : 'The SRADI digital platform exclusively utilizes strictly necessary first-party cookies to preserve UI language preferences (EN/FA), active bookmarks, and secure authentication tokens. No cross-site ad trackers are deployed.'}
                </p>
              </div>
            </div>
          )}

          {/* CONTRIBUTOR TERMS */}
          {activeTab === 'contributor' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#004F54] font-bold text-base font-serif">
                <Scale className="w-5 h-5 text-[#C8A56A]" />
                <h3>{language === 'fa' ? 'تعهدنامه نویسندگان، معماران و پژوهشگران همکار' : 'Contributor Terms & Editorial Peer-Review Protocol'}</h3>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#ECE9E2] space-y-3">
                <p>
                  {language === 'fa'
                    ? 'تمام پروژه‌ها و مقالات ارسالی پیش از انتشار عمومی توسط هیئت داوران علمی و دبیران کشوری (Country Editors) از حیث صحت مختصات، اصالت نقشه‌ها و استناد به منابع بررسی می‌شوند. هیچ پروژه‌ای بدون داوری تایید نمی‌گردد.'
                    : 'All submitted architectural monographs and field research papers undergo thorough peer validation by regional Country Editors and the Scientific Editorial Board before public indexation.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-[#ECE9E2] p-4 px-6 flex items-center justify-between">
          <span className="text-xs text-[#616866]">
            {language === 'fa' ? 'پلتفرم دانش‌بنیان موسسه جاده ابریشم' : 'Silk Road Architecture Development Institute'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-bold transition-colors"
          >
            {language === 'fa' ? 'بستن' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};

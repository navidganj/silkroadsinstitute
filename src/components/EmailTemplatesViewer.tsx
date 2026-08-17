import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Sparkles, Eye, Shield, KeyRound, Calendar, FileText, UserPlus, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SilkRoadLogo } from './SilkRoadLogo';

export type EmailTemplateId = 
  | 'welcome' 
  | 'verify_email' 
  | 'reset_password' 
  | 'app_received' 
  | 'app_update' 
  | 'event_confirm' 
  | 'submission_received' 
  | 'submission_update' 
  | 'invitation';

export const EmailTemplatesViewer: React.FC = () => {
  const { language } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateId>('welcome');
  const [copied, setCopied] = useState(false);

  const templates: {
    id: EmailTemplateId;
    titleEn: string;
    titleFa: string;
    icon: any;
    subjectEn: string;
    subjectFa: string;
    bodyEn: React.ReactNode;
    bodyFa: React.ReactNode;
  }[] = [
    {
      id: 'welcome',
      titleEn: 'Welcome to Institute',
      titleFa: 'خوش‌آمدگویی به موسسه',
      icon: Sparkles,
      subjectEn: 'Welcome to the Silk Road Architecture Development Institute',
      subjectFa: 'به موسسه توسعه معماری جاده ابریشم خوش آمدید',
      bodyEn: (
        <>
          <p className="text-base font-serif font-bold text-[#003B40]">Dear Scholar,</p>
          <p>We are delighted to welcome you to the international research and knowledge network of the <strong>Silk Road Architecture Development Institute (SRADI)</strong>.</p>
          <p>Your member account allows you to bookmark architectural monuments, submit research dossiers, apply for international residencies, and connect directly with fellow practitioners across 14 Silk Road nations.</p>
          <div className="my-6 p-4 rounded-xl bg-[#F7F5F0] border border-[#ECE9E2] space-y-2">
            <h5 className="font-bold text-xs text-[#004F54] uppercase tracking-wider">Quick Next Steps:</h5>
            <ul className="text-xs space-y-1 list-disc list-inside text-[#616866]">
              <li>Complete your bilingual architectural biography and ORCID identifier</li>
              <li>Explore measured drawings and climate telemetry in the Architectural Atlas</li>
              <li>Discover upcoming open fellowships and symposium calls</li>
            </ul>
          </div>
        </>
      ),
      bodyFa: (
        <>
          <p className="text-base font-bold text-[#003B40]">پژوهشگر گرامی،</p>
          <p>با کمال مسرت، عضویت شما را در شبکه بین‌المللی پژوهشگران و معماران <strong>موسسه توسعه معماری جاده ابریشم</strong> گرامی می‌داریم.</p>
          <p>با حساب کاربری خود می‌توانید آثار معماری را نشانه‌گذاری کرده، مقالات و پروژه‌های خود را جهت داوری ارسال نمایید، و با متخصصان ۱۴ کشور حوزه ابریشم ارتباط علمی برقرار کنید.</p>
          <div className="my-6 p-4 rounded-xl bg-[#F7F5F0] border border-[#ECE9E2] space-y-2">
            <h5 className="font-bold text-xs text-[#004F54] uppercase tracking-wider">گام‌های پیشنهادی:</h5>
            <ul className="text-xs space-y-1 list-disc list-inside text-[#616866]">
              <li>تکمیل بیوگرافی دوزبانه و ثبت شناسه پژوهشی ORCID در پروفایل</li>
              <li>کاوش در نقشه‌های فنی، پلان‌ها و رصدخانه داده‌های اقلیمی</li>
              <li>مشاهده فرصت‌های اقامت پژوهشی و کارگاه‌های مرمت خشت و طاق</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: 'verify_email',
      titleEn: 'Verify Email',
      titleFa: 'تایید آدرس ایمیل',
      icon: Shield,
      subjectEn: 'Confirm your SRADI Academic Portal Account',
      subjectFa: 'تایید ایمیل حساب کاربری موسسه معماری جاده ابریشم',
      bodyEn: (
        <>
          <p className="font-serif font-bold text-[#003B40]">Institutional Account Verification</p>
          <p>Please click the button below to confirm your academic email address and unlock full submission privileges.</p>
          <div className="my-6 text-center">
            <button className="bg-[#004F54] hover:bg-[#003B40] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">
              Verify Academic Account
            </button>
          </div>
          <p className="text-xs text-[#616866]">Security Token: <span className="font-mono text-[#004F54]">SRADI-AUTH-2026-98X4B</span> (Valid for 48 hours).</p>
        </>
      ),
      bodyFa: (
        <>
          <p className="font-bold text-[#003B40]">احراز هویت و فعال‌سازی حساب کاربری</p>
          <p>لطفاً با کلیک بر روی دکمه زیر، آدرس ایمیل خود را تایید کرده تا امکان ارسال مقالات و دسترسی به اسناد آرشیوی برای شما فعال گردد.</p>
          <div className="my-6 text-center">
            <button className="bg-[#004F54] hover:bg-[#003B40] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">
              تایید و فعال‌سازی حساب
            </button>
          </div>
          <p className="text-xs text-[#616866]">شناسه امنیتی: <span className="font-mono text-[#004F54]">SRADI-AUTH-2026-98X4B</span> (معتبر به مدت ۴۸ ساعت).</p>
        </>
      )
    },
    {
      id: 'reset_password',
      titleEn: 'Password Reset',
      titleFa: 'بازیابی کلمه عبور',
      icon: KeyRound,
      subjectEn: 'Reset Your SRADI Portal Password',
      subjectFa: 'درخواست تغییر کلمه عبور پورتال موسسه',
      bodyEn: (
        <>
          <p className="font-serif font-bold text-[#003B40]">Password Reset Request</p>
          <p>We received an authenticated request to reset the password for your Silk Road Institute account. Click below to establish new credentials.</p>
          <div className="my-6 text-center">
            <button className="bg-[#B38048] hover:bg-[#966b3c] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">
              Reset My Password
            </button>
          </div>
          <p className="text-xs text-[#616866]">If you did not initiate this request, you may disregard this communication securely.</p>
        </>
      ),
      bodyFa: (
        <>
          <p className="font-bold text-[#003B40]">بازیابی کلمه عبور</p>
          <p>درخواستی برای بازنشانی کلمه عبور حساب کاربری شما در پورتال موسسه دریافت گردید. جهت تعیین رمز عبور جدید از دکمه زیر استفاده فرمایید.</p>
          <div className="my-6 text-center">
            <button className="bg-[#B38048] hover:bg-[#966b3c] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">
              تعیین رمز عبور جدید
            </button>
          </div>
          <p className="text-xs text-[#616866]">در صورتی که شما این درخواست را ارسال نکرده‌اید، می‌توانید این پیام را نادیده بگیرید.</p>
        </>
      )
    },
    {
      id: 'app_received',
      titleEn: 'Application Received',
      titleFa: 'دریافت درخواست پذیرش',
      icon: FileText,
      subjectEn: 'Application Received: International Fellowship / Program',
      subjectFa: 'درخواست پذیرش شما در برنامه آموزشی / اقامت پژوهشی دریافت شد',
      bodyEn: (
        <>
          <p className="font-serif font-bold text-[#003B40]">Application Confirmation</p>
          <p>Your application dossier for the <strong>Earthen Vaulting & Mudbrick Masterclass (Yazd 2026)</strong> has been successfully registered and logged in the academic review queue.</p>
          <div className="my-5 p-4 rounded-xl bg-white border border-[#ECE9E2] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between"><span>Dossier Reference:</span><strong className="text-[#004F54]">APP-2026-YZD-0419</strong></div>
            <div className="flex justify-between"><span>Status:</span><span className="text-amber-700 font-bold">Under Review by Jury</span></div>
            <div className="flex justify-between"><span>Expected Jury Verdict:</span><span>April 15, 2026</span></div>
          </div>
        </>
      ),
      bodyFa: (
        <>
          <p className="font-bold text-[#003B40]">رسید ثبت پرونده پذیرش</p>
          <p>پرونده درخواست شرکت شما در <strong>دوره تخصصی طاق‌زنی خشتی و سازه‌های بومی (یزد ۲۰۲۶)</strong> با موفقیت در سامانه ثبت و به هیئت داوران علمی ارجاع شد.</p>
          <div className="my-5 p-4 rounded-xl bg-white border border-[#ECE9E2] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between"><span>شماره پیگیری پرونده:</span><strong className="text-[#004F54]">APP-2026-YZD-0419</strong></div>
            <div className="flex justify-between"><span>وضعیت:</span><span className="text-amber-700 font-bold">در حال داوری علمی</span></div>
            <div className="flex justify-between"><span>اعلام نتایج داوری:</span><span>۲۶ فروردین ۱۴۰۵</span></div>
          </div>
        </>
      )
    },
    {
      id: 'event_confirm',
      titleEn: 'Event Registration',
      titleFa: 'تایید ثبت‌نام رویداد',
      icon: Calendar,
      subjectEn: 'Confirmed: 8th Silk Road Architectural Heritage Congress',
      subjectFa: 'تایید ثبت‌نام در هشتمین کنگره بین‌المللی میراث معماری ابریشم',
      bodyEn: (
        <>
          <p className="font-serif font-bold text-[#003B40]">Registration & Delegate Badge</p>
          <p>Thank you for registering. We are pleased to confirm your participation in the <strong>8th International Congress on Silk Road Architectural Heritage</strong> in Samarkand.</p>
          <div className="my-5 p-4 rounded-xl bg-[#003B40] text-white space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-[#C8A56A]">Venue:</span><span>Registan Cultural Assembly Hall, Samarkand</span></div>
            <div className="flex justify-between"><span className="text-[#C8A56A]">Date:</span><span>October 12–15, 2026</span></div>
            <div className="flex justify-between"><span className="text-[#C8A56A]">Pass Type:</span><span>Full In-Person Academic Delegate</span></div>
          </div>
        </>
      ),
      bodyFa: (
        <>
          <p className="font-bold text-[#003B40]">کارت شرکت در رویداد و تایید ثبت‌نام</p>
          <p>حضور شما در <strong>هشتمین کنگره بین‌المللی میراث معماری جاده ابریشم</strong> در سمرقند با موفقیت تایید گردید.</p>
          <div className="my-5 p-4 rounded-xl bg-[#003B40] text-white space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-[#C8A56A]">مکان برگزاری:</span><span>تالار اجتماعات ریگستان، سمرقند</span></div>
            <div className="flex justify-between"><span className="text-[#C8A56A]">تاریخ:</span><span>۲۰ تا ۲۳ مهر ۱۴۰۵</span></div>
            <div className="flex justify-between"><span className="text-[#C8A56A]">نوع ثبت‌نام:</span><span>کارت شرکت حضوری کامل (Academic Delegate)</span></div>
          </div>
        </>
      )
    },
    {
      id: 'submission_update',
      titleEn: 'Submission Update',
      titleFa: 'وضعیت بررسی اثر معماری',
      icon: CheckCircle2,
      subjectEn: 'Editorial Verdict: Architectural Project Proposal Published',
      subjectFa: 'نتیجه داوری: پروژه معماری ارسالی شما در اطلس منتشر شد',
      bodyEn: (
        <>
          <p className="font-serif font-bold text-[#003B40]">Editorial Board Notice</p>
          <p>We are pleased to inform you that your monograph submission, <strong>"Vernacular Windcatcher Tectonics and Thermal Mass"</strong>, has successfully passed peer verification by the Regional Editorial Board and is now officially published in the Silk Road Architectural Atlas.</p>
          <div className="my-6 text-center">
            <button className="bg-[#004F54] hover:bg-[#003B40] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">
              View Published Atlas Dossier
            </button>
          </div>
        </>
      ),
      bodyFa: (
        <>
          <p className="font-bold text-[#003B40]">ابلاغیه هیئت تحریریه و دبیران کشوری</p>
          <p>با خرسندی به اطلاع می‌رساند پرونده معماری ارسالی شما تحت عنوان <strong>«تکتونیک بادگیرهای بومی و جرم حرارتی»</strong> پس از تایید هیئت داوران کشوری، رسماً در اطلس معماری جاده ابریشم منتشر گردید.</p>
          <div className="my-6 text-center">
            <button className="bg-[#004F54] hover:bg-[#003B40] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">
              مشاهده پرونده منتشرشده در اطلس
            </button>
          </div>
        </>
      )
    }
  ];

  const current = templates.find(t => t.id === selectedTemplate) || templates[0];

  const handleCopyRaw = () => {
    const text = `${language === 'fa' ? current.subjectFa : current.subjectEn}\n\nSilk Road Architecture Development Institute\nhttps://sradi.arch.org`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#ECE9E2] shadow-sm">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#003B40] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#004F54]" />
            <span>{language === 'fa' ? 'قالب‌های استاندارد ایمیل‌های تعاملی موسسه (Transactional Emails)' : 'Institutional Transactional Email Engine'}</span>
          </h3>
          <p className="text-xs text-[#616866]">
            {language === 'fa' ? 'طراحی و الگوهای ارسال ایمیل‌های عضویت، تایید رویدادها، داوری مقالات و پذیرش دوره‌ها با هویت بصری یکپارچه.' : 'Standardized multilingual templates maintaining institutional typography, logos, and verification tokens.'}
          </p>
        </div>
        <button
          onClick={handleCopyRaw}
          className="px-4 py-2 rounded-lg bg-[#ECE9E2] hover:bg-[#004F54] hover:text-white text-xs font-bold text-[#003B40] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (language === 'fa' ? 'کپی شد' : 'Copied') : (language === 'fa' ? 'کپی الگو' : 'Copy Subject')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Template Selector List */}
        <div className="lg:col-span-4 space-y-2">
          {templates.map(t => {
            const Icon = t.icon;
            const isSelected = t.id === selectedTemplate;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`w-full text-left rtl:text-right p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#004F54] text-white border-[#004F54] shadow-md'
                    : 'bg-white text-[#111817] border-[#ECE9E2] hover:border-[#008D8B]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-[#003B40] text-[#C8A56A]' : 'bg-[#F7F5F0] text-[#004F54]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">
                    {language === 'fa' ? t.titleFa : t.titleEn}
                  </div>
                  <div className={`text-[11px] truncate ${isSelected ? 'text-[#ECE9E2]/80' : 'text-[#616866]'}`}>
                    {language === 'fa' ? t.subjectFa : t.subjectEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Email Preview Frame */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#ECE9E2] shadow-sm overflow-hidden flex flex-col">
          {/* Email Client Simulated Header */}
          <div className="bg-[#ECE9E2]/60 p-4 border-b border-[#ECE9E2] space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#616866] w-16">{language === 'fa' ? 'فرستنده:' : 'From:'}</span>
              <span className="font-mono text-[#003B40]">Silk Road Architecture Institute &lt;noreply@sradi.arch.org&gt;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#616866] w-16">{language === 'fa' ? 'موضوع:' : 'Subject:'}</span>
              <span className="font-bold text-[#004F54]">{language === 'fa' ? current.subjectFa : current.subjectEn}</span>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-6 sm:p-10 space-y-6 bg-[#F7F5F0]/30 min-h-[380px] flex flex-col justify-between">
            <div>
              {/* Brand Header */}
              <div className="pb-6 border-b border-[#ECE9E2] flex items-center justify-between">
                <SilkRoadLogo size="sm" showText={true} />
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#616866] bg-white px-2.5 py-1 rounded-full border border-[#ECE9E2]">
                  OFFICIAL DISPATCH
                </span>
              </div>

              {/* Message Content */}
              <div className="pt-6 space-y-4 text-sm leading-relaxed text-[#111817]">
                {language === 'fa' ? current.bodyFa : current.bodyEn}
              </div>
            </div>

            {/* Email Footer */}
            <div className="pt-8 border-t border-[#ECE9E2] text-xs text-[#616866] space-y-2">
              <p>
                {language === 'fa' 
                  ? 'موسسه توسعه معماری جاده ابریشم (SRADI) — زیرساخت دیجیتال ثبت، پژوهش و مقایسه معماری کهن و معاصر.'
                  : 'Silk Road Architecture Development Institute (SRADI) — An international knowledge infrastructure for trans-national architectural heritage.'}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-[#004F54]">
                <a href="#atlas" className="hover:underline">Atlas</a>
                <span>•</span>
                <a href="#journal" className="hover:underline">Journal</a>
                <span>•</span>
                <a href="#privacy" className="hover:underline">Privacy Policy</a>
                <span>•</span>
                <span>sradi.arch.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

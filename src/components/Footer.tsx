import React, { useState } from 'react';
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowUpRight,
  Check,
  Twitter,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { SilkRoadLogo } from './SilkRoadLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onSelectCountry?: (countryId: string) => void;
  onOpenPolicy?: (tab: 'privacy' | 'terms' | 'copyright' | 'cookies' | 'contributor') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  const { language } = useLanguage();
  const { settings } = useSiteSettings();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#00272B] text-[#ECE9E2] border-t border-[#003B40] pt-14 pb-8 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Mission (Col 1-4) */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left rtl:text-right group cursor-pointer"
            >
              <SilkRoadLogo size="md" variant="dark" />
            </button>

            <p className="text-xs text-[#ECE9E2]/75 leading-relaxed font-light pr-4 rtl:pr-0 rtl:pl-4">
              {language === 'fa'
                ? 'پیشبرد و ترویج معماری و شهرسازی از طریق پژوهش، همکاری و گفتگوی فرهنگی در امتداد جاده‌های ابریشم.'
                : 'Advancing architecture and urbanism through research, collaboration and cultural dialogue across the Silk Roads.'}
            </p>
          </div>

          {/* Nav Columns: EXPLORE, PARTICIPATE, INSTITUTE (Col 5-9) */}
          <div className="md:col-span-8 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            
            {/* Column 1: EXPLORE */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                {language === 'fa' ? 'کاوش' : 'EXPLORE'}
              </h4>
              <ul className="space-y-2 text-[#ECE9E2]/75">
                <li>
                  <button onClick={() => onNavigate('atlas')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'اطلس' : 'Atlas'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('compare')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'شهرها و مطالعات' : 'Cities & Studies'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('research')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'نشریه پژوهشی' : 'Research Journal'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('archive')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'آرشیو دیجیتال' : 'Digital Archive'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('observatory')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'رصدخانه' : 'Observatory'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: PARTICIPATE */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                {language === 'fa' ? 'مشارکت' : 'PARTICIPATE'}
              </h4>
              <ul className="space-y-2 text-[#ECE9E2]/75">
                <li>
                  <button onClick={() => onNavigate('network')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'شبکه اعضا' : 'Network'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('programs')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'برنامه‌ها و بورسیه‌ها' : 'Programs & Fellowships'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('events')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'رویدادها و نشست‌ها' : 'Events & Forums'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('network')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'پیوستن به جامعه علمی' : 'Join the Community'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: INSTITUTE */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
                {language === 'fa' ? 'موسسه' : 'INSTITUTE'}
              </h4>
              <ul className="space-y-2 text-[#ECE9E2]/75">
                <li>
                  <button onClick={() => onNavigate('design-system')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'درباره ما' : 'About'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('network')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'تیم و هیئت علمی' : 'Team'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('network')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'شرکا و همکاران' : 'Partners'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('research')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'اخبار و اطلاعیه‌ها' : 'News'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('design-system')} className="hover:text-[#C8A56A] transition-colors cursor-pointer">
                    {language === 'fa' ? 'تماس با ما' : 'Contact'}
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Stay Connected & Newsletter (Col 10-12) */}
          <div className="md:col-span-12 lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              {language === 'fa' ? 'ارتباط مستمر' : 'STAY CONNECTED'}
            </h4>
            <p className="text-xs text-[#ECE9E2]/75 font-light">
              {language === 'fa' ? 'عضویت در خبرنامه ماهانه موسسه' : 'Subscribe to our newsletter'}
            </p>

            {/* Newsletter Input Box matching the mockup */}
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'fa' ? 'پست الکترونیک شما...' : 'Your email'}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#001D20] border border-[#004F54] text-xs text-white placeholder-[#8A918F] focus:outline-hidden focus:border-[#C8A56A] transition-colors pr-10 rtl:pr-3.5 rtl:pl-10"
              />
              <button
                type="submit"
                className="absolute right-1.5 rtl:right-auto rtl:left-1.5 w-7 h-7 rounded bg-[#004F54] hover:bg-[#C8A56A] hover:text-[#00272B] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Subscribe"
              >
                {isSubscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
              </button>
            </form>

            {isSubscribed && (
              <div className="text-[11px] text-[#C8A56A]">
                {language === 'fa' ? 'با موفقیت ثبت شد.' : 'Subscribed successfully.'}
              </div>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2 text-[#ECE9E2]/75">
              <a href="#linkedin" className="w-7 h-7 rounded-full border border-[#004F54] hover:border-[#C8A56A] hover:text-[#C8A56A] flex items-center justify-center transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#instagram" className="w-7 h-7 rounded-full border border-[#004F54] hover:border-[#C8A56A] hover:text-[#C8A56A] flex items-center justify-center transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#twitter" className="w-7 h-7 rounded-full border border-[#004F54] hover:border-[#C8A56A] hover:text-[#C8A56A] flex items-center justify-center transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#youtube" className="w-7 h-7 rounded-full border border-[#004F54] hover:border-[#C8A56A] hover:text-[#C8A56A] flex items-center justify-center transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar with dynamic settings */}
        <div className="pt-6 border-t border-[#003B40] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#ECE9E2]/60">
          <div className="text-center sm:text-left rtl:sm:text-right space-y-1">
            <div>
              {language === 'fa' ? settings.footerCopyrightFa : settings.footerCopyright}
            </div>
            <div className="text-[10px] text-[#ECE9E2]/45">
              {language === 'fa' ? settings.footerAccreditationFa : settings.footerAccreditation}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onOpenPolicy && onOpenPolicy('privacy')} className="hover:text-white transition-colors cursor-pointer">
              {language === 'fa' ? 'حریم خصوصی' : 'Privacy Policy'}
            </button>
            <button onClick={() => onOpenPolicy && onOpenPolicy('terms')} className="hover:text-white transition-colors cursor-pointer">
              {language === 'fa' ? 'شرایط استفاده' : 'Terms of Use'}
            </button>
            <button onClick={() => onOpenPolicy && onOpenPolicy('copyright')} className="hover:text-white transition-colors cursor-pointer">
              {language === 'fa' ? 'حقوق مؤلف و DOI' : 'Copyright & DOI'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

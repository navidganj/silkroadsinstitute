import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building, 
  MapPin, 
  Globe, 
  BookOpen, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  Shield, 
  Mail,
  Camera,
  ExternalLink,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface UserProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileEditorModal: React.FC<UserProfileEditorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();
  const { currentUser, updateProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [nameFa, setNameFa] = useState(currentUser?.nameFa || '');
  const [profession, setProfession] = useState(currentUser?.profession || '');
  const [organization, setOrganization] = useState(currentUser?.organization || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [bioFa, setBioFa] = useState(currentUser?.bioFa || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [orcid, setOrcid] = useState(currentUser?.orcid || '');
  const [expertiseInput, setExpertiseInput] = useState(currentUser?.expertise.join(', ') || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      nameFa,
      profession,
      organization,
      city,
      country,
      bio,
      bioFa,
      website,
      orcid,
      avatar,
      expertise: expertiseInput.split(',').map(s => s.trim()).filter(Boolean)
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FBF9F4] text-[#111817] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#ECE9E2] flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#003B40] text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl">
              {language === 'fa' ? 'ویرایش پروفایل پژوهشی و حرفه‌ای' : 'Edit Scholar & Architect Profile'}
            </h2>
            <p className="text-xs text-[#ECE9E2]/80 mt-0.5">
              {language === 'fa' 
                ? 'اطلاعات عمومی شما در شبکه بین‌المللی پژوهشگران جاده ابریشم نمایش داده می‌شود.'
                : 'Your profile details in the international Silk Road scholarly network.'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Avatar Section */}
          <div>
            <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-2">
              {language === 'fa' ? 'تصویر پرتره' : 'Portrait Picture'}
            </label>
            <div className="flex items-center gap-4">
              <img
                src={avatar || sampleAvatars[0]}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#C8A56A] shadow"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {sampleAvatars.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatar(url)}
                      className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform ${
                        avatar === url ? 'border-[#004F54] scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-[#616866]">
                  {language === 'fa' ? 'انتخاب از الگوها یا وارد کردن لینک اختصاصی' : 'Choose a portrait or enter custom image URL'}
                </div>
              </div>
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                {language === 'fa' ? 'نام به انگلیسی' : 'Full Name (English)'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                {language === 'fa' ? 'نام به فارسی / محلی' : 'Full Name (Persian / Local)'}
              </label>
              <input
                type="text"
                value={nameFa}
                onChange={(e) => setNameFa(e.target.value)}
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
              />
            </div>
          </div>

          {/* Profession & Organization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                {language === 'fa' ? 'عنوان حرفه‌ای / تخصصی' : 'Professional Title / Profession'}
              </label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
                placeholder="Architect & Heritage Researcher"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                {language === 'fa' ? 'موسسه / دانشگاه / دفتر' : 'Institution / Practice'}
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
                placeholder="Silk Road Architecture Development Institute"
              />
            </div>
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                {language === 'fa' ? 'شهر' : 'City'}
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                {language === 'fa' ? 'کشور' : 'Country'}
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
              {language === 'fa' ? 'زندگینامه و فعالیت‌های پژوهشی (انگلیسی)' : 'Scholarly Biography (English)'}
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white text-xs p-3 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
              {language === 'fa' ? 'زندگینامه و فعالیت‌های پژوهشی (فارسی)' : 'Scholarly Biography (Persian)'}
            </label>
            <textarea
              rows={3}
              value={bioFa}
              onChange={(e) => setBioFa(e.target.value)}
              className="w-full bg-white text-xs p-3 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
            />
          </div>

          {/* Website, ORCID, Expertise */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                ORCID iD
              </label>
              <input
                type="text"
                value={orcid}
                onChange={(e) => setOrcid(e.target.value)}
                placeholder="0000-0002-8419-4912"
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
                {language === 'fa' ? 'وب‌سایت شخصی یا دفتر' : 'Website'}
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#003B40] uppercase tracking-wider mb-1">
              {language === 'fa' ? 'حوزه‌های تخصصی (با کاما جدا کنید)' : 'Areas of Expertise (Comma-separated)'}
            </label>
            <input
              type="text"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              placeholder="Vaulting Geometry, Earthen Tectonics, Desert Urbanism, Heritage Digitization"
              className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-[#ECE9E2] focus:border-[#004F54] focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#004F54] hover:bg-[#003B40] text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#C8A56A]" />
                  <span>{language === 'fa' ? 'تغییرات با موفقیت ذخیره شد!' : 'Profile Saved Successfully!'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{language === 'fa' ? 'ذخیره مشخصات و بروزرسانی' : 'Save Profile Changes'}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

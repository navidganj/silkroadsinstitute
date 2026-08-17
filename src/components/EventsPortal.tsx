import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Globe, 
  Layers, 
  CheckCircle2, 
  Ticket, 
  Sparkles, 
  X, 
  Download,
  Share2,
  Video
} from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';
import { useAuth } from '../../src/context/AuthContext';
import { initialEvents } from '../data/seedData';
import { EventItem } from '../types';

export const EventsPortal: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser, registerForEvent } = useAuth();

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registrationMode, setRegistrationMode] = useState<'in_person' | 'virtual'>('in_person');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    registerForEvent(selectedEvent.id);
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setIsRegisterModalOpen(false);
    }, 2200);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Banner */}
        <div className="bg-[#003B40] rounded-2xl p-6 sm:p-10 text-[#ECE9E2] relative overflow-hidden border border-[#004F54] shadow-md">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#008D8B]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004F54] text-[#C8A56A] text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'همایش‌ها، نشست‌های تخصصی و دوسالانه‌ها' : 'Symposia & Biennial International Fora'}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-tight">
              {language === 'fa' ? 'رویدادها و نشست‌های بین‌المللی معماری ابریشم' : 'Silk Road Architectural Events & Symposia'}
            </h1>
            <p className="text-sm sm:text-base text-[#ECE9E2]/80 leading-relaxed">
              {language === 'fa' 
                ? 'پلتفرم گردهمایی سالانه معماران، مورخان، شهرسازان و متخصصان مرمت جهت گفتگو پیرامون آینده شهرهای ابریشم، تاب‌آوری اقلیمی و انتقال تجارب معاصر.'
                : 'International biennial gatherings, keynote lectures, and scholarly panel debates convening global architectural thinkers and heritage stewards.'}
            </p>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {initialEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-[#ECE9E2] overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image & Date Badge */}
              <div className="lg:col-span-5 relative bg-[#003B40] min-h-[260px]">
                <img
                  src={evt.heroImage}
                  alt={evt.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#003B40]/90 text-[#C8A56A] text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-[#004F54]">
                    {language === 'fa' ? evt.typeFa : evt.type.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    <span>{evt.format.toUpperCase()}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs text-[#C8A56A] font-semibold uppercase tracking-wider">
                    {evt.venueName}
                  </div>
                  <div className="font-serif font-bold text-lg leading-tight mt-1">
                    {language === 'fa' ? evt.locationFa : evt.location}
                  </div>
                </div>
              </div>

              {/* Content & Speakers */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-[#616866]">
                    <span className="flex items-center gap-1 font-semibold text-[#004F54]">
                      <Calendar className="w-4 h-4 text-[#C8A56A]" />
                      {evt.startDate} {evt.endDate ? `— ${evt.endDate}` : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#008D8B]" />
                      {evt.time}
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#003B40] leading-snug">
                    {language === 'fa' ? evt.titleFa : evt.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#111817]/85 leading-relaxed">
                    {language === 'fa' ? evt.descriptionFa : evt.description}
                  </p>

                  {/* Keynote Speakers */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-[#004F54] uppercase tracking-wider">
                      {language === 'fa' ? 'سخنرانان کلیدی و هیئت علمی:' : 'Keynote Speakers:'}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {evt.speakers.map((spk, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#F7F5F0] p-2 rounded-lg border border-[#ECE9E2]">
                          <img
                            src={spk.avatar}
                            alt={spk.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="text-xs">
                            <div className="font-bold text-[#003B40]">{language === 'fa' ? spk.nameFa : spk.name}</div>
                            <div className="text-[10px] text-[#616866]">{spk.affiliation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="pt-4 border-t border-[#ECE9E2] flex items-center justify-between">
                  <div className="text-xs text-[#616866]">
                    <span className="font-bold text-[#003B40]">{evt.registeredCount}</span> / {evt.capacity} {language === 'fa' ? 'نفر ثبت‌نام کرده‌اند' : 'Registered Attendees'}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEvent(evt);
                      setIsRegisterModalOpen(true);
                    }}
                    className="bg-[#004F54] hover:bg-[#003B40] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Ticket className="w-4 h-4 text-[#C8A56A]" />
                    <span>{language === 'fa' ? 'رزرو صندلی / دریافت بلیت همایش' : 'Reserve Delegate Pass'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Event Registration Modal */}
      {isRegisterModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5F0] w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#ECE9E2] space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECE9E2] pb-4">
              <div>
                <div className="text-xs font-bold text-[#008D8B] uppercase tracking-wider">
                  {language === 'fa' ? 'فرم ثبت‌نام و دریافت کارت حضور' : 'Delegate Registration'}
                </div>
                <h3 className="font-serif font-bold text-lg text-[#003B40] line-clamp-1">
                  {language === 'fa' ? selectedEvent.titleFa : selectedEvent.title}
                </h3>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)} className="p-1 hover:bg-[#ECE9E2] rounded">
                <X className="w-5 h-5 text-[#616866]" />
              </button>
            </div>

            {registeredSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-serif font-bold text-xl text-[#003B40]">
                  {language === 'fa' ? 'بلیت و کارت الکترونیکی شما صادر شد!' : 'Delegate Pass Issued!'}
                </h4>
                <p className="text-xs text-[#616866]">
                  {language === 'fa' 
                    ? 'لینک ورود به پخش زنده و شناسه صندلی همایش به ایمیل شما ارسال شد و در پنل کاربری ذخیره گردید.'
                    : 'Your electronic delegate credentials and live broadcast pass have been added to your Dashboard.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-[#111817] mb-1">
                    {language === 'fa' ? 'نحوه حضور در همایش:' : 'Participation Mode:'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRegistrationMode('in_person')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        registrationMode === 'in_person'
                          ? 'border-[#004F54] bg-[#004F54]/10 text-[#004F54] font-bold'
                          : 'border-[#ECE9E2] bg-white text-[#616866]'
                      }`}
                    >
                      <div className="font-bold">{language === 'fa' ? 'حضور فیزیکی در سالن' : 'In-Person Delegate'}</div>
                      <div className="text-[10px] opacity-80">{selectedEvent.venueName}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegistrationMode('virtual')}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        registrationMode === 'virtual'
                          ? 'border-[#004F54] bg-[#004F54]/10 text-[#004F54] font-bold'
                          : 'border-[#ECE9E2] bg-white text-[#616866]'
                      }`}
                    >
                      <div className="font-bold">{language === 'fa' ? 'پخش زنده اینترنتی' : 'Virtual / Stream'}</div>
                      <div className="text-[10px] opacity-80">{language === 'fa' ? 'پخش HD دوزبانه' : 'Bilingual HD Audio'}</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111817] mb-1">
                    {language === 'fa' ? 'نام و نام خانوادگی:' : 'Delegate Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue={currentUser.name}
                    className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111817] mb-1">
                    {language === 'fa' ? 'پست الکترونیکی جهت ارسال بلیت:' : 'Institutional Email:'}
                  </label>
                  <input
                    type="email"
                    required
                    defaultValue={currentUser.email}
                    className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ECE9E2]">
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#616866] hover:bg-[#ECE9E2]"
                  >
                    {language === 'fa' ? 'انصراف' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#004F54] hover:bg-[#003B40] text-white transition-colors flex items-center gap-2"
                  >
                    <Ticket className="w-3.5 h-3.5 text-[#C8A56A]" />
                    <span>{language === 'fa' ? 'تایید و صدور رایگان کارت همایش' : 'Confirm Registration (Free)'}</span>
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

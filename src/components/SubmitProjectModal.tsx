import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  FileText, 
  Upload, 
  CheckCircle2, 
  X, 
  Plus, 
  Trash2, 
  Sparkles,
  Compass,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../../src/context/LanguageContext';
import { useAuth } from '../../src/context/AuthContext';
import { initialCountries, initialCities } from '../data/seedData';
import { Typology, HistoricalPeriod, Project } from '../types';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (project: Partial<Project>) => void;
}

export const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const { language, t } = useLanguage();
  const { currentUser, submitProject } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [titleFa, setTitleFa] = useState('');
  const [countryId, setCountryId] = useState('iran');
  const [cityId, setCityId] = useState('isfahan');
  const [architect, setArchitect] = useState('');
  const [architectFa, setArchitectFa] = useState('');
  const [yearCompleted, setYearCompleted] = useState<number>(2024);
  const [typology, setTypology] = useState<Typology>('cultural_center');
  const [historicalPeriod, setHistoricalPeriod] = useState<HistoricalPeriod>('contemporary_21st');
  const [status, setStatus] = useState<Project['status']>('built_contemporary');
  const [heritageStatus, setHeritageStatus] = useState<Project['heritageStatus']>('national_heritage');
  const [materials, setMaterials] = useState<string[]>(['Brick', 'Stone', 'Timber']);
  const [newMaterial, setNewMaterial] = useState('');
  const [structuralSystem, setStructuralSystem] = useState('');
  const [structuralSystemFa, setStructuralSystemFa] = useState('');
  const [climateStrategies, setClimateStrategies] = useState<string[]>(['Passive Thermal Mass', 'Central Courtyard Microclimate']);
  const [description, setDescription] = useState('');
  const [descriptionFa, setDescriptionFa] = useState('');
  const [spatialConcept, setSpatialConcept] = useState('');
  const [spatialConceptFa, setSpatialConceptFa] = useState('');
  const [urbanContext, setUrbanContext] = useState('');
  const [urbanContextFa, setUrbanContextFa] = useState('');
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80');

  if (!isOpen) return null;

  const handleAddMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial('');
    }
  };

  const handleRemoveMaterial = (mat: string) => {
    setMaterials(materials.filter(m => m !== mat));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newProject: Partial<Project> = {
      id: `proj-sub-${Date.now()}`,
      title: title || 'Silk Road Architecture Project',
      titleFa: titleFa || title || 'پروژه پیشنهادی معماری ابریشم',
      countryId,
      countryName: initialCountries.find(c => c.id === countryId)?.name || 'Iran',
      countryNameFa: initialCountries.find(c => c.id === countryId)?.nameFa || 'ایران',
      cityId,
      cityName: initialCities.find(c => c.id === cityId)?.name || 'Isfahan',
      cityNameFa: initialCities.find(c => c.id === cityId)?.nameFa || 'اصفهان',
      coordinates: { lat: 32.6546, lng: 51.6680 },
      architect: architect || 'Lead Architect',
      architectFa: architectFa || architect || 'معمار طراح',
      yearCompleted: Number(yearCompleted) || 2024,
      typology,
      historicalPeriod,
      status,
      heritageStatus,
      materials,
      materialsFa: materials,
      structuralSystem: structuralSystem || 'Reinforced Masonry & Brick Vaulting',
      structuralSystemFa: structuralSystemFa || 'طاق‌زنی سنتی و اسکلت مقاوم',
      climateStrategies,
      climateStrategiesFa: climateStrategies,
      description: description || 'Documented Silk Road architectural insertion.',
      descriptionFa: descriptionFa || 'پروژه ثبت‌شده در چارچوب اطلس معماری جاده ابریشم.',
      spatialConcept: spatialConcept || 'Continuity of traditional spatial corridors.',
      spatialConceptFa: spatialConceptFa || 'تداوم فضایی راسته‌های سنتی.',
      urbanContext: urbanContext || 'Historic urban core integration.',
      urbanContextFa: urbanContextFa || 'هم‌پیوندی با بافت تاریخی.',
      heroImage: heroImage || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [heroImage],
      drawings: [],
      citations: ['Silk Road Architecture Development Institute Archives, 2026.'],
      photographer: currentUser.name,
      copyright: 'CC BY-NC 4.0 Open Heritage License',
      submissionStatus: 'under_review'
    };

    submitProject(newProject.id!, newProject.title!);
    if (onSubmitSuccess) onSubmitSuccess(newProject);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#F7F5F0] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#ECE9E2] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#003B40] p-6 text-white flex items-center justify-between border-b border-[#004F54]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#004F54] flex items-center justify-center text-[#C8A56A]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl">
                {language === 'fa' ? 'پیشنهاد و ثبت اثر در اطلس معماری ابریشم' : 'Submit Architectural Project to Atlas'}
              </h2>
              <div className="text-xs text-[#ECE9E2]/80">
                {language === 'fa' ? 'گام‌های تدوین پرونده فنی و مستندنگاری بنا' : 'Standardized Monographic Dossier & Drawing Submission'}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 hover:bg-[#004F54] rounded-lg text-[#ECE9E2]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="bg-white px-6 py-3 border-b border-[#ECE9E2] flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#004F54]' : 'text-[#616866]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#004F54] text-white' : 'bg-[#ECE9E2]'}`}>1</span>
            <span>{language === 'fa' ? 'مشخصات و موقعیت' : 'Basic & Typology'}</span>
          </div>
          <span className="text-[#ECE9E2]">──</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#004F54]' : 'text-[#616866]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#004F54] text-white' : 'bg-[#ECE9E2]'}`}>2</span>
            <span>{language === 'fa' ? 'سیستم سازه و مصالح' : 'Tectonics & Materials'}</span>
          </div>
          <span className="text-[#ECE9E2]">──</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#004F54]' : 'text-[#616866]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#004F54] text-white' : 'bg-[#ECE9E2]'}`}>3</span>
            <span>{language === 'fa' ? 'هوش اقلیمی و کانسپت' : 'Climate & Concept'}</span>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isDone ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-serif font-bold text-2xl text-[#003B40]">
                {language === 'fa' ? 'پرونده اثر با موفقیت در نوبت داوری ثبت شد!' : 'Dossier Submitted to Editorial Queue!'}
              </h3>
              <p className="text-xs text-[#616866] max-w-md mx-auto leading-relaxed">
                {language === 'fa' 
                  ? 'کد رهگیری اثر صادر گردید. پس از ارزیابی هیئت علمی و تایید نقشه‌های فنی، پروژه در اطلس عمومی جاده ابریشم منتشر خواهد شد.'
                  : 'Your architectural submission has been assigned a tracking ID and routed to the regional country editor for verification.'}
              </p>
              <button
                onClick={onClose}
                className="bg-[#004F54] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                {language === 'fa' ? 'بستن پنجره' : 'Done & Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
              
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'عنوان اثر (انگلیسی):' : 'Project Title (English):'}
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Tabiat Bridge & Cultural Promenade"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'عنوان اثر (فارسی / بومی):' : 'Project Title (Persian / Native):'}
                      </label>
                      <input
                        type="text"
                        value={titleFa}
                        onChange={(e) => setTitleFa(e.target.value)}
                        placeholder="مثال: پل طبیعت و گذر فرهنگی اراضی عباس‌آباد"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'کشور حوزه جاده ابریشم:' : 'Country (Silk Road Node):'}
                      </label>
                      <select
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                        aria-label="Country"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                      >
                        {initialCountries.map(c => (
                          <option key={c.id} value={c.id}>{language === 'fa' ? c.nameFa : c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'شهر و کانون منطقه‌ای:' : 'City / Settlement:'}
                      </label>
                      <select
                        value={cityId}
                        onChange={(e) => setCityId(e.target.value)}
                        aria-label="City"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                      >
                        {initialCities.map(c => (
                          <option key={c.id} value={c.id}>{language === 'fa' ? c.nameFa : c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'معمار یا دفتر طراح:' : 'Architect / Practice:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={architect}
                        onChange={(e) => setArchitect(e.target.value)}
                        placeholder="e.g. Leila Araghian / Diba Tensile"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'گونه‌شناسی بنا (Typology):' : 'Typology:'}
                      </label>
                      <select
                        value={typology}
                        onChange={(e) => setTypology(e.target.value as Typology)}
                        aria-label="Typology"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                      >
                        <option value="cultural_center">Cultural Center & Museum</option>
                        <option value="mosque">Mosque & Sanctuary</option>
                        <option value="madrasa">Madrasa & Academic</option>
                        <option value="caravanserai">Caravanserai & Khan</option>
                        <option value="bazaar">Covered Bazaar & Spine</option>
                        <option value="modern_residential">Modern Residential</option>
                        <option value="civic_center">Civic & Public Space</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'سال تکمیل ساخت:' : 'Year Completed:'}
                      </label>
                      <input
                        type="number"
                        value={yearCompleted}
                        onChange={(e) => setYearCompleted(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      {language === 'fa' ? 'آدرس اینترنتی تصویر شاخص بنا (Hero Image URL):' : 'Hero Image URL:'}
                    </label>
                    <input
                      type="url"
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Tectonics & Materials */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      {language === 'fa' ? 'سیستم سازه‌ای و ساختاری (Structural System):' : 'Structural System:'}
                    </label>
                    <input
                      type="text"
                      value={structuralSystem}
                      onChange={(e) => setStructuralSystem(e.target.value)}
                      placeholder="e.g. 3D Steel Truss with Timber Composite Decking"
                      className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      {language === 'fa' ? 'مصالح سنتی و معاصر به کار رفته:' : 'Materials Palette:'}
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        placeholder="Add material (e.g. Earthen Brick, Ashlar Stone, Steel)"
                        className="flex-1 px-3 py-1.5 bg-white border border-[#ECE9E2] rounded-lg text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddMaterial}
                        className="bg-[#004F54] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{language === 'fa' ? 'افزودن' : 'Add'}</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {materials.map((m, idx) => (
                        <span key={idx} className="bg-[#ECE9E2] text-[#003B40] px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
                          <span>{m}</span>
                          <button type="button" onClick={() => handleRemoveMaterial(m)}>
                            <X className="w-3 h-3 text-[#616866] hover:text-red-600" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'وضعیت ثبت میراث:' : 'Heritage Status:'}
                      </label>
                      <select
                        value={heritageStatus}
                        onChange={(e) => setHeritageStatus(e.target.value as any)}
                        aria-label="Heritage Status"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg text-xs"
                      >
                        <option value="unesco_world_heritage">UNESCO World Heritage</option>
                        <option value="national_heritage">National Heritage Monument</option>
                        <option value="local_significance">Local Heritage Significance</option>
                        <option value="unregistered">Contemporary / Unregistered</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111817] mb-1">
                        {language === 'fa' ? 'دوره تاریخی (Historical Period):' : 'Historical Period:'}
                      </label>
                      <select
                        value={historicalPeriod}
                        onChange={(e) => setHistoricalPeriod(e.target.value as HistoricalPeriod)}
                        aria-label="Historical Period"
                        className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg text-xs"
                      >
                        <option value="contemporary_21st">Contemporary (21st Century)</option>
                        <option value="late_modern">Late Modern (1970-2000)</option>
                        <option value="safavid">Safavid Era (1501-1736)</option>
                        <option value="timurid">Timurid Renaissance (1370-1507)</option>
                        <option value="seljuk">Seljuk Era (1037-1194)</option>
                        <option value="ottoman">Classical Ottoman</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Climate & Concept */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      {language === 'fa' ? 'ایده و کانسپت فضایی (Spatial Concept):' : 'Spatial Concept & Morphology:'}
                    </label>
                    <textarea
                      rows={3}
                      value={spatialConcept}
                      onChange={(e) => setSpatialConcept(e.target.value)}
                      placeholder="Explain the spatial hierarchy, volume orchestrations, and historic contextual dialogue..."
                      className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      {language === 'fa' ? 'استراتژی‌های سازگاری با اقلیم و انرژی:' : 'Passive Climate Strategies:'}
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {['Windcatcher Integration', 'Qanat Hydrology', 'Thermal Massing', 'Double-Shell Shading', 'Courtyard Microclimate'].map((strat) => (
                        <button
                          key={strat}
                          type="button"
                          onClick={() => {
                            if (climateStrategies.includes(strat)) {
                              setClimateStrategies(climateStrategies.filter(s => s !== strat));
                            } else {
                              setClimateStrategies([...climateStrategies, strat]);
                            }
                          }}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                            climateStrategies.includes(strat)
                              ? 'bg-[#004F54] text-white border-[#004F54]'
                              : 'bg-white text-[#616866] border-[#ECE9E2]'
                          }`}
                        >
                          {strat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#111817] mb-1">
                      {language === 'fa' ? 'شرح و معرفی کلی اثر:' : 'Monographic Project Description:'}
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed monograph of the architectural monument..."
                      className="w-full px-3 py-2 bg-white border border-[#ECE9E2] rounded-lg focus:outline-none focus:border-[#004F54]"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-4 border-t border-[#ECE9E2] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#004F54] bg-[#ECE9E2] hover:bg-[#ECE9E2]/80"
                  >
                    {language === 'fa' ? 'گام قبلی' : 'Back'}
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-[#004F54] hover:bg-[#003B40] text-white px-5 py-2.5 rounded-lg text-xs font-bold"
                  >
                    {language === 'fa' ? 'گام بعدی' : 'Next Step'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C8A56A]" />
                    <span>{isSubmitting ? (language === 'fa' ? 'در حال ثبت...' : 'Submitting...') : (language === 'fa' ? 'ثبت نهایی پرونده' : 'Submit Project')}</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

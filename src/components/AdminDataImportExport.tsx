import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  Database, 
  Archive, 
  Building2, 
  MapPin, 
  Users, 
  BookOpen, 
  RefreshCw,
  Eye,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type ImportDataType = 'projects' | 'cities' | 'research' | 'archive' | 'indicators' | 'people';

interface CSVRow {
  [key: string]: string;
}

export const AdminDataImportExport: React.FC = () => {
  const { language } = useLanguage();
  const [importType, setImportType] = useState<ImportDataType>('projects');
  const [csvContent, setCsvContent] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<CSVRow[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [importStatus, setImportStatus] = useState<'idle' | 'preview' | 'success'>('idle');
  const [exportedCategory, setExportedCategory] = useState<string | null>(null);

  // Sample CSV Templates for each category
  const sampleCSVs: Record<ImportDataType, string> = {
    projects: `titleEn,titleFa,country,city,year,typology,materials,architect,coordinates,heritageStatus
Tabriz Grand Bazaar Vaults,طاق‌های بازار بزرگ تبریز,Iran,Tabriz,15th Century,Commercial / Vaulting,Baked Brick / Lime Mortar,Guild Master Builders,"38.0800, 46.2919",UNESCO World Heritage
Gur-e-Amir Mausoleum,آرامگاه گور امیر,Uzbekistan,Samarkand,1404,Mausoleum / Turquoise Dome,Glazed Ceramic / Brick,Muhammad ibn Mahmud Isfahani,"39.6486, 66.9694",State Protected Monument`,
    cities: `nameEn,nameFa,country,latitude,longitude,climateZone,historicFocus,heritageCount
Bukhara,بخارا,Uzbekistan,39.7747,64.4286,Arid Continental,Samanid & Shaybanid Urbanism,140
Herat,هرات,Afghanistan,34.3529,62.2040,Semi-Arid Steppe,Timurid Mudbrick & Minarets,65`,
    research: `titleEn,titleFa,authors,journalVolume,year,doi,category,peerReviewed
Passive Thermal Dynamics in Silk Road Qanats,دینامیک حرارتی غیرفعال در قنات‌های جاده ابریشم,"Dr. Farhad Tehrani, Dr. Gulnara Alimova",Vol 4 Issue 2,2026,10.1016/sradi.2026.04.012,Climate Adaptation,true`,
    archive: `titleEn,titleFa,medium,dateOriginal,creator,collection,copyrightStatus,license
Measured Survey of Si-o-se-pol Piers,نقشه فنی پایه‌های سی‌وسه‌پل,Architectural Drawing (Ink on Vellum),1934,Isfahan Survey Bureau,Historic River Infrastructure,Public Domain,CC0 1.0`,
    indicators: `country,city,indicator,value,unit,year,source,confidenceLevel
Iran,Yazd,Vernacular Windcatcher Thermal Reduction,8.4,°C Temperature Drop,2025,National Institute of Building Sciences,High (Field Tested)
Uzbekistan,Samarkand,Glazed Tile Moisture Penetration Rate,1.2,mm/decade,2026,Central Asian Heritage Conservation Lab,High`,
    people: `nameEn,nameFa,role,country,city,institution,expertise,orcid
Dr. Alisher Narzikulov,دکتر علیشیر نرزیکولوف,Professor / Restorer,Uzbekistan,Tashkent,Tashkent Institute of Architecture,"Timurid Polychrome, Masonry",0000-0002-8812-4019`
  };

  const handleLoadSample = (type: ImportDataType) => {
    setImportType(type);
    setCsvContent(sampleCSVs[type]);
    parseCSV(sampleCSVs[type]);
  };

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n').filter(l => l.trim().length > 0);
    if (lines.length < 2) {
      setValidationErrors(['CSV file must contain at least a header row and one data row.']);
      setParsedRows([]);
      setImportStatus('idle');
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows: CSVRow[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Basic CSV split supporting quoted strings
      const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
      const values: string[] = [];
      let match;
      while ((match = regex.exec(line)) !== null && values.length < headers.length) {
        let val = match[1] || '';
        val = val.replace(/^"|"$/g, '').trim();
        values.push(val);
      }

      const rowObj: CSVRow = {};
      headers.forEach((header, index) => {
        rowObj[header] = values[index] || '';
      });

      // Simple validation rules
      if (!rowObj.titleEn && !rowObj.nameEn && !rowObj.indicator) {
        errors.push(`Row ${i}: Missing primary English title / identifier.`);
      }
      rows.push(rowObj);
    }

    setParsedRows(rows);
    setValidationErrors(errors);
    setImportStatus(errors.length === 0 ? 'preview' : 'idle');
  };

  const handleImportCommit = () => {
    setImportStatus('success');
    setTimeout(() => {
      setImportStatus('idle');
      setCsvContent('');
      setParsedRows([]);
    }, 4000);
  };

  const handleExportData = (categoryName: string, dataString: string) => {
    const blob = new Blob([dataString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sradi_${categoryName.toLowerCase()}_export_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportedCategory(categoryName);
    setTimeout(() => setExportedCategory(null), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Import / Export Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE9E2] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#003B40] flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#004F54]" />
            <span>{language === 'fa' ? 'ورود و صدور دسته‌ای داده‌ها (CSV Batch Data Import & Export)' : 'Batch CSV Data Import & Export Management'}</span>
          </h3>
          <p className="text-xs text-[#616866] mt-1">
            {language === 'fa' 
              ? 'ورود انبوه پروژه‌ها، شهرها، مقالات، اسناد آرشیوی و شاخص‌های رصدخانه همراه با پیش‌نمایش و اعتبارسنجی خودکار قبل از ذخیره‌سازی.'
              : 'Bulk ingestion and verified CSV parsing for architectural monographs, observatory indicators, scholars, and archival metadata with pre-flight schema validation.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Import Engine */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#ECE9E2] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#ECE9E2] pb-3">
            <div className="flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#008D8B]" />
              <h4 className="font-serif font-bold text-base text-[#003B40]">
                {language === 'fa' ? 'ورود دسته‌ای اطلاعات جدید (Batch Import)' : 'Bulk Data Import & Validation'}
              </h4>
            </div>
            <span className="text-xs text-[#616866]">{language === 'fa' ? 'انتخاب دسته‌بندی:' : 'Target Dataset:'}</span>
          </div>

          {/* Category Selectors */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {(['projects', 'cities', 'research', 'archive', 'indicators', 'people'] as ImportDataType[]).map(type => (
              <button
                key={type}
                onClick={() => handleLoadSample(type)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  importType === type 
                    ? 'bg-[#004F54] text-white border-[#004F54] shadow-xs' 
                    : 'bg-[#F7F5F0] text-[#003B40] border-[#ECE9E2] hover:border-[#008D8B]'
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Textarea for CSV */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#616866]">
                {language === 'fa' ? 'متن CSV یا بارگذاری فایل:' : 'CSV Data Payload:'}
              </label>
              <button
                onClick={() => handleLoadSample(importType)}
                className="text-[11px] text-[#008D8B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{language === 'fa' ? 'بارگذاری نمونه ساختار' : 'Load Standard Schema'}</span>
              </button>
            </div>
            <textarea
              value={csvContent}
              onChange={(e) => {
                setCsvContent(e.target.value);
                parseCSV(e.target.value);
              }}
              placeholder="Paste raw CSV content here..."
              rows={6}
              className="w-full p-3.5 rounded-xl border border-[#ECE9E2] font-mono text-xs text-[#111817] bg-[#F7F5F0]/50 focus:outline-hidden focus:border-[#004F54]"
            />
          </div>

          {/* Validation Status / Warnings */}
          {validationErrors.length > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{language === 'fa' ? 'خطاهای اعتبارسنجی ساختار CSV:' : 'CSV Validation Errors:'}</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview Table if Parsed */}
          {parsedRows.length > 0 && validationErrors.length === 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'fa' ? `تعداد ${parsedRows.length} ردیف آماده بارگذاری` : `${parsedRows.length} valid rows parsed`}</span>
                </span>
                <span className="text-[11px] text-[#616866]">Pre-flight Check Passed</span>
              </div>

              <div className="overflow-x-auto border border-[#ECE9E2] rounded-xl max-h-48">
                <table className="w-full text-left rtl:text-right text-[11px]">
                  <thead className="bg-[#ECE9E2] text-[#003B40] font-bold sticky top-0">
                    <tr>
                      {Object.keys(parsedRows[0]).slice(0, 4).map((k) => (
                        <th key={k} className="p-2 border-b border-[#ECE9E2]">{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedRows.map((row, idx) => (
                      <tr key={idx} className="border-b border-[#ECE9E2] hover:bg-[#F7F5F0]">
                        {Object.values(row).slice(0, 4).map((val, vi) => (
                          <td key={vi} className="p-2 truncate max-w-[140px] text-[#111817]">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#616866]">
                  {language === 'fa' ? 'تغییرات بلافاصله در پایگاه داده اعمال خواهد شد.' : 'Database will index newly imported records immediately.'}
                </span>
                <button
                  onClick={handleImportCommit}
                  disabled={importStatus === 'success'}
                  className="px-5 py-2.5 rounded-xl bg-[#004F54] hover:bg-[#003B40] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:bg-emerald-700"
                >
                  {importStatus === 'success' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>{language === 'fa' ? 'با موفقیت وارد شد!' : 'Imported Successfully!'}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 text-[#C8A56A]" />
                      <span>{language === 'fa' ? 'تایید و ذخیره در پایگاه داده' : 'Commit & Ingest Records'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Export Center */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#ECE9E2] shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#ECE9E2] pb-3">
              <Download className="w-5 h-5 text-[#C8A56A]" />
              <h4 className="font-serif font-bold text-base text-[#003B40]">
                {language === 'fa' ? 'مرکز خروجی و صدور داده‌ها (Export Center)' : 'Dataset Export Center'}
              </h4>
            </div>
            <p className="text-xs text-[#616866] leading-relaxed">
              {language === 'fa' 
                ? 'امکان استخراج مستقیم کل رکوردهای موجود به فرمت استاندارد CSV و JSON جهت استفاده در نرم‌افزارهای GIS، متلب و مطالعات دانشگاهی.'
                : 'Download authenticated dataset dumps for external spatial GIS analysis, statistical modeling, and institutional backups.'}
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { name: 'Monographs & Architectural Atlas', key: 'projects', count: '1,420 entries', icon: Building2 },
                { name: 'Observatory Indicators & Telemetry', key: 'indicators', count: '5,890 data points', icon: Database },
                { name: 'Peer-Reviewed Research Articles', key: 'research', count: '348 citations', icon: BookOpen },
                { name: 'Digital Archive Metadata & Provenance', key: 'archive', count: '3,200 drawings', icon: Archive },
                { name: 'Fellowship & Residency Applicants', key: 'applicants', count: '612 records', icon: Users },
              ].map(item => (
                <div key={item.key} className="p-3 rounded-xl bg-[#F7F5F0] border border-[#ECE9E2] flex items-center justify-between hover:border-[#008D8B] transition-colors">
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-4 h-4 text-[#004F54]" />
                    <div>
                      <div className="text-xs font-bold text-[#003B40]">{item.name}</div>
                      <div className="text-[10px] text-[#616866]">{item.count}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleExportData(item.name, sampleCSVs[item.key as ImportDataType] || sampleCSVs.projects)}
                    className="p-1.5 px-3 rounded-lg bg-white hover:bg-[#004F54] hover:text-white text-[#003B40] border border-[#ECE9E2] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {exportedCategory === item.name ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>{exportedCategory === item.name ? (language === 'fa' ? 'دانلود شد' : 'Downloaded') : 'CSV'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECE9E2] text-[11px] text-[#616866] space-y-1">
            <div className="flex items-center gap-1.5 text-[#004F54] font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>{language === 'fa' ? 'دستورالعمل پشتیبان‌گیری پایگاه داده (Backups):' : 'Automated Database Backups:'}</span>
            </div>
            <p>
              {language === 'fa' 
                ? 'پشتیبان‌گیری خودکار روزانه در ساعت ۰۲:۰۰ به وقت گرینویچ در فضای ذخیره‌سازی ابری ایمن انجام شده و نسخه‌های پشتیبان تا ۳۰ روز محفوظ می‌مانند.'
                : 'Point-in-time automated snapshots are executed daily at 02:00 UTC with 30-day retention policies.'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

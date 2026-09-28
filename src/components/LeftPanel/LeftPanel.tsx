import { Briefcase, GraduationCap, Wrench, Heart, Share2, Award, FileText, Save, Loader, FileDown } from 'lucide-react';
import type { CVData } from '../../types/cv';
import { useLanguage } from '../../i18n';
import { LanguageSelector } from '../LanguageSelector';
import { FileSelector } from './FileSelector';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { AccordionSection } from './AccordionSection';
import { SummaryEditor, ExperienceEditor, EducationEditor, SkillsEditor, ActivitiesEditor, HobbiesEditor, SocialEditor } from './SectionEditors';

interface LeftPanelProps {
  files: { name: string; path: string }[];
  activeFile: string;
  data: CVData;
  isDirty: boolean;
  saving: boolean;
  saveSuccess: boolean;
  onSelectFile: (name: string) => void;
  onUpdateData: (data: CVData) => void;
  onSave: () => void;
}

export function LeftPanel({ files, activeFile, data, isDirty, saving, saveSuccess, onSelectFile, onUpdateData, onSave }: LeftPanelProps) {
  const { t } = useLanguage();
  const cv = data.cv;

  const set = (path: string, value: any) => {
    const newData = structuredClone(data);
    const keys = path.split('.');
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onUpdateData(newData);
  };

  const setSection = (section: string, value: any) => {
    const newData = structuredClone(data);
    (newData as any).cv.sections[section] = value;
    onUpdateData(newData);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-800">{t.app.title}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{t.app.subtitle}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <LanguageSelector />
          {saveSuccess && (
            <span className="text-xs text-green-600 font-medium">{t.leftPanel.saved}</span>
          )}
          <a
            href="/api/download-template"
            download
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            title={t.leftPanel.downloadTemplate}
          >
            <FileDown size={14} />
            {t.leftPanel.template}
          </a>
          <button
            onClick={onSave}
            disabled={saving || !isDirty}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !isDirty
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : saving
                  ? 'bg-blue-400 text-white cursor-wait'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? t.leftPanel.saving : t.leftPanel.saveChanges}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <FileSelector files={files} activeFile={activeFile} onSelect={onSelectFile} />

        <ProfilePictureUpload
          photoUrl={cv.photo || ''}
          onPhotoChange={v => set('cv.photo', v)}
        />

        <div className="space-y-2 mb-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{t.leftPanel.fullName}</label>
            <input
              value={cv.name}
              onChange={e => set('cv.name', e.target.value)}
              placeholder={t.placeholders.fullName}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{t.leftPanel.headline}</label>
            <input
              value={cv.headline}
              onChange={e => set('cv.headline', e.target.value)}
              placeholder={t.placeholders.headline}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.leftPanel.location}</label>
              <input
                value={cv.location}
                onChange={e => set('cv.location', e.target.value)}
                placeholder={t.placeholders.location}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.leftPanel.email}</label>
              <input
                value={cv.email}
                onChange={e => set('cv.email', e.target.value)}
                placeholder={t.placeholders.email}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t.leftPanel.phone}</label>
              <input
                value={cv.phone}
                onChange={e => set('cv.phone', e.target.value)}
                placeholder={t.placeholders.phone}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <AccordionSection title={t.leftPanel.sections.summary} icon={<FileText size={16} />}>
          <SummaryEditor
            summaries={cv.sections.summary}
            onChange={v => setSection('summary', v)}
          />
        </AccordionSection>

        <AccordionSection title={t.leftPanel.sections.experience} icon={<Briefcase size={16} />}>
          <ExperienceEditor
            items={cv.sections.experience}
            onChange={v => setSection('experience', v)}
          />
        </AccordionSection>

        <AccordionSection title={t.leftPanel.sections.education} icon={<GraduationCap size={16} />}>
          <EducationEditor
            items={cv.sections.education}
            onChange={v => setSection('education', v)}
          />
        </AccordionSection>

        <AccordionSection title={t.leftPanel.sections.skills} icon={<Wrench size={16} />}>
          <SkillsEditor
            items={cv.sections.skills}
            onChange={v => setSection('skills', v)}
          />
        </AccordionSection>

        <AccordionSection title={t.leftPanel.sections.activities} icon={<Award size={16} />} defaultOpen={false}>
          <ActivitiesEditor
            items={cv.sections.extra_curricular_activities}
            onChange={v => setSection('extra_curricular_activities', v)}
          />
        </AccordionSection>

        <AccordionSection title={t.leftPanel.sections.hobbies} icon={<Heart size={16} />} defaultOpen={false}>
          <HobbiesEditor
            items={cv.sections.hobbies}
            onChange={v => setSection('hobbies', v)}
          />
        </AccordionSection>

        <AccordionSection title={t.leftPanel.sections.socialNetworks} icon={<Share2 size={16} />} defaultOpen={false}>
          <SocialEditor
            items={cv.social_networks}
            onChange={v => set('cv.social_networks', v)}
          />
        </AccordionSection>
      </div>
    </div>
  );
}

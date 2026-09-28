import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '../i18n';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="flex items-center gap-1.5">
      <Globe size={14} className="text-gray-500" />
      <select
        value={language}
        onChange={handleChange}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        aria-label={t.leftPanel.selectLanguage}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}

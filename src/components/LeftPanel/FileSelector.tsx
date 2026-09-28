import { Files, Plus } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface FileSelectorProps {
  files: { name: string; path: string }[];
  activeFile: string;
  onSelect: (name: string) => void;
}

export function FileSelector({ files, activeFile, onSelect }: FileSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
        <Files size={16} />
        {t.leftPanel.cvFile}
      </label>
      <div className="flex gap-2">
        <select
          value={activeFile}
          onChange={e => onSelect(e.target.value)}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        >
          {files.map(f => (
            <option key={f.name} value={f.name}>{f.name}</option>
          ))}
        </select>
        <button
          className="rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          title={t.leftPanel.addNewCV}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}

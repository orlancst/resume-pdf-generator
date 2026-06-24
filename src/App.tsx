import { useCVData } from './hooks/useCVData';
import { LeftPanel } from './components/LeftPanel/LeftPanel';
import { Preview } from './components/RightPanel/Preview';

export default function App() {
  const {
    files, activeFile, data, loading, saving, error, saveSuccess, isDirty,
    updateLocalData, saveToFile, switchFile,
  } = useCVData();

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 text-sm font-medium">Error</p>
          <p className="text-gray-500 text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <div className="w-[45%] min-w-[400px] max-w-[500px]">
        {data && (
          <LeftPanel
            files={files}
            activeFile={activeFile}
            data={data}
            isDirty={isDirty}
            saving={saving}
            saveSuccess={saveSuccess}
            onSelectFile={switchFile}
            onUpdateData={updateLocalData}
            onSave={saveToFile}
          />
        )}
      </div>
      <div className="flex-1">
        <Preview data={data} loading={loading} />
      </div>
    </div>
  );
}

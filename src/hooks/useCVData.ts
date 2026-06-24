import { useState, useEffect, useCallback } from 'react';
import { fetchCVFiles, fetchCVData, saveCVData } from '../api/cvApi';
import type { CVData } from '../types/cv';

export function useCVData() {
  const [files, setFiles] = useState<{ name: string; path: string }[]>([]);
  const [activeFile, setActiveFile] = useState<string>('');
  const [data, setData] = useState<CVData | null>(null);
  const [savedData, setSavedData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const isDirty = data !== null && savedData !== null && JSON.stringify(data) !== JSON.stringify(savedData);

  const loadFiles = useCallback(async () => {
    try {
      const f = await fetchCVFiles();
      setFiles(f);
      if (f.length > 0 && !activeFile) {
        setActiveFile(f[0].name);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const loadData = useCallback(async (filename: string) => {
    if (!filename) return;
    setLoading(true);
    try {
      const d = await fetchCVData(filename);
      setData(d);
      setSavedData(structuredClone(d));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  useEffect(() => {
    if (activeFile) {
      loadData(activeFile);
    }
  }, [activeFile, loadData]);

  const updateLocalData = useCallback((newData: CVData) => {
    setData(newData);
  }, []);

  const saveToFile = useCallback(async () => {
    if (!activeFile || !data) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      await saveCVData(activeFile, data);
      setSavedData(structuredClone(data));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [activeFile, data]);

  const switchFile = useCallback((filename: string) => {
    setActiveFile(filename);
  }, []);

  return {
    files, activeFile, data, loading, saving, error, saveSuccess, isDirty,
    updateLocalData, saveToFile, switchFile, loadFiles,
  };
}

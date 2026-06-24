const BASE = '/api';

export async function fetchCVFiles(): Promise<{ name: string; path: string }[]> {
  const res = await fetch(`${BASE}/cv-files`);
  if (!res.ok) throw new Error('Failed to fetch CV files');
  return res.json();
}

export async function fetchCVData(filename: string): Promise<any> {
  const res = await fetch(`${BASE}/cv-files/${encodeURIComponent(filename)}`);
  if (!res.ok) throw new Error('Failed to fetch CV data');
  return res.json();
}

export async function saveCVData(filename: string, data: any): Promise<void> {
  const res = await fetch(`${BASE}/cv-files/${encodeURIComponent(filename)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save CV data');
}

export async function uploadPhoto(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('photo', file);
  const res = await fetch(`${BASE}/upload-photo`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload photo');
  return res.json();
}

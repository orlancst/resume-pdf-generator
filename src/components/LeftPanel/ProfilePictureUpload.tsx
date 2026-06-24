import { useRef } from 'react';
import { Camera, Trash2 } from 'lucide-react';
import { uploadPhoto } from '../../api/cvApi';

interface ProfilePictureUploadProps {
  photoUrl: string;
  onPhotoChange: (url: string) => void;
}

export function ProfilePictureUpload({ photoUrl, onPhotoChange }: ProfilePictureUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadPhoto(file);
      onPhotoChange(result.url);
    } catch {
      const reader = new FileReader();
      reader.onload = () => onPhotoChange(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex-shrink-0">
        {photoUrl ? (
          <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Camera size={24} />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 transition-colors"
        >
          Upload Photo
        </button>
        {photoUrl && (
          <button
            onClick={() => onPhotoChange('')}
            className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
}

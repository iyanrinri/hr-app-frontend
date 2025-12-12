import React, { useRef, useState } from 'react';
import { User, Camera, Trash2, Loader2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';

interface ProfilePictureUploadProps {
  currentImageUrl?: string | null;
  altText: string;
  onUpload: (file: File) => Promise<unknown>;
  onDelete: () => Promise<unknown>;
  isUploading: boolean;
  isDeleting?: boolean;
  canEdit?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  currentImageUrl,
  altText,
  onUpload,
  onDelete,
  isUploading,
  isDeleting = false,
  canEdit = true,
  size = 'xl'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    // Validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, and GIF files are allowed');
      return;
    }

    try {
      await onUpload(file);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove your profile picture?')) return;
    try {
      await onDelete();
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (canEdit) {
        await handleUpload(file);
      }
    }
  };

  const triggerFileInput = () => {
    if (canEdit && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className={cn(
          "relative group rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center transition-all",
          sizeClasses[size],
          canEdit && "cursor-pointer hover:ring-4 hover:ring-brand-navy/20",
          dragActive && "ring-4 ring-brand-cyan scale-105"
        )}
        onDragEnter={canEdit ? handleDrag : undefined}
        onDragLeave={canEdit ? handleDrag : undefined}
        onDragOver={canEdit ? handleDrag : undefined}
        onDrop={canEdit ? handleDrop : undefined}
        onClick={triggerFileInput}
      >
        {isUploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          canEdit && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Camera className="w-8 h-8 text-white mb-1" />
              <span className="text-xs text-white font-medium">Change Photo</span>
            </div>
          )
        )}

        {currentImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={currentImageUrl} 
            alt={altText} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <User className="w-1/2 h-1/2" />
          </div>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          disabled={isUploading || !canEdit}
        />
      </div>

      {canEdit && (
        <div className="flex gap-2">
           <Button 
            variant="secondary" 
            onClick={triggerFileInput}
            disabled={isUploading}
            className="text-xs h-8 px-3"
          >
            <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
            Upload
          </Button>

          {currentImageUrl && (
            <Button 
              variant="secondary" 
              onClick={handleDelete}
              disabled={isUploading || isDeleting}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-8 px-3"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Remove
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

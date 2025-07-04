
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Video, X, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaUploadProps {
  onMediaAdd: (media: { type: 'image' | 'video' | 'file'; url: string; name: string }) => void;
  onMediaRemove: (index: number) => void;
  media: { type: 'image' | 'video' | 'file'; url: string; name: string }[];
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaAdd, onMediaRemove, media }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = URL.createObjectURL(file);
        let type: 'image' | 'video' | 'file' = 'file';
        
        if (file.type.startsWith('image/')) {
          type = 'image';
        } else if (file.type.startsWith('video/')) {
          type = 'video';
        }

        onMediaAdd({ type, url, name: file.name });
      }
      toast({
        title: "Files uploaded",
        description: "Your files have been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Image className="h-4 w-4 mr-1" />
          {uploading ? 'Uploading...' : 'Add Photo'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Video className="h-4 w-4 mr-1" />
          Video
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="h-4 w-4 mr-1" />
          File
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,*/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {media.map((item, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : item.type === 'video' ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-xs text-gray-600 mt-1 truncate max-w-full px-2">
                      {item.name}
                    </span>
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onMediaRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;

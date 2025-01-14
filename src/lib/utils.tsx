import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import IconAudio from '@/components/icons/files-type/icon-audio';
import IconCode from '@/components/icons/files-type/icon-code';
import IconImage from '@/components/icons/files-type/icon-img';
import IconPdf from '@/components/icons/files-type/icon-pdf';
import IconText from '@/components/icons/files-type/icon-text';
import IconVideo from '@/components/icons/files-type/icon-video';
import IconZip from '@/components/icons/files-type/icon-zip';
import { JSX } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterFiles(files: File[], existingFiles: File[]): {
  newFiles: File[],
  duplicates: string[]
} {
  const existingFileNames = new Set(existingFiles.map(file => file.name));
  const result = files.reduce((acc, newFile) => {
    if (existingFileNames.has(newFile.name)) {
      acc.duplicates.push(newFile.name);
    } else {
      acc.newFiles.push(newFile);
    }
    return acc;
  }, { newFiles: [] as File[], duplicates: [] as string[] });

  return { newFiles: result.newFiles, duplicates: result.duplicates }
}

export function formateFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function getFileCategory(type: string, fileName: string): string {
  const lowerType = type.toLowerCase();
  const lowerFileName = fileName.toLowerCase();

  // First check MIME types
  if (lowerType.includes('audio/')) return 'audio';
  if (lowerType.includes('image/')) return 'image';
  if (lowerType.includes('video/')) return 'video';
  if (lowerType.includes('application/pdf')) return 'pdf';
  if (lowerType.includes('application/zip') || lowerType.includes('application/x-compressed')) return 'archive';
  if (lowerType.includes('application/json')) return 'code';

  // Then check file extensions
  if (/\.(mp3|wav|ogg|m4a)$/.test(lowerFileName)) return 'audio';
  if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(lowerFileName)) return 'image';
  if (/\.(mp4|avi|mov|wmv|flv|mkv)$/.test(lowerFileName)) return 'video';
  if (/\.pdf$/.test(lowerFileName)) return 'pdf';
  if (/\.(zip|rar|7z|tar|gz)$/.test(lowerFileName)) return 'archive';
  if (/\.(js|ts|jsx|tsx|py|java|cpp|c|cs|php|rb|go|rust|swift|json)$/.test(lowerFileName)) return 'code';
  if (/\.(txt|rtf|md|log)$/.test(lowerFileName)) return 'text';

  // Check for config and special files
  if (lowerFileName.includes('config') || 
      lowerFileName.includes('.json') || 
      lowerFileName === '.gitignore' || 
      /\.(yaml|yml|xml|toml)$/.test(lowerFileName)) {
    return 'code';
  }

  // For files with no extension or unknown types
  if (!lowerFileName.includes('.')) return 'text';

  // Default fallback
  return 'text';
}

export function getIcon(fileType: string, fileName: string = ''): JSX.Element {
  const category = getFileCategory(fileType, fileName);
  
  switch (category) {
    case 'audio':
      return <IconAudio className="size-4" />;
    case 'image':
      return <IconImage className="size-4" />;
    case 'video':
      return <IconVideo className="size-4" />;
    case 'pdf':
      return <IconPdf className="size-4" />;
    case 'archive':
      return <IconZip className="size-4" />;
    case 'code':
      return <IconCode className="size-4" />;
    case 'text':
    default:
      return <IconText className="size-4" />;
  }
}


export function getTotalFileSize(files:File[]){
    const totalFileSize = files.reduce((acc,com)=>{
          return acc + com.size
    },0)
    return formateFileSize(totalFileSize)
}
import IconAudio from '@/components/icons/files-type/icon-audio';
import IconCode from '@/components/icons/files-type/icon-code';
import IconImage from '@/components/icons/files-type/icon-img';
import IconPdf from '@/components/icons/files-type/icon-pdf';
import IconText from '@/components/icons/files-type/icon-text';
import IconVideo from '@/components/icons/files-type/icon-video';
import IconZip from '@/components/icons/files-type/icon-zip';
import { IFormattedFileSize, IReshapedFileDetails } from "@/types/transfer";
import { clsx, type ClassValue } from "clsx";
import JSZip from "jszip";
import mime from "mime-types";
import { JSX } from 'react';
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB'] as const;

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


export function formatFileSize(bytes: number): IFormattedFileSize {
  if (bytes === 0) return { size: 0, abbreviation: 'B' };
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
  return { size, abbreviation: FILE_SIZE_UNITS[i] };
}

export function getUploadPercentage(total: number, loaded: number): number {
  if (total <= 0 || loaded <= 0) return 0;
  return Math.min(Math.round((loaded / total) * 100), 100);
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

export function getIcon(fileType: string, fileName: string = '',className?:string): JSX.Element {
  const category = getFileCategory(fileType, fileName);

  switch (category) {
    case 'audio':
      return <IconAudio className={cn("size-4",className)} />;
    case 'image':
      return <IconImage className={cn("size-4",className)} />;
    case 'video':
      return <IconVideo className={cn("size-4",className)} />;
    case 'pdf':
      return <IconPdf className={cn("size-4",className)} />;
    case 'archive':
      return <IconZip className={cn("size-4",className)} />;
    case 'code':
      return <IconCode className={cn("size-4",className)} />;
    case 'text':
    default:
      return <IconText className={cn("size-4",className)} />;
  }
}

export function getTotalFileSize(files: File[]) {
  const totalFileSize = files.reduce((acc, com) => {
    return acc + com.size
  }, 0)
  return formatFileSize(totalFileSize)
}


export const inZip = async (files: File[]): Promise<{ zipBlob: Blob, size: number, type: string } | null> => {
  try {
    const zip = new JSZip();
    await Promise.all(files.map(async (file) => {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-\s]/g, '_');
      const arrayBuffer = await file.arrayBuffer();
      zip.file(sanitizedName, arrayBuffer, { binary: true });
    }));
    const zipBlob = await zip.generateAsync({ 
      type: "blob"
    });
    return {
      zipBlob,
      size: zipBlob.size,
      type: "application/zip"
    };
  } catch (error) {
    console.error('Error creating ZIP:', error);
    return null;
  }
};

export const getFileDetails = async (files: File[]): Promise<IReshapedFileDetails | null> => {
  try {
    if (!files?.length) return null;

    if (files.length > 1) {
      const zipResult = await inZip(files);
      if (!zipResult) return null;
      
      const { size, type, zipBlob } = zipResult;
      const extension = mime.extension(type);
      if (!extension) return null;
      return {
        file_type:type,
        file_size:size,
        file_blob: zipBlob,
        file_storage_key: uuidv4(),
        total_files: files.length,
        file_extension:extension,
        transfer_display_name: `multiple_files_${files.length}`,
      };
    }

    const file = files[0];
    const extension = mime.extension(file.type);
    if (!extension) return null;

    return {
      file_type: file.type,
      file_size: file.size,
      file_blob: file,
      total_files: files.length,
      file_storage_key: uuidv4(),
      file_extension:extension,
      transfer_display_name: file.name 
    };
  } catch (error) {
    console.error('Error processing files:', error);
    return null;
  }
};

export interface IFileDownloadDetails {
  file_storage_key: string;
  file_type: string;
  file_extension: string;
  total_files: number;
  transfer_display_name?: string;
}

export const generateDownloadFileName = (fileDetails: IFileDownloadDetails): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  // For multiple files (zip)
  if (fileDetails.total_files > 1) {
      return `files_${timestamp}.${fileDetails.file_extension}`;
  }
  // For single file
  const baseName = fileDetails.transfer_display_name || `file_${timestamp}`;
  // Remove any existing extension from the original name
  const nameWithoutExt = baseName.replace(/\.[^/.]+$/, '');
  // Create final name with proper extension
  return `${nameWithoutExt}.${fileDetails.file_extension}`;
};

export const generateDownloadUrl = (id:string)=>{
    return `${process.env.NEXT_PUBLIC_TRANSFER_URL_BASE}/${id}`
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileTypeFromMime(mimeType: string): string {
  if (!mimeType) return 'unknown';

  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('text/')) return 'document';
  if (mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('sheet')) return 'document';

  return 'unknown';
}
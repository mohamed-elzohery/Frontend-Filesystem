/**
 * Validates file size against the maximum allowed size from environment variable
 * @param fileSize - The size of the file in bytes
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateFileSize(fileSize: number): {
  isValid: boolean;
  errorMessage?: string;
} {
  const maxSizeInBytes = process.env.NEXT_PUBLIC_MAX_FILE_SIZE
    ? parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE, 10)
    : 5 * 1024 * 1024; // Default to 5MB if not set

  if (fileSize > maxSizeInBytes) {
    return {
      isValid: false,
      errorMessage: `File size exceeds the maximum limit of ${(
        maxSizeInBytes /
        (1024 * 1024)
      ).toFixed(0)}MB. Current file size: ${(fileSize / (1024 * 1024)).toFixed(
        0
      )}MB`,
    };
  }

  return {
    isValid: true,
  };
}

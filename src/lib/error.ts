import { toast } from "@/lib/hooks/use-toast";
import { ErrorHandlerOptions, SanitizedError, ZSAErrorType } from "@/types/error";
import { ERROR_CODES } from "./constants";

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Sanitizes ZSA errors into a consistent format
 * @param error - The ZSA error object to sanitize
 * @returns A sanitized error object with consistent structure
 */
export const sanitizeZSAError = (error: ZSAErrorType): SanitizedError => {
  // Handle input parsing errors
  if (error.code === ERROR_CODES.INPUT_PARSE_ERROR) {
    const messages: string[] = [];

    // Collect field-specific errors
    if (error.fieldErrors) {
      Object.entries(error.fieldErrors).forEach(([_, errors]) => {
        messages.push(...errors);
      });
    }

    // Collect form-level errors
    if (error.formErrors?.length) {
      messages.push(...error.formErrors);
    }

    return {
      code: error.code,
      name: error.name,
      message: messages.length ? messages.join(', ') : 'Invalid input provided'
    };
  }

  // Handle all other error types
  return {
    code: error.code,
    name: error.name,
    message: error.message || 'An unexpected error occurred'
  };
};

/**
 * Handles errors consistently across the application
 * Sanitizes error messages and displays them via toast notifications
 * 
 * @param error - The error object to handle
 * @param options - Configuration object for error handling
 * @param options.title - Title for the error toast
 * @param options.fallbackMessage - Fallback message if error message is unavailable
 * @param options.resetFunction - Optional function to call after error handling (e.g., reset form state)
 */
export const handleActionError = (
  error: ZSAErrorType, 
  { 
    title, 
    fallbackMessage, 
    resetFunction 
  }: ErrorHandlerOptions
): void => {
  const sanitizedError = sanitizeZSAError(error);
  
  toast({
    title,
    description: sanitizedError.message || fallbackMessage,
    variant: "destructive"
  });

  if (resetFunction) {
    resetFunction();
  }
};
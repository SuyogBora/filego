
// Types
export type ZSAErrorType = {
  code: string;
  message: string;
  name: string;
  data?: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export type SanitizedError = {
  code: string;
  message: string;
  name: string;
};

export type ErrorHandlerOptions = {
  title: string;
  fallbackMessage: string;
  resetFunction?: () => void;
};

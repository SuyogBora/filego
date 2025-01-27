export const TransferMode = {
    MANUAL_SEND: 'MANUAL_SEND',
    EMAIL_SEND: 'EMAIL_SEND'
} as const;

export const UploadStage = {
    PREPARATION: 'PREPARATION',
    PROGRESS: 'PROGRESS',
    COMPLETE: 'COMPLETE'
} as const;

export const SALT_ROUND = 10

export type TransferModeType = typeof TransferMode[keyof typeof TransferMode];
export type UploadStageType = typeof UploadStage[keyof typeof UploadStage];

export const DEFAULT_COLORS = [
    "#000000", // Classic black - default
    "#2563EB", // Ocean blue - fresh
    "#F43F5E", // Coral - vibrant
    "#0D9488", // Teal - modern
    "#4F46E5", // Indigo - bold
    "#059669", // Emerald - energetic
] as const;

// Type for color values
export type QRCodeColor = typeof DEFAULT_COLORS[number];


export const ERROR_CODES = {
    INPUT_PARSE_ERROR: "INPUT_PARSE_ERROR",
    OUTPUT_PARSE_ERROR: "OUTPUT_PARSE_ERROR",
    ERROR: "ERROR",
    NOT_AUTHORIZED: "NOT_AUTHORIZED",
    TIMEOUT: "TIMEOUT",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT",
    PRECONDITION_FAILED: "PRECONDITION_FAILED",
    PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
    METHOD_NOT_SUPPORTED: "METHOD_NOT_SUPPORTED",
    UNPROCESSABLE_CONTENT: "UNPROCESSABLE_CONTENT",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    CLIENT_CLOSED_REQUEST: "CLIENT_CLOSED_REQUEST",
    INSUFFICIENT_CREDITS: "INSUFFICIENT_CREDITS",
    PAYMENT_REQUIRED: "PAYMENT_REQUIRED",
  } as const
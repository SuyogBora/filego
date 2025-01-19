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
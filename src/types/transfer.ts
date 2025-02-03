import { TransferModeType } from "@/lib/constants";
import { AddTransferLogSchema, TransferFormSchema } from "@/lib/schema-validations/transfer";
import { Prisma, Transfer } from "@prisma/client";
import { z } from "zod";

export type TransferFormValue= z.infer<typeof TransferFormSchema>
export type AddTransferLogValue= z.infer<typeof AddTransferLogSchema>

export interface ITransferInfo {
  file_is_password_enabled: boolean;
  transfer_mode: TransferModeType;
  transfer_title: string;
  file_password?: string;
  recipient_email?: string;
  transfer_message?: string;
  file_extension: string;
  file_storage_key: string;
  file_size: number;
  file_type: string;
  total_files: number;
  expiration_date: Date;
  max_downloads?: number;
  transfer_start_time: Date,
  transfer_url?:string,
  transfer_display_name: string;
}

export interface IReshapedFileDetails {
  file_type: string;
  file_size: number;
  file_blob: Blob;
  file_storage_key: string;
  total_files: number;
  file_extension: string;
  transfer_display_name: string;
}

export type FileSizeUnit = 'B' | 'KB' | 'MB' | 'GB';
export type FileType = 'byte' | 'kilobyte' | 'megabyte' | 'gigabyte';

export interface IFormattedFileSize {
  size: number;
  abbreviation: 'B' | 'KB' | 'MB' | 'GB';
}

export function getTransferLogDataSelect() {
  return {
    id: true,
    expiration_date:true,
    file_extension:true,
    file_is_password_enabled:true,
    file_size:true,
    file_type:true,
    total_files:true,
    transfer_message:true,
    file_storage_key:true,
    max_downloads:true,
    transfer_title:true,
    user:{
      select:{
        id:true,
        name:true,
        email:true
      }
    }
  } satisfies Prisma.TransferSelect;
}



// Define a type for each action separately
export interface DeleteAction {
    type: 'delete';
    values: { transferId: string;};
}

export interface QrAction {
    type: 'qr';
    values: { transferId: string; transfer: Transfer };
}

export interface DetailsAction {
    type: 'details';
    values: { transfer: Transfer };
}

export interface AnalyticsAction {
    type: 'analytics';
    values: { transferId: string; transfer: Transfer; data?: any };
}

export interface CopyAction {
    type: 'copy';
    values: { url: string; transfer: Transfer };
}

// Union type of all actions
export type TransferAction = DeleteAction | QrAction | DetailsAction | AnalyticsAction | CopyAction;
export type DialogType = TransferAction['type'];

// Type for the action handler
export type ActionHandler = (action: TransferAction) => void;



export interface QueryParams {
  page: number
  limit: number
  q?: string,
  mode?: string[] | []
  dateFrom: Date | null
  dateTo: Date | null
  // sortBy: string
  // sortOrder: "asc" | "desc"
}

export interface ResponseMeta {
  total: number
  totalPages: number
  currentPage: number
  perPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface TransferResponse {
  data: any[] // Replace 'any' with your Transfer type
  meta: ResponseMeta
}

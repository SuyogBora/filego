import { prisma } from "@/lib/prisma";
import { QueryParams, TransferResponse } from "@/types/transfer";
import { Transfer, TransferMode, type Transfer as ITransfer } from "@prisma/client";
import { unstable_cache } from 'next/cache';
import { omit } from "radash";
import { stringToArray } from "../utils";

type SortOrder = "asc" | "desc"


export const getAllTransfers = unstable_cache(
  async (userId: string, params: QueryParams): Promise<TransferResponse> => {
    try {
      const filter: any = { user_id: userId }
      if (params.q) {
        filter.OR = [
          { transfer_title: { contains: params.q, mode: "insensitive" } },
          { transfer_display_name: { contains: params.q, mode: "insensitive" } },
          { recipient_email: { contains: params.q, mode: "insensitive" } },
        ]
      }

      if (params.dateFrom || params.dateTo) {
        filter.created_at = {
          ...(params.dateFrom && { gte: new Date(params.dateFrom) }),
          ...(params.dateTo && { lte: new Date(params.dateTo) }),
        }
      }

      if (params.mode && params.mode.length > 0) {
        const arrayOfModes = params.mode.filter((mode): mode is TransferMode =>
          Object.values(TransferMode).includes(mode as TransferMode)
        )
        if (arrayOfModes.length > 0) {
          filter.transfer_mode = {
            in: arrayOfModes,
          }
        }
      }

      const skip = (params.page - 1) * params.limit

      const [totalCount, transferLogs] = await Promise.all([
        prisma.transfer.count({ where: filter }),
        prisma.transfer.findMany({
          where: filter,
          // orderBy: {
          //   [params.sortBy]: params.sortOrder,
          // },
          skip,
          take: params.limit,
        }),
      ])

      const totalPages = Math.ceil(totalCount / params.limit)

      const meta = {
        total: totalCount,
        totalPages,
        currentPage: params.page,
        perPage: params.limit,
        hasNextPage: params.page < totalPages,
        hasPreviousPage: params.page > 1,
      }

      return {
        data: transferLogs,
        meta,
      }
    } catch (error) {
      console.error("Error fetching transfer logs:", error)
      throw new Error("Failed to fetch transfer logs")
    }
  },
  ["transfers"],
  {
    revalidate: 60,
    tags: ["transfers"],
  },
)

export const getTransfersMetrics = unstable_cache(
  async (userId: string) => {
    const currentDate = new Date()
    let transferMetrics = await prisma.transferMetrics.findFirst({
      where: { user_id: userId },
    })
    if (!transferMetrics) {
      transferMetrics = await prisma.transferMetrics.create({
        data: {
          user_id: userId,
          last_transfer_date: currentDate,
          total_transfers_size: BigInt(0),
          total_transfers_count: 0,
          active_transfers_count: 0,
          expired_transfers_count: 0,
        },
      })
    }
    const serializedMetrics = {
      ...transferMetrics,
      total_transfers_size: transferMetrics.total_transfers_size.toString(),
    }
    return serializedMetrics
  },
  ['transfer-metrics'],
  {
    revalidate: 60, tags: ['transfer-metrics']
  }
)
type SanitizedTransfer = Omit<ITransfer, 'file_password' | 'file_storage_key'> & {
  file_password?: string;
  file_storage_key?: string;
};

export const getTransferLog = async (transfer_id: string) => {
  const dbTransferLog = await prisma.transfer.findFirst({
    where: {
      id: transfer_id,
    },
  });

  if (!dbTransferLog) {
    return null
  }
  const fieldsToOmit: (keyof Transfer)[] = dbTransferLog.file_is_password_enabled
    ? ['file_password', 'file_storage_key']
    : ['file_password'];

  const sanitizedDownloadData = omit(dbTransferLog, fieldsToOmit) as SanitizedTransfer;
  return sanitizedDownloadData
}
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { TransferMode } from "@prisma/client";

// Define types for query parameters
type SortOrder = 'asc' | 'desc';

interface QueryParams {
    page: number;
    limit: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    transferMode?: TransferMode;
    sortBy: string;
    sortOrder: SortOrder;
}

function parseQueryParams(searchParams: URLSearchParams): QueryParams {
    return {
        page: Math.max(1, Number(searchParams.get('page')) || 1),
        limit: Math.max(1, Math.min(100, Number(searchParams.get('limit')) || 10)),
        search: searchParams.get('search') || undefined,
        startDate: searchParams.get('startDate') || undefined,
        endDate: searchParams.get('endDate') || undefined,
        transferMode: (searchParams.get('transferMode') as TransferMode) || undefined,
        sortBy: searchParams.get('sortBy') || 'created_at',
        sortOrder: (searchParams.get('sortOrder') as SortOrder) || 'desc'
    };
}

export async function GET(request: NextRequest) {
    try {
        // Get URL search params and parse them with defaults
        const query = parseQueryParams(request.nextUrl.searchParams);

        // Build where clause
        const where: any = {
            user_id: '6795d4dadc04b42a9edc93b4',
        };

        // Add search condition
        if (query.search) {
            where.OR = [
                { transfer_title: { contains: query.search, mode: 'insensitive' } },
                { transfer_display_name: { contains: query.search, mode: 'insensitive' } },
                { recipient_email: { contains: query.search, mode: 'insensitive' } }
            ];
        }

        // Add date range condition
        if (query.startDate || query.endDate) {
            where.created_at = {
                ...(query.startDate && { gte: new Date(query.startDate) }),
                ...(query.endDate && { lte: new Date(query.endDate) })
            };
        }

        // Add transfer mode filter
        if (query.transferMode) {
            where.transfer_mode = query.transferMode;
        }

        // Calculate pagination
        const skip = (query.page - 1) * query.limit;

        // Get total count for pagination
        const totalCount = await prisma.transfer.count({ where });
        const totalPages = Math.ceil(totalCount / query.limit);

        // Fetch transfers with filters, sorting, and pagination
        const transferLogs = await prisma.transfer.findMany({
            where,
            orderBy: {
                [query.sortBy]: query.sortOrder
            },
            skip,
            take: query.limit,
            select: {
                id: true,
                user_id: true,
                transfer_title: true,
                transfer_display_name: true,
                transfer_message: true,
                transfer_mode: true,
                file_size: true,
                file_type: true,
                file_is_password_enabled: true,
                file_extension: true,
                recipient_email: true,
                total_files: true,
                max_downloads: true,
                expiration_date: true,
                created_at: true,
                updated_at: true,
                download_analytics: true
            }
        });

        // Prepare pagination metadata
        const meta = {
            total: totalCount,
            totalPages,
            currentPage: query.page,
            perPage: query.limit,
            hasNextPage: query.page < totalPages,
            hasPreviousPage: query.page > 1
        };

        return Response.json({
            message: "Transfer logs retrieved successfully",
            data: transferLogs,
            meta
        }, {
            status: 200
        });

    } catch (error) {
        console.error('Error fetching transfer logs:', error);
        return Response.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        }, {
            status: 500
        });
    }
}
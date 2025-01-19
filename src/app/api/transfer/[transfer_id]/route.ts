import { prisma } from "@/lib/prisma";
import { omit } from 'radash';
import { Transfer } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ transfer_id: string }> }
) {
  const transfer_id = (await params).transfer_id;
  try {
    const dbTransferLog = await prisma?.transfer.findFirst({
      where: {
        id: transfer_id,
      }
    });

    if (!dbTransferLog) {
      return Response.json(null, {
        status: 404
      });
    }
    const fieldsToOmit: (keyof Transfer)[] = dbTransferLog.file_is_password_enabled 
      ? ['file_password', 'file_storage_key']
      : ['file_password'];
    const sanitizedResponse = omit(dbTransferLog, fieldsToOmit);
    return Response.json(sanitizedResponse, {
      status: 200
    });
  } catch (error) {
    console.error('Error fetching transfer:', error);
    return Response.json('Something Went Wrong', {
      status: 400
    });
  }
}
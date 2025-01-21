import { prisma } from "@/lib/prisma";
import { Transfer } from '@prisma/client';
import { omit } from 'radash';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ transfer_id: string }> }
) {
  const transfer_id = (await params).transfer_id;
  try {
    const dbTransferLog = await prisma.transfer.findFirst({
      where: {
        id: transfer_id,
      }
    });

    if (!dbTransferLog) {
      return Response.json(null, {
        status: 200
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
    return Response.json('Internal Server Error', {
      status: 400
    });
  }
}
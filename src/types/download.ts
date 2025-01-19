import { VerifyPasswordFormSchema } from "@/lib/schema-validations/download";
import { z } from "zod";

export type VerifyPasswordFormValue= z.infer<typeof VerifyPasswordFormSchema>



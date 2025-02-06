import { z } from "zod";

export const MessageSenderTypeSchema = z.enum(["SYSTEM", "USER"]);
export type MessageSenderType = z.infer<typeof MessageSenderTypeSchema>;

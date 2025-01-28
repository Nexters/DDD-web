import { TarotCardIdType } from "@/tarot/models/tarotCardId";
import { MessageCategory } from "./messageCategory";
import { MessageSenderType } from "./messageSender";

export type MessageType = {
  messageId: number;
  type: MessageCategory;
  sender: MessageSenderType;
  answers: string[];
  tarotName?: TarotCardIdType;
  tarotResultId?: number;
  loading?: boolean;
};

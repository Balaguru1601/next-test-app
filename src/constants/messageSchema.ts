import { z } from "zod";

export const SendMessageSchema = z.object({
	message: z.string(),
	chatId: z.string(),
	senderId: z.number(),
	receiverId: z.number(),
});

export const MessageSchema = z.object({
	id: z.string(),
	sentAt: z.date(),
	message: z.string(),
	chatId: z.string(),
	senderId: z.number(),
	recipientId: z.number(),
	viewed: z.boolean(),
	receivedAt: z.date().nullable().default(null),
});

export type Message = z.TypeOf<typeof MessageSchema>;

let t: Message;

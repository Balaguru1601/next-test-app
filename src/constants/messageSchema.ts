import { z } from "zod";

export const SendMessageSchema = z.object({
	message: z.string(),
	chatId: z.string().optional(),
	senderId: z.number(),
	receiverId: z.number(),
});

export const MessageSchema = z.object({
	id: z.string(),
	sentAt: z.date(),
	message: z.string(),
	chatId: z.string(),
	senderId: z.number(),
	receiverId: z.number(),
	viewed: z.boolean().default(false),
	receivetAt: z.date().optional(),
});

export type Message = z.TypeOf<typeof MessageSchema>;

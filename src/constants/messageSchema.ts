import { z } from "zod";

export const SendMessageSchema = z.object({
	message: z.string(),
	chatId: z.string(),
	senderId: z.number(),
	receiverId: z.number(),
});

export const MessageSchema = z.object({
	id: z.string(),
	sentAt: z.string(),
	message: z.string(),
	chatId: z.string(),
	senderId: z.number(),
	recipientId: z.number(),
	viewed: z.boolean(),
	receivedAt: z.string().nullable().default(null),
	deletedBy: z.number().nullable().default(null),
	deletedAt: z.string().nullable().default(null),
	deletionScope: z.enum(["ALL", "SELF"]).nullable().default(null),
	editedAt: z.string().nullable().default(null),
});

export type Message = z.TypeOf<typeof MessageSchema>;

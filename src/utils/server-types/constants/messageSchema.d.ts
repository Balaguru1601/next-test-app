import { z } from "zod";
export declare const SendMessageInput: z.ZodObject<{
    message: z.ZodString;
    chatId: z.ZodString;
    senderId: z.ZodNumber;
    recipientId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    message: string;
    recipientId: number;
    senderId: number;
    chatId: string;
}, {
    message: string;
    recipientId: number;
    senderId: number;
    chatId: string;
}>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodString;
    sentAt: z.ZodDate;
    message: z.ZodString;
    chatId: z.ZodString;
    senderId: z.ZodNumber;
    recipientId: z.ZodNumber;
    viewed: z.ZodBoolean;
    receivedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
}, "strip", z.ZodTypeAny, {
    message: string;
    id: string;
    recipientId: number;
    sentAt: Date;
    senderId: number;
    viewed: boolean;
    receivedAt: Date | null;
    chatId: string;
}, {
    message: string;
    id: string;
    recipientId: number;
    sentAt: Date;
    senderId: number;
    viewed: boolean;
    chatId: string;
    receivedAt?: Date | null | undefined;
}>;
export declare const SendMessageOutput: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    chat: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        sentAt: z.ZodDate;
        message: z.ZodString;
        chatId: z.ZodString;
        senderId: z.ZodNumber;
        recipientId: z.ZodNumber;
        viewed: z.ZodBoolean;
        receivedAt: z.ZodNullable<z.ZodDate>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        message: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        receivedAt: Date | null;
        chatId: string;
    }, {
        message: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        receivedAt: Date | null;
        chatId: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    chat?: {
        message: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        receivedAt: Date | null;
        chatId: string;
    } | undefined;
}, {
    message: string;
    success: boolean;
    chat?: {
        message: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        receivedAt: Date | null;
        chatId: string;
    } | undefined;
}>;
export declare const LoadChatInput: z.ZodObject<{
    recipientId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    recipientId: number;
}, {
    recipientId: number;
}>;
export declare const LoadChatOutput: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    chatId: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sentAt: z.ZodDate;
        message: z.ZodString;
        chatId: z.ZodString;
        senderId: z.ZodNumber;
        recipientId: z.ZodNumber;
        viewed: z.ZodBoolean;
        receivedAt: z.ZodDefault<z.ZodNullable<z.ZodDate>>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        id: string;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        receivedAt: Date | null;
        chatId: string;
    }, {
        message: string;
        id: string;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        chatId: string;
        receivedAt?: Date | null | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    chatId?: string | undefined;
    messages?: {
        message: string;
        id: string;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        receivedAt: Date | null;
        chatId: string;
    }[] | undefined;
}, {
    message: string;
    success: boolean;
    chatId?: string | undefined;
    messages?: {
        message: string;
        id: string;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        chatId: string;
        receivedAt?: Date | null | undefined;
    }[] | undefined;
}>;
export type Message = z.TypeOf<typeof MessageSchema>;

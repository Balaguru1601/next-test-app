import { z } from "zod";
export declare const SendMessageSchema: z.ZodObject<{
    message: z.ZodString;
    chatId: z.ZodOptional<z.ZodString>;
    senderId: z.ZodNumber;
    receiverId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    message: string;
    senderId: number;
    receiverId: number;
    chatId?: string | undefined;
}, {
    message: string;
    senderId: number;
    receiverId: number;
    chatId?: string | undefined;
}>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodString;
    sentAt: z.ZodDate;
    message: z.ZodString;
    chatId: z.ZodString;
    senderId: z.ZodNumber;
    receiverId: z.ZodNumber;
    viewed: z.ZodDefault<z.ZodBoolean>;
    receivetAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    message: string;
    id: string;
    chatId: string;
    senderId: number;
    receiverId: number;
    sentAt: Date;
    viewed: boolean;
    receivetAt?: Date | undefined;
}, {
    message: string;
    id: string;
    chatId: string;
    senderId: number;
    receiverId: number;
    sentAt: Date;
    viewed?: boolean | undefined;
    receivetAt?: Date | undefined;
}>;
export type Message = z.TypeOf<typeof MessageSchema>;

import { z } from "zod";
export declare const OutputTemplate: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
}, {
    message: string;
    success: boolean;
}>;
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
    sentAt: z.ZodString;
    message: z.ZodString;
    chatId: z.ZodString;
    senderId: z.ZodNumber;
    recipientId: z.ZodNumber;
    viewed: z.ZodBoolean;
    receivedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    message: string;
    recipientId: number;
    sentAt: string;
    senderId: number;
    viewed: boolean;
    receivedAt: string | null;
    chatId: string;
}, {
    id: string;
    message: string;
    recipientId: number;
    sentAt: string;
    senderId: number;
    viewed: boolean;
    chatId: string;
    receivedAt?: string | null | undefined;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
        recipientId: number;
        sentAt: Date;
        senderId: number;
        viewed: boolean;
        receivedAt: Date | null;
        chatId: string;
    }, {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        message: string;
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
        messages: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            sentAt: z.ZodString;
            message: z.ZodString;
            chatId: z.ZodString;
            senderId: z.ZodNumber;
            recipientId: z.ZodNumber;
            viewed: z.ZodBoolean;
            receivedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            receivedAt: string | null;
            chatId: string;
        }, {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            chatId: string;
            receivedAt?: string | null | undefined;
        }>, "many">;
        date: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        date: Date;
        messages: {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            receivedAt: string | null;
            chatId: string;
        }[];
    }, {
        date: Date;
        messages: {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            chatId: string;
            receivedAt?: string | null | undefined;
        }[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    chatId?: string | undefined;
    messages?: {
        date: Date;
        messages: {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            receivedAt: string | null;
            chatId: string;
        }[];
    }[] | undefined;
}, {
    message: string;
    success: boolean;
    chatId?: string | undefined;
    messages?: {
        date: Date;
        messages: {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            chatId: string;
            receivedAt?: string | null | undefined;
        }[];
    }[] | undefined;
}>;
export declare const AllChatOutput: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    chats: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        user: z.ZodObject<{
            id: z.ZodNumber;
            email: z.ZodString;
            username: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: number;
            email: string;
            username: string;
        }, {
            id: number;
            email: string;
            username: string;
        }>;
        id: z.ZodString;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        user: {
            id: number;
            email: string;
            username: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, {
        user: {
            id: number;
            email: string;
            username: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    chats?: {
        user: {
            id: number;
            email: string;
            username: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | null | undefined;
}, {
    message: string;
    success: boolean;
    chats?: {
        user: {
            id: number;
            email: string;
            username: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | null | undefined;
}>;
export interface ProcessedChat {
    user: {
        id: number;
        email: string;
        username: string;
    };
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export type Message = z.TypeOf<typeof MessageSchema>;

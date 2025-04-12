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
export declare const createChatInput: z.ZodObject<{
    recipientId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    recipientId: number;
}, {
    recipientId: number;
}>;
export declare const createChatOutput: z.ZodObject<{
    recipientId: z.ZodOptional<z.ZodNumber>;
    chatId: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    recipientId?: number | undefined;
    chatId?: string | undefined;
}, {
    message: string;
    success: boolean;
    recipientId?: number | undefined;
    chatId?: string | undefined;
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
    deletedBy: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    deletedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    deletionScope: z.ZodDefault<z.ZodNullable<z.ZodEnum<["ALL", "SELF"]>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    message: string;
    recipientId: number;
    sentAt: string;
    senderId: number;
    viewed: boolean;
    receivedAt: string | null;
    deletionScope: "SELF" | "ALL" | null;
    deletedAt: string | null;
    chatId: string;
    deletedBy: number | null;
}, {
    id: string;
    message: string;
    recipientId: number;
    sentAt: string;
    senderId: number;
    viewed: boolean;
    chatId: string;
    receivedAt?: string | null | undefined;
    deletedBy?: number | null | undefined;
    deletedAt?: string | null | undefined;
    deletionScope?: "SELF" | "ALL" | null | undefined;
}>;
export declare const SendMessageOutput: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    chat: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        sentAt: z.ZodString;
        message: z.ZodString;
        chatId: z.ZodString;
        senderId: z.ZodNumber;
        recipientId: z.ZodNumber;
        viewed: z.ZodBoolean;
        receivedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        deletedBy: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        deletionScope: z.ZodDefault<z.ZodNullable<z.ZodEnum<["ALL", "SELF"]>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        receivedAt: string | null;
        deletionScope: "SELF" | "ALL" | null;
        deletedAt: string | null;
        chatId: string;
        deletedBy: number | null;
    }, {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        chatId: string;
        receivedAt?: string | null | undefined;
        deletedBy?: number | null | undefined;
        deletedAt?: string | null | undefined;
        deletionScope?: "SELF" | "ALL" | null | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    chat?: {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        receivedAt: string | null;
        deletionScope: "SELF" | "ALL" | null;
        deletedAt: string | null;
        chatId: string;
        deletedBy: number | null;
    } | undefined;
}, {
    message: string;
    success: boolean;
    chat?: {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        chatId: string;
        receivedAt?: string | null | undefined;
        deletedBy?: number | null | undefined;
        deletedAt?: string | null | undefined;
        deletionScope?: "SELF" | "ALL" | null | undefined;
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
            deletedBy: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            deletedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            deletionScope: z.ZodDefault<z.ZodNullable<z.ZodEnum<["ALL", "SELF"]>>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            receivedAt: string | null;
            deletionScope: "SELF" | "ALL" | null;
            deletedAt: string | null;
            chatId: string;
            deletedBy: number | null;
        }, {
            id: string;
            message: string;
            recipientId: number;
            sentAt: string;
            senderId: number;
            viewed: boolean;
            chatId: string;
            receivedAt?: string | null | undefined;
            deletedBy?: number | null | undefined;
            deletedAt?: string | null | undefined;
            deletionScope?: "SELF" | "ALL" | null | undefined;
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
            deletionScope: "SELF" | "ALL" | null;
            deletedAt: string | null;
            chatId: string;
            deletedBy: number | null;
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
            deletedBy?: number | null | undefined;
            deletedAt?: string | null | undefined;
            deletionScope?: "SELF" | "ALL" | null | undefined;
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
            deletionScope: "SELF" | "ALL" | null;
            deletedAt: string | null;
            chatId: string;
            deletedBy: number | null;
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
            deletedBy?: number | null | undefined;
            deletedAt?: string | null | undefined;
            deletionScope?: "SELF" | "ALL" | null | undefined;
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
export declare const deleteMessageInput: z.ZodObject<{
    message: z.ZodObject<{
        id: z.ZodString;
        sentAt: z.ZodString;
        message: z.ZodString;
        chatId: z.ZodString;
        senderId: z.ZodNumber;
        recipientId: z.ZodNumber;
        viewed: z.ZodBoolean;
        receivedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        deletedBy: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        deletedAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        deletionScope: z.ZodDefault<z.ZodNullable<z.ZodEnum<["ALL", "SELF"]>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        receivedAt: string | null;
        deletionScope: "SELF" | "ALL" | null;
        deletedAt: string | null;
        chatId: string;
        deletedBy: number | null;
    }, {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        chatId: string;
        receivedAt?: string | null | undefined;
        deletedBy?: number | null | undefined;
        deletedAt?: string | null | undefined;
        deletionScope?: "SELF" | "ALL" | null | undefined;
    }>;
    all: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    message: {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        receivedAt: string | null;
        deletionScope: "SELF" | "ALL" | null;
        deletedAt: string | null;
        chatId: string;
        deletedBy: number | null;
    };
    all: boolean;
}, {
    message: {
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        chatId: string;
        receivedAt?: string | null | undefined;
        deletedBy?: number | null | undefined;
        deletedAt?: string | null | undefined;
        deletionScope?: "SELF" | "ALL" | null | undefined;
    };
    all: boolean;
}>;
export declare const deleteMessageOutput: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
}, {
    message: string;
    success: boolean;
}>;
export type Message = z.TypeOf<typeof MessageSchema>;

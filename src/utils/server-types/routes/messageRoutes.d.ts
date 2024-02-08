/// <reference types="node" />
/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="ws" />
export declare const messageRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("ws") | import("express").Response<any, Record<string, any>>;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: typeof import("superjson").default;
}>, {
    sendIndividualMessage: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws") | import("express").Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: typeof import("superjson").default;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            user: {
                id: number;
                email: string;
                username: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        };
        _input_in: {
            message: string;
            recipientId: number;
            senderId: number;
            chatId: string;
        };
        _input_out: {
            message: string;
            recipientId: number;
            senderId: number;
            chatId: string;
        };
        _output_in: {
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
                chatId: string;
            } | undefined;
        };
        _output_out: {
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
                chatId: string;
            } | undefined;
        };
    }, unknown>;
    loadIndividualChat: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws") | import("express").Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: typeof import("superjson").default;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            user: {
                id: number;
                email: string;
                username: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        };
        _input_in: {
            recipientId: number;
        };
        _input_out: {
            recipientId: number;
        };
        _output_in: {
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
        };
        _output_out: {
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
        };
    }, unknown>;
    onSendMessage: import("@trpc/server").BuildProcedure<"subscription", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws") | import("express").Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: typeof import("superjson").default;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("http").IncomingMessage;
            res: import("ws");
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("@trpc/server/observable").Observable<{
        id: string;
        message: string;
        recipientId: number;
        sentAt: string;
        senderId: number;
        viewed: boolean;
        receivedAt: string | null;
        chatId: string;
    }, unknown>>;
    getAllChats: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws") | import("express").Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: typeof import("superjson").default;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
            user: {
                id: number;
                email: string;
                username: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            };
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: {
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
        };
        _output_out: {
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
        };
    }, unknown>;
}>;

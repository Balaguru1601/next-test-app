/// <reference types="node" />
/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="ws" />
export declare const appRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
        res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: typeof import("superjson").default;
}>, {
    greeting: import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: typeof import("superjson").default;
        }>;
        _ctx_out: {
            req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
        };
        _input_in: typeof import("@trpc/server").unsetMarker;
        _input_out: typeof import("@trpc/server").unsetMarker;
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
        _meta: object;
    }, string>;
    logger: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: typeof import("superjson").default;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
        };
        _input_in: {
            name: string;
        };
        _input_out: {
            name: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, boolean>;
    user: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: typeof import("superjson").default;
    }>, {
        register: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
            };
            _input_in: {
                username: string;
                password: string;
                email: string;
            };
            _input_out: {
                username: string;
                password: string;
                email: string;
            };
            _output_in: {
                message: string;
                success: boolean;
                username?: string | undefined;
                userId?: number | undefined;
            };
            _output_out: {
                message: string;
                success: boolean;
                username?: string | undefined;
                userId?: number | undefined;
            };
        }, unknown>;
        login: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
            };
            _input_in: {
                username: string;
                password: string;
                withUsername?: boolean | undefined;
            };
            _input_out: {
                username: string;
                password: string;
                withUsername: boolean;
            };
            _output_in: {
                message: string;
                success: boolean;
                username?: string | undefined;
                userId?: number | undefined;
            };
            _output_out: {
                message: string;
                success: boolean;
                username?: string | undefined;
                userId?: number | undefined;
            };
        }, unknown>;
        verify: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _ctx_out: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, {
            success: boolean;
            message: string;
            username: string;
            userId: number;
        } | undefined>;
        logout: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: {
                message: string;
                success: boolean;
                username?: string | undefined;
                userId?: number | undefined;
            };
            _output_out: {
                message: string;
                success: boolean;
                username?: string | undefined;
                userId?: number | undefined;
            };
        }, unknown>;
        secretInfo: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, {
            success: boolean;
            message: string;
        }>;
        update: import("@trpc/server").BuildProcedure<"subscription", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _ctx_out: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
        }, import("@trpc/server/observable").Observable<string, unknown>>;
        getOnlineUsers: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: {
                message: string;
                success: boolean;
                users?: {
                    username: string;
                    id: number;
                }[] | undefined;
            };
            _output_out: {
                message: string;
                success: boolean;
                users?: {
                    username: string;
                    id: number;
                }[] | undefined;
            };
        }, unknown>;
        setUserOffline: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, void>;
        setUserOnline: import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, void>;
    }>;
    message: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
        ctx: {
            req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: typeof import("superjson").default;
    }>, {
        sendIndividualMessage: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
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
            };
            _output_out: {
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
            };
        }, unknown>;
        loadIndividualChat: import("@trpc/server").BuildProcedure<"mutation", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("express").Response<any, Record<string, any>>;
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
                    message: string;
                    id: string;
                    recipientId: number;
                    sentAt: Date;
                    senderId: number;
                    viewed: boolean;
                    chatId: string;
                    receivedAt?: Date | null | undefined;
                }[] | undefined;
            };
            _output_out: {
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
            };
        }, unknown>;
        onSendMessage: import("@trpc/server").BuildProcedure<"subscription", {
            _config: import("@trpc/server").RootConfig<{
                ctx: {
                    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                    res: import("ws").WebSocket | import("express").Response<any, Record<string, any>>;
                };
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: typeof import("superjson").default;
            }>;
            _meta: object;
            _ctx_out: {
                req: import("http").IncomingMessage;
                res: import("ws").WebSocket;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, import("@trpc/server/observable").Observable<{
            message: string;
            id: string;
            recipientId: number;
            sentAt: Date;
            senderId: number;
            viewed: boolean;
            receivedAt: Date | null;
            chatId: string;
        }, unknown>>;
    }>;
}>;
export type AppRouter = typeof appRouter;

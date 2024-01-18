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
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    sendMessage: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
                res: import("ws") | import("express").Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
            res: import("express").Response<any, Record<string, any>>;
        };
        _input_in: {
            message: string;
            senderId: number;
            receiverId: number;
            chatId?: string | undefined;
        };
        _input_out: {
            message: string;
            senderId: number;
            receiverId: number;
            chatId?: string | undefined;
        };
        _output_in: {
            message: string;
            success: boolean;
            chat?: {
                message: string;
                id: string;
                chatId: string;
                senderId: number;
                receiverId: number;
                sentAt: Date;
                viewed?: boolean | undefined;
                receivetAt?: Date | undefined;
            } | undefined;
        };
        _output_out: {
            message: string;
            success: boolean;
            chat?: {
                message: string;
                id: string;
                chatId: string;
                senderId: number;
                receiverId: number;
                sentAt: Date;
                viewed: boolean;
                receivetAt?: Date | undefined;
            } | undefined;
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
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            req: import("http").IncomingMessage;
            res: import("ws");
        };
        _input_in: {
            chatId: string;
        };
        _input_out: {
            chatId: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, import("@trpc/server/observable").Observable<{
        message: string;
        id: string;
        chatId: string;
        senderId: number;
        receiverId: number;
        sentAt: Date;
        viewed: boolean;
        receivetAt?: Date | undefined;
    }, unknown>>;
}>;

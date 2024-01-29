/// <reference types="node" />
/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="ws" />
export declare const userRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
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
}>;

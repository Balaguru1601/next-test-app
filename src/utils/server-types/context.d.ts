/// <reference types="node" />
/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="ws" />
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
export declare function createContext({ req, res }: CreateWSSContextFnOptions | CreateExpressContextOptions): {
    req: import("http").IncomingMessage | import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    res: import("ws") | import("express").Response<any, Record<string, any>>;
};
export declare const isExpressRequest: (ctx: ContextType) => ctx is CreateExpressContextOptions;
export type ContextType = inferAsyncReturnType<typeof createContext>;

import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
declare module "express-session" {
    interface SessionData {
        user: {
            id: string;
            username: string;
        };
    }
}
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare const io: Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;

import { PrismaClient } from "@prisma/client";
declare module "express-session" {
    interface SessionData {
        user: {
            id: string;
            username: string;
        };
    }
}
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;

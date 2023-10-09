declare module "express-session" {
    interface SessionData {
        user: {
            id: string;
            username: string;
        };
    }
}
export {};

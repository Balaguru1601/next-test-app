import Redis from "ioredis";
export declare const redis: Redis;
export declare const onlineUsersKey = "users:online";
export declare function addUser(userId: number): Promise<void>;
export declare function removeExpiredUsers(): Promise<void>;
export declare function getOnlineUsers(): Promise<string[]>;
export declare function isUserOnline(userId: number): Promise<boolean | "" | null>;
export declare function removeUser(userId: number): Promise<void>;
export declare function checkAndResetUser(userId: number): Promise<void>;

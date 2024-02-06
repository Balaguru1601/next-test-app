import { z } from "zod";
export declare const UserObject: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    username: string;
    password: string;
}, {
    id: number;
    email: string;
    username: string;
    password: string;
}>;
export declare const UserRegisterObject: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
}, {
    email: string;
    username: string;
    password: string;
}>;
export declare const UserLoginObject: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    withUsername: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    withUsername: boolean;
}, {
    username: string;
    password: string;
    withUsername?: boolean | undefined;
}>;
export type UserTypeObject = z.TypeOf<typeof UserObject>;
export type UserRegisterInput = z.TypeOf<typeof UserRegisterObject>;
export type UserLoginInput = z.TypeOf<typeof UserLoginObject>;
export declare const AuthOutput: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    username?: string | undefined;
    userId?: number | undefined;
}, {
    message: string;
    success: boolean;
    username?: string | undefined;
    userId?: number | undefined;
}>;
export declare const OnlineUsersOutput: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodString;
    users: z.ZodOptional<z.ZodArray<z.ZodObject<{
        username: z.ZodString;
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        username: string;
    }, {
        id: number;
        username: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    message: string;
    success: boolean;
    users?: {
        id: number;
        username: string;
    }[] | undefined;
}, {
    message: string;
    success: boolean;
    users?: {
        id: number;
        username: string;
    }[] | undefined;
}>;
export type AuthOutputType = z.TypeOf<typeof AuthOutput>;

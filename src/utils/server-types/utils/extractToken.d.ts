import jwt from "jsonwebtoken";
declare const secrets: {
    auth: string;
};
export interface authTokenType {
    username: string;
    id: number;
}
export declare const extractToken: (token: string, type: keyof typeof secrets) => string | jwt.JwtPayload;
export {};

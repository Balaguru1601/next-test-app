import mongoose from "mongoose";
export declare const userModel: mongoose.Model<{
    email: string;
    username: string;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    username: string;
    password: string;
}> & {
    email: string;
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email: string;
    username: string;
    password: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    username: string;
    password: string;
}> & {
    email: string;
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
}>>;

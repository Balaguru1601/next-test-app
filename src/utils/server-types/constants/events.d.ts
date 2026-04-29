/// <reference types="node" />
import { EventEmitter } from "stream";
export declare const EventTypes: {
    SEND_MESSAGE: string;
    GET_ONLINE_USERS: string;
    DETELE_MESSAGE: string;
    EDIT_MESSAGE: string;
};
export declare const eventEmitter: EventEmitter;

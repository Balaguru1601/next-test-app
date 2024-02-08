/// <reference types="node" />
import { EventEmitter } from "stream";
export declare enum Events {
    SEND_MESSAGE = "SEND_MESSAGE",
    GET_ONLINE_USERS = "GET_ONLINE_USERS"
}
export declare const eventEmitter: EventEmitter;

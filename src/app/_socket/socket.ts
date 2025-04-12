import { Message } from "@/constants/messageSchema";
import { io } from "socket.io-client";

export const EventTypes = {
	SEND_MESSAGE: "SEND_MESSAGE",
	GET_ONLINE_USERS: "GET_ONLINE_USERS",
	DETELE_MESSAGE: "DETELE_MESSAGE",
};

export const socket = io("http://localhost:8081", {
	autoConnect: false,
});

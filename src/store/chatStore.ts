import { create, StateCreator } from "zustand";
import { ChatSlice } from "./storeTypes";

export const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
	chats: {},
	createChat({ chatId, recipientId, lastSeen, online }) {
		return set((state) => ({
			...state,
			chats: {
				...state.chats,
				[chatId]: { recipientId, read: [], unread: [], online, lastSeen },
			},
		}));
	},
	deleteChat(chatId) {
		const chats = get().chats;
		delete chats[chatId];
		return set((state) => ({ ...state, chats }));
	},
	pushMessage(chatId, message) {
		get().chats[chatId].unread.push(message);
	},
	deleteMessage(chatId, messageId) {
		const chats = get().chats;
		const msgIndex = chats[chatId].read.findIndex((item) => item.id === messageId);
		chats[chatId].read.splice(msgIndex, 1);
		return set((state) => ({ ...state, chats }));
	},
	setOnline(chatId, value) {
		return set((state) => ({
			...state,
			chats: { ...state.chats, [chatId]: { ...state.chats[chatId], online: value } },
		}));
	},
	setLastSeen(chatId, value) {
		return set((state) => ({
			...state,
			chats: { ...state.chats, [chatId]: { ...state.chats[chatId], lastSeen: value } },
		}));
	},
});

import { trpcVanilla } from "@/app/_trpc/trpc";
import { StateCreator } from "zustand";
import { UserStore } from "./userStore";
import { Message } from "@/constants/messageSchema";
import { StoreType } from "./zustand";

export interface ChatStore {
	chatData: {
		chat: {
			[chatId: string]: Message[];
		};
		addChat: (data: { chatId: string; messages: Message[] }) => void;
		populateChat: (data: { [chatId: string]: Message[] }) => void;
		deleteChat: (chatId: string) => void;
		appendMessage: (chatId: string, messages: Message[]) => void;
		deleteMessage: (chatId: string, messageId: string) => void;
		editMessage: (chatId: string, messageId: string, message: string) => void;
	};
}

export const createChatSlice: StateCreator<
	StoreType,
	[["zustand/devtools", never], ["zustand/persist", unknown]],
	// [],
	[],
	ChatStore
> = (set, get) => ({
	chatData: {
		chat: {},
		addChat({ chatId, messages }) {
			set((state) => ({
				...state,
				chatData: {
					...state.chatData,
					chat: {
						...state.chatData.chat,
						[chatId]: messages,
					},
				},
			}));
		},
		populateChat(data) {
			set((state) => ({
				...state,
				chatData: {
					...state.chatData,
					chat: data,
				},
			}));
		},
		deleteChat(chatId) {
			const chats = get().chatData.chat;
			delete chats[chatId];
			set((state) => ({
				...state,
				chatData: {
					...state.chatData,
					chat: chats,
				},
			}));
		},
		appendMessage(chatId, messages) {
			const chats = get().chatData.chat;
			chats[chatId] = [...chats[chatId], ...messages];
			set((state) => ({
				...state,
				chatData: {
					...state.chatData,
					chat: chats,
				},
			}));
		},
		deleteMessage(chatId, messageId) {
			const msgs = get().chatData.chat[chatId];
			const index = msgs.findIndex((itm) => itm.id === messageId);
			msgs.splice(index, 1);
			set((state) => ({
				...state,
				chatData: {
					...state.chatData,
					chat: {
						...state.chatData.chat,
						[chatId]: msgs,
					},
				},
			}));
		},
		editMessage(chatId, messageId, message) {
			const msgs = get().chatData.chat[chatId];
			const index = msgs.findIndex((itm) => itm.id === messageId);
			msgs[index].message = message;
			set((state) => ({
				...state,
				chatData: {
					...state.chatData,
					chat: {
						...state.chatData.chat,
						[chatId]: msgs,
					},
				},
			}));
		},
	},
});

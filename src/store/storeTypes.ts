import { Message } from "@/constants/messageSchema";
import { StateCreator } from "zustand";

export interface AuthSliceDefinition {
	isLoggedIn: boolean;
	username: string | null;
	userId: number | null;
}

export interface AuthSliceAcions {
	login: ({ username, userId }: { username: string; userId: number }) => void;
	logout: () => void;
	verify: () => void;
}

export type AuthSlice = AuthSliceAcions & AuthSliceDefinition;

export interface ChatStateDefinition {
	chats: {
		[chatId: string]: {
			read: Message[];
			unread: Message[];
			online: boolean;
			lastSeen: string;
			recipientId: number;
		};
	};
}

interface ChatStateActions {
	createChat: ({
		chatId,
		recipientId,
		lastSeen,
		online,
	}: {
		chatId: string;
		recipientId: number;
		lastSeen: string;
		online: boolean;
	}) => void;
	deleteChat: (chatId: string) => void;
	pushMessage: (chatId: string, message: Message) => void;
	deleteMessage: (chatId: string, messageId: string) => void;
	setOnline: (chatId: string, value: boolean) => void;
	setLastSeen: (chatId: string, value: string) => void;
	loadChat: (
		chatId: string,
		data: {
			read: Message[];
			unread: Message[];
			online: boolean;
			lastSeen: string;
			recipientId: number;
		}
	) => void;
}
export type ChatSlice = ChatStateActions & ChatStateDefinition;

export interface CombinedState {
	auth: AuthSlice;
	chat: ChatSlice;
}

export type StateSlice<T> = StateCreator<CombinedState, [["zustand/persist", Partial<T>]], [], T>;

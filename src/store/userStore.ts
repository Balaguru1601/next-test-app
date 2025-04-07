import { trpcVanilla } from "@/app/_trpc/trpc";
import { socket } from "@/app/_socket/socket";
import { StateCreator } from "zustand";
import { StoreType } from "./zustand";

export interface UserStore {
	user: {
		isLoggedIn: boolean;
		username: string | null;
		userId: number | null;
		login: ({ username, userId }: { username: string; userId: number }) => void;
		logout: () => void;
		verify: () => void;
	};
}

// isLoggedIn: false,
// 				username: null,
// 				userId: null,
// 				login: ({ username, userId }) => {
// 					socket.auth = { id: userId };
// 					socket.connect();
// 					set((state) => ({
// 						username,
// 						isLoggedIn: true,
// 						userId,
// 					}));
// 				},
// 				logout: () => {
// 					socket.disconnect();
// 					set((state) => ({
// 						isLoggedIn: false,
// 						username: null,
// 						userId: null,
// 					}));
// 				},
// 				verify: async () => {
// 					try {
// 						const response = await trpcVanilla.user.verify.query();
// 						if (response && response.username)
// 							get().login({ username: response.username, userId: response.userId });
// 					} catch (e) {
// 						get().logout();
// 					}
// 				},

export const createUserSlice: StateCreator<
	StoreType, // store type
	[["zustand/devtools", never], ["zustand/persist", unknown]], //middlewares being used
	// [],
	[], // no extra arguments
	UserStore // return type
> = (set, get) => ({
	user: {
		isLoggedIn: false,
		username: null,
		userId: null,
		login: ({ username, userId }) => {
			socket.auth = { id: userId };
			return set((state) => ({
				user: {
					...state.user,
					username,
					isLoggedIn: true,
					userId,
				},
			}));
		},
		logout: () => {
			socket.disconnect();
			return set((state) => ({
				user: {
					...state.user,
					isLoggedIn: false,
					username: null,
					userId: null,
				},
			}));
		},
		verify: async () => {
			try {
				const response = await trpcVanilla.user.verify.query();
				if (response && response.username)
					get().user.login({ username: response.username, userId: response.userId });
			} catch (e) {
				get().user.logout();
			}
		},
	},
});

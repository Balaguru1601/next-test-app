import { trpcVanilla } from "@/app/_trpc/trpc";
import { StateCreator } from "zustand";

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

export const createUserSlice: StateCreator<
	UserStore,
	[["zustand/devtools", never], ["zustand/persist", unknown]],
	[],
	UserStore
> = (set, get) => ({
	user: {
		isLoggedIn: false,
		username: null,
		userId: null,
		login: ({ username, userId }) =>
			set((state) => ({
				...state,
				user: {
					...state.user,
					username,
					isLoggedIn: true,
					userId,
				},
			})),
		logout: () =>
			set((state) => ({
				...state,
				user: {
					...state.user,
					isLoggedIn: false,
					username: null,
					userId: null,
				},
			})),
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

import { trpc } from "@/app/_trpc/trpc";
import { create } from "zustand";

interface AuthStore {
	isLoggedIn: boolean;
	username: string | null;
	login: ({ username }: { username: string }) => void;
	logout: () => void;
	verify: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	isLoggedIn: false,
	username: null,
	login: ({ username }) => ({
		username,
		isLoggedIn: true,
	}),
	logout: () =>
		set((state) => ({
			isLoggedIn: false,
			username: null,
		})),
	verify: async () => {
		const response = trpc.user.verify.useQuery();
		if (response.isError) get().logout();
		else if (response.data && response.data.username) get().login({ username: response.data.username });
	},
}));

"use client";
import { trpc, trpcVanilla } from "@/app/_trpc/trpc";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
	isLoggedIn: boolean;
	username: string | null;
	login: ({ username }: { username: string }) => void;
	logout: () => void;
	verify: () => void;
}

export const useAuthStore = create<AuthStore>()(
	devtools(
		persist(
			(set, get) => ({
				isLoggedIn: false,
				username: null,
				login: ({ username }) =>
					set((state) => ({
						username,
						isLoggedIn: true,
					})),
				logout: () =>
					set((state) => ({
						isLoggedIn: false,
						username: null,
					})),
				verify: async () => {
					try {
						const response = await trpcVanilla.user.verify.query();
						if (response && response.username) get().login({ username: response.username });
					} catch (e) {
						get().logout();
					}
				},
			}),
			{ name: "auth-store", skipHydration: true }
		)
	)
);

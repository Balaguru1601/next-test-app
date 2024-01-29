"use client";
import { trpc, trpcVanilla } from "@/app/_trpc/trpc";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
	isLoggedIn: boolean;
	username: string | null;
	userId: number | null;
	login: ({ username, userId }: { username: string; userId: number }) => void;
	logout: () => void;
	verify: () => void;
}

export const useAuthStore = create<AuthStore>()(
	devtools(
		persist(
			(set, get) => ({
				isLoggedIn: false,
				username: null,
				userId: null,
				login: ({ username, userId }) =>
					set((state) => ({
						username,
						isLoggedIn: true,
						userId,
					})),
				logout: () =>
					set((state) => ({
						isLoggedIn: false,
						username: null,
						userId: null,
					})),
				verify: async () => {
					try {
						const response = await trpcVanilla.user.verify.query();
						console.log(response);
						if (response && response.username)
							get().login({ username: response.username, userId: response.userId });
					} catch (e) {
						get().logout();
					}
				},
			}),
			{ name: "auth-store", skipHydration: true }
		)
	)
);

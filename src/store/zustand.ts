"use client";
import { socket } from "@/app/_socket/socket";
import { trpc, trpcVanilla } from "@/app/_trpc/trpc";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthSlice } from "./storeTypes";

export const useAuthStore = create<AuthSlice>()(
	devtools(
		persist(
			(set, get) => ({
				isLoggedIn: false,
				username: null,
				userId: null,
				login: ({ username, userId }) => {
					socket.auth = { id: userId };
					socket.connect();
					set((state) => ({
						username,
						isLoggedIn: true,
						userId,
					}));
				},
				logout: () => {
					socket.disconnect();
					set((state) => ({
						isLoggedIn: false,
						username: null,
						userId: null,
					}));
				},
				verify: async () => {
					try {
						const response = await trpcVanilla.user.verify.query();
						if (response && response.username)
							get().login({ username: response.username, userId: response.userId });
					} catch (e) {
						get().logout();
					}
				},
import { UserStore, createUserSlice } from "./userStore";
import { ChatStore, createChatSlice } from "./chatStore";
import { merge as deepmerge } from "lodash";

export type StoreType = UserStore & ChatStore;

export const useZStore = create<StoreType>()(
	devtools(
		persist(
			(...a) => ({
				...createChatSlice(...a),
				...createUserSlice(...a),
			}),
			{
				name: "storage",
				skipHydration: true,
				partialize: (state) => ({ user: state.user }),
				// partializing a slice does not rehydrade actions - a bug in zustand itself
				merge: (persisted, current) => {
					return deepmerge({}, current, persisted);
				},
			}
		)
	)
);

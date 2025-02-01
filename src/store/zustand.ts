"use client";
import { trpc, trpcVanilla } from "@/app/_trpc/trpc";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
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

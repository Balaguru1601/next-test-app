"use client";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
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
				// storage: createJSONStorage(() => localStorage),
				// partializing a slice does not rehydrade actions - a bug in zustand storing in local storage
				merge: (persisted, current) => {
					return deepmerge({}, current, persisted);
				},
			}
		)
	)
);

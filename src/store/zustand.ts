"use client";
import { trpc, trpcVanilla } from "@/app/_trpc/trpc";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserStore, createUserSlice } from "./userStore";

export const useZStore = create<UserStore>()(
	devtools(
		persist(
			(...a) => ({
				...createUserSlice(...a),
			}),
			{
				name: "storage",
				skipHydration: true,
				partialize: (state) => ({ user: state.user }),
			}
		)
	)
);

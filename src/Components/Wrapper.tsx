"use client";

import Navbar from "@/Components/Navbar";
import Provider from "@/app/_trpc/Provider";
import { trpcVanilla } from "@/app/_trpc/trpc";
import { useAuthStore } from "@/store/zustand";
import { useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

let initial = true;

async function hydrator() {
	await useAuthStore.persist.rehydrate();
	useAuthStore.getState().verify();
}

const Wrapper = (props: Props) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (initial) {
			trpcVanilla.user.setUserOnline.query();
			initial = false;
		}

		hydrator().then(() => setShow(true));
		window.addEventListener("beforeunload", () => trpcVanilla.user.setUserOffline.query());
	}, []);

	return show ? (
		<Provider>
			<Navbar />
			{props.children}
		</Provider>
	) : null;
};

export default Wrapper;

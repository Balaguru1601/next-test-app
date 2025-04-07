"use client";

import Navbar from "@/Components/Navbar";
import { socket } from "@/app/_socket/socket";
import Provider from "@/app/_trpc/Provider";
import { trpcVanilla } from "@/app/_trpc/trpc";
import { useZStore } from "@/store/zustand";
import { useEffect, useRef, useState } from "react";

type Props = {
	children: React.ReactNode;
};

let initial = true;

async function hydrator() {
	try {
		await useZStore.persist.rehydrate();
		useZStore.getState().user.verify();
	} catch (error) {
		console.log(error);
	}
}

const Wrapper = (props: Props) => {
	const [show, setShow] = useState(false);
	const { isLoggedIn } = useZStore().user;
	// useEffect(() => {
	// 	if (initial) {
	//         if (isLoggedIn) {
	//             trpcVanilla.user.setUserOnline.query();
	//             socket.connect();
	//         }
	// 		initial = false;
	// 	}

	// 	hydrator().then(() => setShow(true));
	//     window.addEventListener("beforeunload", () => { trpcVanilla.user.setUserOffline.query(); socket.disconnect(); });
	// }, []);.

	const hasInitialized = useRef(false);

	useEffect(() => {
		if (!hasInitialized.current) {
			if (isLoggedIn) {
				trpcVanilla.user.setUserOnline.query(); // ✅ use mutation if appropriate
				socket.connect();
			}
			hasInitialized.current = true;
		}

		hydrator().then(() => setShow(true));

		const handleBeforeUnload = () => {
			trpcVanilla.user.setUserOffline.query(); // ✅ again, use mutation
			socket.disconnect();
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			handleBeforeUnload(); // ensure cleanup on component unmount too
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return show ? (
		<Provider>
			<Navbar />
			{props.children}
		</Provider>
	) : null;
};

export default Wrapper;

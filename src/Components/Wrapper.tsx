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

// TODO - chekc if the initial error printing on console for the verify does not log in production

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

	// TODO - check if isloggedin should be in the dependency array

	useEffect(() => {
		// if (!hasInitialized.current) {
		if (isLoggedIn) {
			console.log("wrapper initialized");
			trpcVanilla.user.setUserOnline.query();
			socket.auth = { id: useZStore.getState().user.userId! };
			socket.connect();
		}
		hasInitialized.current = true;
		// }

		hydrator().then(() => setShow(true));

		const handleBeforeUnload = () => {
			if (!isLoggedIn) return; // don't run if not logged in
			console.log("disconnected");
			trpcVanilla.user.setUserOffline.query();
			socket.disconnect();
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			handleBeforeUnload(); // ensure cleanup on component unmount too
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [isLoggedIn]);

	return show ? (
		<Provider>
			<Navbar />
			{props.children}
		</Provider>
	) : null;
};

export default Wrapper;

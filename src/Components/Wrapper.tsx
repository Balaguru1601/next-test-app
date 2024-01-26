"use client";

import Navbar from "@/Components/Navbar";
import Provider from "@/app/_trpc/Provider";
import { useAuthStore } from "@/store/zustand";
import { useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

const Wrapper = (props: Props) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		useAuthStore.persist.rehydrate();
		setShow(true);
	}, []);

	return show ? (
		<Provider>
			<Navbar />
			{props.children}
		</Provider>
	) : null;
};

export default Wrapper;

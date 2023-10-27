"use client";

import Navbar from "@/Components/Navbar";
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
		<>
			<Navbar />
			{props.children}
		</>
	) : null;
};

export default Wrapper;

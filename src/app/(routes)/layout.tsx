"use client";

import Navbar from "@/Components/Navbar";
import { useZStore } from "@/store/zustand";
import { useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

const Layout = (props: Props) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		console.log("Layout");
		useZStore.persist.rehydrate();
		console.log(useZStore.getState());
		setShow(true);
	}, []);

	return show ? (
		<>
			<Navbar />
			{props.children}
		</>
	) : null;
};

export default Layout;

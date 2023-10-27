"use client";
import { ReactNode, useEffect } from "react";

type Props = {
	children: ReactNode;
};

const Layout = (props: Props) => {
	return <div className="min-h-screen w-full bg-[#272829]">{props.children}</div>;
};

export default Layout;

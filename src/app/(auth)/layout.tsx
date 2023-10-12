"use client";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const layout = (props: Props) => {
	return <div className="min-h-screen w-full bg-[#272829]">{props.children}</div>;
};

export default layout;

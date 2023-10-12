"use client";
import Username from "@/Components/Username";
import { useAuthStore } from "@/store/zustand";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};
const DynamicUser = dynamic(() => import("@/Components/Username"), { ssr: false });

const Welcome = (props: Props) => {
	const router = useRouter();
	const { isLoggedIn } = useAuthStore();

	return <>Loading.. </>;
};

export default Welcome;

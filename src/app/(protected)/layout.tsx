"use client";
import Loader from "@/Components/Loader";
import { trpc } from "@/app/_trpc/trpc";
import { useAuthStore } from "@/store/zustand";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

export default function Layout(props: Props) {
	const { isLoggedIn, verify } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		verify();
		console.log("verify run");
		if (!isLoggedIn) return redirect("/signup");
		return setIsLoading(false);
	}, [isLoggedIn, verify]);

	if (!isLoading) return <>{props.children}</>;
	return <Loader />;
}

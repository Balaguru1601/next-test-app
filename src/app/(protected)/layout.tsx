"use client";
import { useAuthStore } from "@/store/zustand";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

export default function Layout(props: Props) {
	const { isLoggedIn } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		console.log(isLoggedIn);
		if (!isLoggedIn) return redirect("/signup");
		return setIsLoading(false);
	}, []);
	if (!isLoading) return <>{props.children}</>;
	else return <>Loading...</>;
}

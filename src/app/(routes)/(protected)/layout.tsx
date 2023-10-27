"use client";
import Loader from "@/Components/Loader";
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
		if (!isLoggedIn) return redirect("/signup");
		return setIsLoading(false);
	}, [isLoggedIn]);

	if (!isLoading) return <>{props.children}</>;
	return <Loader />;
}

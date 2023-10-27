"use client";
import { trpc } from "@/app/_trpc/trpc";
import { useAuthStore } from "@/store/zustand";
import Link from "next/link";
import { useEffect } from "react";

type Props = {};

export default function Navbar({}: Props) {
	const { logout, isLoggedIn } = useAuthStore();
	useEffect(() => console.log(isLoggedIn), [isLoggedIn]);
	const backLogout = trpc.user.logout.useMutation();

	const logoutHandler = () => {
		logout();
		backLogout.mutate();
	};

	return (
		<nav className="flex justify-center h-12 items-center bg-[#3C4048]">
			<Link href={"/"} className="mx-2">
				Home
			</Link>
			{!isLoggedIn && (
				<>
					<Link href={"/signup?s"} className="mx-2">
						Sign up
					</Link>
					<Link href={"/signup"} className="mx-2">
						Login
					</Link>
				</>
			)}
			<Link href={"/secret"} className="mx-2">
				Secret
			</Link>
			{isLoggedIn && (
				<button onClick={logoutHandler} className="mx-2">
					Logout
				</button>
			)}
		</nav>
	);
}

"use client";
import { trpc } from "@/app/_trpc/trpc";
import { useZStore } from "@/store/zustand";
import { customAlphabet } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function ProtectedNavbar({}: Props) {
	const { logout, isLoggedIn } = useZStore().user;
	const router = useRouter();
	const { verify } = useZStore().user;
	useEffect(() => {
		verify();
	}, []);
	const backLogout = trpc.user.logout.useMutation();

	const logoutHandler = () => {
		logout();
		backLogout.mutate();
	};

	const createRoom = () => {
		const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);
		const roomId = nanoid();
		router.push("/room/" + roomId);
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
				<>
					<button onClick={logoutHandler} className="mx-2">
						Logout
					</button>
					<button onClick={createRoom} className="mx-2">
						Create a room
					</button>
				</>
			)}
		</nav>
	);
}

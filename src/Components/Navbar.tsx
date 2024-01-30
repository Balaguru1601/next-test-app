"use client";
import { trpc } from "@/app/_trpc/trpc";
import { useAuthStore } from "@/store/zustand";
import { customAlphabet } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

export default function Navbar({}: Props) {
	const { logout, isLoggedIn, username } = useAuthStore();
	const router = useRouter();

	const backLogout = trpc.user.logout.useMutation({
		onSettled: logout,
	});

	const logoutHandler = async () => {
		backLogout.mutate();
	};

	const createRoom = () => {
		const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);
		const roomId = nanoid();
		router.push("/room/" + roomId);
	};

	return (
		<nav className="flex justify-between items-center h-12 w-full text-center md:px-16 bg-[#3C4048]">
			<div></div>
			<div>
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
						<Link href={"/chat"} className="mx-2">
							Chat
						</Link>
					</>
				)}
			</div>
			<div className="">{username ? "Hello, " + username : ""}</div>
		</nav>
	);
}

"use client";
import { trpc } from "./_trpc/trpc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/zustand";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	const { login } = useAuthStore();
	const [showError, setShowError] = useState<string | null>(null);
	const createUser = trpc.user.register.useMutation({
		onSuccess: (data) => {
			if (data.success && data.username) {
				login({ username: data.username });
				router.push("/welcome");
			} else if (data.success === false) {
				console.log(data);
				setShowError(data.message);
				setTimeout(() => {
					setShowError(null);
				}, 3000);
			}
		},
	});

	const [username, setUsername] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	const registerUser = async () => {
		if (username && username.length > 0 && email && email.length && password && password.length) {
			createUser.mutate({ username, email, password });
		} else setShowError("All fields are required");
		setTimeout(() => {
			setShowError(null);
		}, 3000);
		return;
	};

	return (
		<div className="bg-[#272829] p-10 text-center">
			<h1 className="my-2">Hello {createUser.data?.username}</h1>
			<Link href={"/signup"} className="mx-2 inline-block mt-4 rounded-md border px-4 py-2">
				Sign up
			</Link>
			<Link href={"/login"} className="mx-2 inline-block mt-4 border rounded-md py-2 px-4">
				Login
			</Link>
		</div>
	);
}

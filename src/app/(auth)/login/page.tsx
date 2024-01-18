"use client";
import { useAuthStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "../../_trpc/trpc";

type Props = {};

const Login = (props: Props) => {
	const router = useRouter();
	const { login } = useAuthStore();
	const [showError, setShowError] = useState<string | null>(null);
	const loginUser = trpc.user.login.useMutation({
		onSuccess: (data) => {
			if (data.success && data.username && data.userId) {
				login({ username: data.username, userId: data.userId });
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

	const loginHandler = async () => {
		if (username && username.length > 0 && password && password.length) {
			loginUser.mutate({ username, password });
		} else setShowError("All fields are required");
		setTimeout(() => {
			setShowError(null);
		}, 3000);
		return;
	};

	return (
		<div className="bg-[#272829] p-10 text-center">
			<h1>Login</h1>
			<strong className={"block my-2 text-sm text-red-500  " + `${showError ? "visible" : "invisible"} `}>
				{showError || "error"}
			</strong>
			<div className="inline-block">
				<input
					type="text"
					className="m-2 rounded block text-gray-900 placeholder:text-gray-700 p-2 text-left"
					placeholder="username"
					value={username ?? ""}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					className="m-2 rounded block text-gray-900 placeholder:text-gray-700 p-2 text-left"
					value={password ?? ""}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="border p-2 rounded-md mt-2 hover:text-gray-700 hover:bg-gray-100"
					onClick={loginHandler}
				>
					Create user
				</button>
			</div>
		</div>
	);
};

export default Login;

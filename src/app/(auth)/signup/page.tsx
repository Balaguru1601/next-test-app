"use client";
import { useAuthStore } from "@/store/zustand";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "../../_trpc/trpc";
import Link from "next/link";

type Props = {};

const SignUp = (props: Props) => {
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
	const [signUpMode, setSignUpMode] = useState(true);

	const registerUser = async () => {
		if (username && username.length > 0 && email && email.length && password && password.length) {
			createUser.mutate({ username, email, password });
		} else setShowError("All fields are required");
		setTimeout(() => {
			setShowError(null);
		}, 3000);
		return;
	};

	const toggleSignInMode = () => setSignUpMode((prev) => !prev);

	return (
		<div className=" flex w-full pt-[15%] justify-center items-center overflow-hidden z-10">
			<div className="bg-[url('../../public/authbg.jpg')] h-[600px] relative w-[400px] z-10 bg-center bg-cover overflow-hidden rounded-lg p-2 text-center">
				<button
					disabled={signUpMode}
					onClick={toggleSignInMode}
					className={` ${
						signUpMode ? "mt-[30%] text-xl " : "mt-[5%] text-3xl "
					} transition-all ease-in delay-300`}
				>
					{" "}
					<span
						className={`${
							signUpMode ? "invisible opacity-0 " : "visible opacity-100"
						} transition-all ease-in delay-300 `}
					>
						or
					</span>{" "}
					Sign Up
				</button>
				<strong className={"block my-2 text-sm text-red-500  " + `${showError ? "visible" : "invisible"} `}>
					{showError || "error"}
				</strong>
				<div
					className={`inline-block opacity-80 text-opacity-0 w-3/4 text-center ${
						signUpMode ? "" : "mt-[25%]"
					} transition-[margin] ease-in delay-300`}
				>
					<input
						type="text"
						className="w-full block rounded-t-lg border-b text-black placeholder:text-gray-800 p-3 text-left outline-none"
						placeholder="Name"
						value={username ?? ""}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="email"
						className="w-full block border-b text-gray-900 placeholder:text-gray-700 outline-none p-3 text-left"
						placeholder="Email"
						value={email ?? ""}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full block rounded-b-lg text-gray-900 placeholder:text-gray-700 p-3 outline-none text-left"
						value={password ?? ""}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="block w-full border p-2 rounded-lg bg-slate-600 text-white font-medium hover:text-gray-900 hover:bg-gray-100 mx-auto mt-4"
						onClick={registerUser}
					>
						Sign up
					</button>
					<button className="mt-2" onClick={toggleSignInMode}>
						or Log in
					</button>
				</div>

				<div
					className={`bg-[url('../../public/authbg2.avif')] absolute left-[-50%] ${
						signUpMode ? "top-full " : "top-[20%]"
					} h-[600px] w-[200%] bg-center bg-cover overflow-hidden rounded-lg p-2 text-center rounded-t-[45%] transition-[top] ease-in delay-300 `}
				>
					<h1 className="mt-[10%]">Login</h1>
					<strong className={"block my-2 text-sm text-red-500  " + `${showError ? "visible" : "invisible"} `}>
						{showError || "error"}
					</strong>
					<div className="inline-block opacity-80 text-opacity-0 w-[37.5%] text-center ">
						<input
							type="text"
							className="w-full block rounded-t-lg border-b text-black placeholder:text-gray-800 p-3 text-left outline-none"
							placeholder="Name"
							value={username ?? ""}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							className="w-full block rounded-b-lg text-gray-900 placeholder:text-gray-700 p-3 outline-none text-left"
							value={password ?? ""}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className="block w-full border p-2 rounded-lg bg-slate-600 text-white font-medium hover:text-gray-900 hover:bg-gray-100 mx-auto mt-4"
							onClick={registerUser}
						>
							Log in
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

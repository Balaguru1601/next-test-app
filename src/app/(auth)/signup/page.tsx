"use client";
import { useAuthStore } from "@/store/zustand";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/trpc";
import Link from "next/link";

type Props = {};

const SignUp = (props: Props) => {
	const router = useRouter();
	const { login } = useAuthStore();

	const [username, setUsername] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [showRegisterError, setShowRegisterError] = useState<string | null>(null);
	const [showLoginError, setShowLoginError] = useState<string | null>(null);
	const searchParam = useSearchParams().has("s");
	const [signUpMode, setSignUpMode] = useState<boolean>(searchParam);

	useEffect(() => {
		setSignUpMode(searchParam);
	}, [searchParam]);

	const createUser = trpc.user.register.useMutation({
		onSuccess: (data) => {
			if (data.success && data.username) {
				login({ username: data.username });
				router.push("/secret");
			} else if (data.success === false) {
				console.log(data);
				setShowRegisterError(data.message);
				setTimeout(() => {
					setShowRegisterError(null);
				}, 3000);
			}
		},
	});

	const loginUser = trpc.user.login.useMutation({
		onSuccess: (data) => {
			if (data.success && data.username) {
				login({ username: data.username });
				router.push("/secret");
			} else if (data.success === false) {
				console.log(data);
				setShowLoginError(data.message);
				setTimeout(() => {
					setShowLoginError(null);
				}, 3000);
			}
		},
	});

	const registerHandler = async () => {
		if (username && username.length > 0 && email && email.length && password && password.length) {
			createUser.mutate({ username, email, password });
		} else setShowRegisterError("All fields are required");
		setTimeout(() => {
			setShowRegisterError(null);
		}, 3000);
		return;
	};

	const loginHandler = async () => {
		if (username && username.length > 0 && password && password.length) {
			loginUser.mutate({ username, password });
		} else setShowLoginError("All fields are required");
		setTimeout(() => {
			setShowLoginError(null);
		}, 3000);
		return;
	};

	const toggleSignInMode = () => setSignUpMode((prev) => !prev);

	return (
		<div className=" flex w-full pt-[12.5vh] pb-5 justify-center items-center overflow-hidden z-10">
			<div className="bg-[url('../../public/authbg.jpg')] h-[550px] bg-[center_bottom_2.5rem] relative max-w-[400px] w-[90%] z-10 bg-cover overflow-hidden rounded-lg p-2 text-center">
				<button
					disabled={signUpMode}
					onClick={toggleSignInMode}
					className={` ${
						signUpMode ? "mt-[30%] text-3xl " : "mt-[8%] text-xl font-semibold"
					} transition-all ease-in delay-200`}
				>
					{" "}
					<span
						className={`${
							signUpMode ? "opacity-0 " : "opacity-100"
						} transition-all ease-in delay-200 text-xl text-red-400`}
					>
						or
					</span>{" "}
					Sign Up
				</button>
				<strong
					className={"block my-2 text-sm text-red-500  " + `${showRegisterError ? "visible" : "invisible"} `}
				>
					{showRegisterError || "error"}
				</strong>
				<div
					className={`inline-block opacity-80 text-opacity-0 w-3/4 text-center ${
						signUpMode ? "" : "mt-[25%]"
					} transition-[margin] ease-in delay-200`}
				>
					<form id="signup">
						<input
							type="text"
							className="w-full block rounded-t-lg border-b text-black placeholder:text-gray-800 p-3 text-left outline-none"
							placeholder="Name*"
							value={username ?? ""}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							type="email"
							className="w-full block border-b text-gray-900 placeholder:text-gray-700 outline-none p-3 text-left"
							placeholder="Email*"
							value={email ?? ""}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Password*"
							className="w-full block rounded-b-lg text-gray-900 placeholder:text-gray-700 p-3 outline-none text-left"
							value={password ?? ""}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className="block w-full border p-2 rounded-lg bg-slate-600 text-white font-medium hover:text-gray-900 hover:bg-gray-100 mx-auto mt-4"
							type="submit"
							form="signup"
							onClick={(e) => {
								e.preventDefault();
								registerHandler();
							}}
						>
							Sign up
						</button>
					</form>
				</div>

				<div
					className={`bg-[url('../../public/authbg7.jpg')] absolute left-[-50%] ${
						signUpMode ? "top-[85%] " : "top-[20%]"
					} h-[550px] w-[200%] bg-center bg-cover overflow-hidden rounded-lg p-2 text-center rounded-t-[45%] transition-[top] ease-in delay-200 text-black`}
				>
					<button
						disabled={!signUpMode}
						onClick={toggleSignInMode}
						className={` ${
							signUpMode ? "text-xl mt-4 text-black font-semibold " : "mt-[10%] text-3xl "
						} transition-all ease-in delay-200`}
					>
						{" "}
						<span
							className={`${
								!signUpMode ? "opacity-0 " : "opacity-100"
							} transition-all ease-in delay-200 text-xl text-[#707070] `}
						>
							or
						</span>{" "}
						Log in
					</button>
					<strong
						className={"block my-2 text-sm text-red-500  " + `${showLoginError ? "visible" : "invisible"} `}
					>
						{showLoginError || "error"}
					</strong>
					<div className="inline-block opacity-80 text-opacity-0 w-[37.5%] text-center ">
						<form id="login">
							<input
								type="text"
								className="w-full block rounded-t-lg border-b text-gray-900 placeholder:text-gray-700 p-3 text-left outline-none"
								placeholder="Name*"
								value={username ?? ""}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password*"
								className="w-full block rounded-b-lg text-gray-900 placeholder:text-gray-700 p-3 outline-none text-left"
								value={password ?? ""}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								className="block w-full border p-2 rounded-lg bg-slate-600 text-white font-medium hover:text-gray-900 hover:bg-gray-100 mx-auto mt-4"
								onClick={(e) => {
									e.preventDefault();
									loginHandler();
								}}
							>
								Log in
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

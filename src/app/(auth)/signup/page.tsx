"use client";
import { useAuthStore } from "@/store/zustand";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/trpc";
import Link from "next/link";
import Loader from "@/Components/Loader";

type Props = {};

const SignUp = (props: Props) => {
	const router = useRouter();
	const { login, isLoggedIn } = useAuthStore();

	const [username, setUsername] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [showRegisterError, setShowRegisterError] = useState<string | null>(null);
	const [showLoginError, setShowLoginError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const searchParam = useSearchParams().has("s");
	const redirect = useSearchParams().get("redirect") || "";
	const [signUpMode, setSignUpMode] = useState<boolean>(searchParam);

	useEffect(() => {
		setSignUpMode(searchParam);
	}, [searchParam]);

	useEffect(() => {
		if (isLoggedIn) return router.replace("/");
	}, [isLoggedIn, router]);

	const registerUser = trpc.user.register.useMutation({
		onSuccess: (data) => {
			if (data.success && data.username && data.userId) {
				login({ username: data.username, userId: data.userId });
				router.push("/" + redirect);
			} else if (data.success === false) {
				setLoading(false);
				setShowRegisterError(data.message);
				setTimeout(() => {
					setShowRegisterError(null);
				}, 3000);
			}
		},
		onSettled: (data) => console.log("settled"),
		onError: () => setLoading(false),
	});

	const loginUser = trpc.user.login.useMutation({
		onSuccess: (data) => {
			if (data.success && data.username && data.userId) {
				login({ username: data.username, userId: data.userId });
				router.push("/secret");
			} else if (data.success === false) {
				setLoading(false);
				setShowLoginError(data.message);
				setTimeout(() => {
					setShowLoginError(null);
				}, 3000);
			}
		},
	});

	const registerHandler = () => {
		if (username && username.length > 0 && email && email.length && password && password.length) {
			setLoading(true);
			registerUser.mutate({ username, email, password });
		} else setShowRegisterError("All fields are required");
		setTimeout(() => {
			setShowRegisterError(null);
		}, 3000);
		return;
	};

	const loginHandler = () => {
		if (username && username.length > 0 && password && password.length) {
			setLoading(true);
			loginUser.mutate({ username, password });
		} else setShowLoginError("All fields are required");
		setTimeout(() => {
			setShowLoginError(null);
		}, 3000);
		return;
	};

	const toggleSignInMode = () => {
		setSignUpMode((prev) => !prev);
		setEmail(null);
		setPassword(null);
		setUsername(null);
	};

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
							className="block w-full border p-2 rounded-lg bg-slate-600 text-white text-center font-medium hover:text-gray-900 hover:bg-gray-100 mx-auto mt-4"
							type="submit"
							form="signup"
							onClick={(e) => {
								e.preventDefault();
								registerHandler();
							}}
							disabled={loading}
						>
							{loading ? <Loader /> : "Sign up"}
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
								disabled={loading}
							>
								{loading ? <Loader /> : "Log in"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;

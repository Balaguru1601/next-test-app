"use client";
import { useAuthStore } from "@/store/zustand";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
	const router = useRouter();
	const username = useAuthStore().username;
	if (!username) router.replace("/");
	console.log(username);
	return <div>Welcome {username}</div>;
};

export default Page;

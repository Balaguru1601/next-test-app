"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/zustand";
import Link from "next/link";

export default function Home() {
	const router = useRouter();

	return (
		<div className="bg-[#272829] p-10 text-center">
			<h1 className="my-2">Hello</h1>
		</div>
	);
}

"use client";
import { trpc } from "./_trpc/trpc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/zustand";
import Link from "next/link";

export default function Home() {
	const router = useRouter();

	return (
		<div className="bg-[#272829] p-10 text-center">
			<h1 className="my-2">Hello</h1>
			<Link href={"/signup"} className="mx-2 inline-block mt-4 rounded-md border px-4 py-2">
				Sign up
			</Link>
			<Link href={"/login"} className="mx-2 inline-block mt-4 border rounded-md py-2 px-4">
				Login
			</Link>
		</div>
	);
}

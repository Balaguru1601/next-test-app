"use client";
import { useAuthStore } from "@/store/zustand";

type Props = {};

export default function Page(props: Props) {
	const { username } = useAuthStore();
	return <div>page {username}</div>;
}

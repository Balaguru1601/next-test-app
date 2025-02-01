"use client";
import { trpc } from "@/app/_trpc/trpc";
import { useZStore } from "@/store/zustand";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

export default function Page(props: Props) {
	const { logout } = useZStore().user;
	const secretReq = trpc.user.secretInfo.useQuery();
	if (secretReq.error) {
		logout();
		return redirect("/");
	}
	return <div>{secretReq.data?.message}</div>;
}

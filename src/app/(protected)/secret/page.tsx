"use client";
import { trpc } from "@/app/_trpc/trpc";
import { useAuthStore } from "@/store/zustand";
import { useEffect, useState } from "react";

type Props = {};

async function secretGetter() {
	// const req = trpc.user.secretInfo.useQuery()
}

export default function Page(props: Props) {
	const secretReq = trpc.user.secretInfo.useQuery();
	return <div>{secretReq.data?.message}</div>;
}

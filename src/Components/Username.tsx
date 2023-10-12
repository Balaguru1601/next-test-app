"use client";

import { useAuthStore } from "@/store/zustand";
import React from "react";

type Props = {};

export default function Username({}: Props) {
	const username = useAuthStore().username;
	return <span> {username}</span>;
}

"use client";
import React from "react";

type Props = {
	children: React.ReactNode;
};

export default function Layout(props: Props) {
	return <>{props.children}</>;
}

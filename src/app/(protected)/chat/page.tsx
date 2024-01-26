"use client";

import Loader from "@/Components/Loader";
import { trpc } from "@/app/_trpc/trpc";
import { useState } from "react";

type Props = {};

function Page({}: Props) {
	const data = trpc.user.getOnlineUsers.useQuery().data;

	return (
		<div>
			{data ? (
				data?.success && data?.users && data.users.length > 0 ? (
					<>
						{data.users.map((user) => (
							<div key={Math.random()}>{user.username}</div>
						))}
					</>
				) : (
					<>No online users available</>
				)
			) : (
				<Loader />
			)}
		</div>
	);
}

export default Page;

"use client";

import Loader from "@/Components/Loader";
import { trpc } from "@/app/_trpc/trpc";
import { useState } from "react";

type Props = {};

function Page({}: Props) {
	const data = trpc.user.getOnlineUsers.useQuery().data;
	const [currentChatWith, setCurrentChatWith] = useState();

	return (
		<div>
			<div className="p-4 grid grid-cols-[1fr_2fr]">
				<div className="bg-[rgba(25,147,147,0.2)] p-4">
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
						<div className="text-center">
							<Loader />
						</div>
					)}
				</div>
				<div className=" bg-no-repeat bg-fixed m-0 bg-chat-bg p-4"></div>
			</div>
		</div>
	);
}

export default Page;

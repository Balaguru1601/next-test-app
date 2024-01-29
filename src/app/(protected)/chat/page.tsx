"use client";

import ChatLayer from "@/Components/ChatLayer";
import Loader from "@/Components/Loader";
import { trpc } from "@/app/_trpc/trpc";
import { useState } from "react";

type Props = {};

function Page({}: Props) {
	const data = trpc.user.getOnlineUsers.useQuery().data;
	const [currentChatWith, setCurrentChatWith] = useState<number>();
	console.log("render");

	return (
		<div className="pb-4">
			<div className="grid grid-cols-[1fr_2fr] ">
				<div className="pt-2 bg-[rgba(25,147,147,0.2)] p-4">
					{data ? (
						data?.success && data?.users && data.users.length > 0 ? (
							<>
								{data.users.map((user) => (
									<div
										key={Math.random()}
										className="cursor-pointer"
										onClick={() => {
											setCurrentChatWith(user.id);
										}}
									>
										{user.username}
									</div>
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
				<div className=" bg-no-repeat bg-fixed m-0 bg-chat-bg p-4">
					{currentChatWith ? <ChatLayer recipientId={currentChatWith} /> : null}
				</div>
			</div>
		</div>
	);
}

export default Page;

"use client";

import ChatLayer from "@/Components/ChatLayer";
import Loader from "@/Components/Loader";
import { trpc } from "@/app/_trpc/trpc";
import { useEffect, useState } from "react";

type Props = {};

function Page({}: Props) {
	const { data, isLoading } = trpc.message.getAllChats.useQuery();
	const [loading, setLoading] = useState(true);
	// const [chatData, setChatData] = useState<
	// 	| {
	// 			user: {
	// 				id: number;
	// 				email: string;
	// 				username: string;
	// 			};
	// 			id: string;
	// 			createdAt: Date;
	// 			updatedAt: Date;
	// 	  }[]
	// 	| null
	// >(null);
	const [currentChatWith, setCurrentChatWith] = useState<number>();
	console.log("render");

	// useEffect(() => {
	// 	console.log("effect");
	// 	if (data?.chats) {
	// 		console.log("in");
	// 		// setChatData(data.chats);
	// 		setLoading(false);
	// 	}
	// }, []);

	return (
		<div className="pb-4 h-[80vh]">
			<div className="grid grid-cols-[1fr_2fr] ">
				<div className="pt-2 bg-[rgba(25,147,147,0.2)] p-4">
					{data && data.chats ? (
						<>
							{data.chats.map((chat) => (
								<div
									key={Math.random()}
									className="cursor-pointer"
									onClick={() => {
										setCurrentChatWith(chat.user.id);
									}}
								>
									{chat.user.username}
								</div>
							))}
						</>
					) : (
						!isLoading && <>Start Chatting now!</>
					)}
					{isLoading && (
						<div className="text-center">
							<Loader />
						</div>
					)}
				</div>
				<div className=" bg-no-repeat bg-fixed m-0 bg-chat-bg p-2 sm:p-4">
					{currentChatWith ? <ChatLayer recipientId={currentChatWith} /> : null}
				</div>
			</div>
		</div>
	);
}

export default Page;

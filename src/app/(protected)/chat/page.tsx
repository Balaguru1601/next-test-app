"use client";

import ChatLayer from "@/Components/Chat/ChatLayer";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import Loader from "@/Components/Loader";
import { trpc } from "@/app/_trpc/trpc";
import { useCallback, useEffect, useState } from "react";

type Props = {};

function Page({}: Props) {
	const { data, isLoading } = trpc.message.getAllChats.useQuery();
	const { data: onlineUsers } = trpc.user.getOnlineUsers.useQuery();
	const [loading, setLoading] = useState(true);
	// console.log(onlineUsers);
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

	useEffect(() => {
		console.log("chat change");
	}, [currentChatWith]);

	const togglePlayer = useCallback((event: KeyboardEvent) => {
		if (event.key !== "Escape") return;
		setCurrentChatWith(undefined);
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", togglePlayer);
		return () => window.removeEventListener("keydown", togglePlayer);
	}, [togglePlayer]);

	// useEffect(() => {
	// 	console.log("effect");
	// 	if (data?.chats) {
	// 		console.log("in");
	// 		// setChatData(data.chats);
	// 		setLoading(false);
	// 	}
	// }, []);

	// TODO - get all the messages of the user here and set it to the chatData state
	// TODO - Show users are online and offline
	// TODO - track last seen of the user
	// TODO - add a search bar to search for users

	return (
		<div className="pb-4 h-[80vh]">
			<div
				className="grid grid-cols-[1fr_2fr] "
				// onKeyDown={(e) => console.log(e.key)}
			>
				<ChatSidebar
					isLoading={isLoading}
					setCurrentChatWith={(t) => setCurrentChatWith(t)}
					chats={data?.chats}
				/>
				<div className=" bg-no-repeat bg-fixed m-0 bg-chat-bg p-2 sm:p-4">
					{currentChatWith ? <ChatLayer recipientId={currentChatWith} /> : null}
				</div>
			</div>
		</div>
	);
}

export default Page;

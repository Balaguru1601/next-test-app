"use client";

import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import { useZStore } from "@/store/zustand";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import Image from "next/image";
import moment from "moment";
import ChatInput from "./ChatInput";
import MessageBox from "./MessageBox";
import { EventTypes, socket } from "@/app/_socket/socket";

type Props = {
	recipientId: number;
};

// TODO - change the way we get messages, get all messages rather than individual chat
// TODO - make the message options to work
// TODO - use onmessagedelete and onmessageupdate to update the message in the chat - socket.io
// TODO - add typing to the chat input
// TODO - add emoji picker to the chat input

function ChatLayer({ recipientId }: Props) {
	const [loading, setLoading] = useState(true);
	const [resetScroller, setResetScroller] = useState(false);
	const [msgList, setMsgList] = useState<{ date: Date; messages: Message[] }[]>([]);
	const [chat, setChat] = useState<{
		chatId: string;
		messages: { date: Date; messages: Message[] }[];
	} | null>(null);

	const toggleResetScroller = () => setResetScroller((prev) => !prev);
	const chatRef = useRef<HTMLDivElement>(null);

	const chatData = trpc.message.loadIndividualChat.useMutation();
	useEffect(() => {
		setLoading(true);
		chatData.mutate(
			{ recipientId },
			{
				onSuccess: (data) => {
					if (data.chatId && data.messages) {
						console.log(data.messages);
						setChat({ chatId: data.chatId, messages: data.messages });
						setMsgList(data.messages);
						toggleResetScroller();
						console.log("chat data hydrated");
					}
					setLoading(false);
					return;
				},
				onError: (data) => {
					console.log(data);
					setLoading(false);
					return;
				},
			}
		);
	}, [recipientId]);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [msgList.length, resetScroller]);

	const userId = useZStore().user.userId!;

	useEffect(() => {
		const handleNewMessage = (data: Message) => {
			console.log("📨 message : ", data);
			if (!chat || data.chatId !== chat.chatId) return;
			setMsgList((prev) => {
				const t = [...prev];
				// find the index of the date in the msgList
				// if the date exists, add the message to the messages array
				const dateIndex = t.findIndex((item) =>
					moment.utc(data.sentAt).local().isSame(item.date, "date")
				);

				if (dateIndex > -1) {
					if (!t[dateIndex].messages.find((item) => item.id === data.id)) {
						t.splice(dateIndex, 1, {
							date: prev[dateIndex].date,
							messages: [...prev[dateIndex].messages, data],
						});
					}
				} else {
					t.push({
						date: new Date(new Date(data.sentAt).setHours(0, 0, 0, 0)),
						messages: [data],
					});
				}

				return t;
			});
			toggleResetScroller();
		};

		socket.on(EventTypes.SEND_MESSAGE, handleNewMessage);

		// Cleanup on unmount
		return () => {
			socket.off(EventTypes.SEND_MESSAGE, handleNewMessage);
		};
	}, []);

	// trpc.message.onSendMessage.useSubscription(undefined, {
	// 	onData: (data) => {
	// 		console.log("message", data.message);
	// 		let dateIndex = msgList.findIndex((item) =>
	// 			moment.utc(data.sentAt).local().isSame(item.date, "date")
	// 		);
	// 		if (dateIndex > -1) {
	// 			if (!msgList[msgList.length - 1].messages.find((item) => item.id === data.id)) {
	// 				setMsgList((prev) => {
	// 					const t = [...prev];
	// 					t.splice(dateIndex, 1, {
	// 						date: prev[dateIndex].date,
	// 						messages: [...prev[dateIndex].messages, data],
	// 					});
	// 					return t;
	// 				});
	// 				setResetScroller((prev) => !prev);
	// 			}
	// 		} else {
	// 			setMsgList((prev) => [
	// 				...prev,
	// 				{
	// 					date: new Date(new Date(data.sentAt).setHours(0, 0, 0, 0)),
	// 					messages: [data],
	// 				},
	// 			]);
	// 		}
	// 	},
	// });

	return (
		<div className="">
			{loading ? (
				<div className="text-center">
					<Loader />
				</div>
			) : (
				<>
					<ul className="list-none overflow-y-scroll chat-scrollbar pr-2 sm:p-4 sm:px-8  md:px-12 pb-0 max-h-[80vh]">
						{msgList.map((chat) => {
							const messages = chat.messages.map((msg) => (
								<MessageBox message={msg} userId={userId} key={Math.random()} />
							));
							// console.log(chat);
							return (
								<div className="" key={Math.random()}>
									<p className="text-center my-4">
										{moment(chat.date).isSame(moment(), "D")
											? "TODAY"
											: moment(chat.date).format("Do MMM YY")}
									</p>
									{messages}
								</div>
							);
						})}
						<div ref={chatRef} />
					</ul>
					<div className="pr-4">
						<ChatInput
							recipientId={recipientId}
							chatId={chat?.chatId}
							msgList={msgList}
							setMsgList={setMsgList}
							resetScroller={toggleResetScroller}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default ChatLayer;

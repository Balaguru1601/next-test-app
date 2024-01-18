"use client";

import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import { useAuthStore } from "@/store/zustand";
import React, { useEffect, useState } from "react";

type Props = {
	params: {
		roomId: string;
	};
};

const RoomId = (props: Props) => {
	const { roomId } = props.params;
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState<string[]>([]);
	const [msgList, setMsgList] = useState<Message[]>([]);
	const sendMessage = trpc.message.sendMessage.useMutation({
		onSuccess: (data) => {
			setMessages((prev) => [...prev, newMessage]);
			setNewMessage("");
		},
	});

	console.log("render");

	// useEffect(() => {
	const messageSubscription = trpc.message.onSendMessage.useSubscription(
		{ chatId: roomId },
		{
			onData: (data) => {
				const d: Message = {
					id: data.id,
					senderId: data.senderId,
					sentAt: new Date(data.sentAt),
					chatId: data.chatId,
					receiverId: data.receiverId,
					viewed: data.viewed,
					message: data.message,
				};
				if (!msgList.find((item) => item.id === d.id)) {
					setMsgList((prev) => [...prev, d]);
				}
			},
		}
	);
	// }, []);

	const userId = useAuthStore().userId!;

	const messageHandler = (msg: string) => {
		sendMessage.mutate({ message: msg, senderId: userId, receiverId: 2, chatId: roomId });
	};

	return (
		<>
			<div className="p-4">
				<h2 className="my-2">RoomId {roomId}</h2>
				<button>get online</button>
				{msgList.map((msg) => (
					<div className="my-1" key={Math.random()}>
						{msg.message}
					</div>
				))}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (newMessage.length > 0) messageHandler(newMessage);
					}}
				>
					<input
						type="text"
						placeholder="Send message"
						className="text-black rounded p-1"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
					/>
					<button className="mx-2 border p-1 border-white px-3 rounded hover:bg-gray-800 ">Send</button>
				</form>
			</div>
		</>
	);
};

export default RoomId;

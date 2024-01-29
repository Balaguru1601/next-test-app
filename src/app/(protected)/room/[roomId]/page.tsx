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
	const sendMessage = trpc.message.sendIndividualMessage.useMutation({
		onSuccess: (data) => {
			console.log(data);
			setMessages((prev) => [...prev, newMessage]);
			setNewMessage("");
		},
	});

	const userId = useAuthStore().userId!;

	const messageHandler = (msg: string) => {
		sendMessage.mutate({ message: msg, senderId: userId, recipientId: userId === 1 ? 2 : 1, chatId: roomId });
	};

	return (
		<>
			<div className="p-4 grid grid-cols-[1fr_2fr]">
				<div className="bg-[rgba(25,147,147,0.2)] p-4"></div>
				<div className=" bg-no-repeat bg-fixed m-0 bg-chat-bg p-4">
					<h2 className="my-2">RoomId {roomId}</h2>
					{/* <button>get online</button> */}
					<ul className="list-none overflow-y-scroll overflow-x-hidden ">
						{msgList.map((msg) => (
							<li
								className={`my-1 px-2 ${msg.senderId === userId ? "bg-red-400 text-right " : ""} `}
								key={Math.random()}
							>
								{msg.message}
							</li>
						))}
					</ul>
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
			</div>
		</>
	);
};

export default RoomId;

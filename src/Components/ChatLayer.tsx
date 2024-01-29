"use client";

import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import { useAuthStore } from "@/store/zustand";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type Props = {
	recipientId: number;
};

function ChatLayer({ recipientId }: Props) {
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [msgList, setMsgList] = useState<Message[]>([]);
	const [chat, setChat] = useState<{
		chatId: string;
		messages: Message[];
	} | null>(() => {
		return null;
	});

	const [sendingMessage, setSendingMessage] = useState(false);

	const chatData = trpc.message.loadIndividualChat.useMutation();
	useEffect(() => {
		chatData.mutate(
			{ recipientId },
			{
				onSuccess: (data) => {
					if (data.chatId && data.messages) {
						setChat({ chatId: data.chatId, messages: data.messages });
						setMsgList(data.messages);
					}
					setLoading(false);
					return;
				},
			}
		);
	}, []);

	const sendMessage = trpc.message.sendIndividualMessage.useMutation({
		onSettled: () => setSendingMessage(false),
	});

	const userId = useAuthStore().userId!;

	const messageHandler = (msg: string) => {
		if (chat) {
			setSendingMessage(true);
			sendMessage.mutate({ message: msg, senderId: userId, recipientId, chatId: chat.chatId });
		}
	};

	trpc.message.onSendMessage.useSubscription(undefined, {
		onData: (data) => {
			setSendingMessage(false);
			if (!msgList.find((item) => item.id === data.id)) {
				setMsgList((prev) => [...prev, data]);
			}
			setNewMessage("");
		},
	});

	return (
		<div className="">
			{loading ? (
				<div className="text-center">
					<Loader />
				</div>
			) : (
				<>
					{" "}
					<ul className="list-none overflow-y-scroll overflow-x-hidden chat-scrollbar p-4 max-h-[80vh]">
						{msgList.map((msg) => (
							<div key={Math.random()} className={msg.senderId === userId ? "text-right" : ""}>
								<li
									className={`mb-3 py-2 bg-[rgba(25,147,147,0.2)] rounded-lg text-lg inline-block clear-both relative ${
										msg.senderId === userId
											? " text-[#0AD5C1] pl-4 pr-6"
											: "text-[#0EC879] pl-6 pr-4"
									} `}
								>
									{msg.message}
								</li>
							</div>
						))}
					</ul>
					<div className="text-right pr-4">
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
							<button
								disabled={sendingMessage}
								className="mx-2 border p-1 border-white px-3 rounded hover:bg-gray-800 "
							>
								{sendingMessage ? <Loader /> : "Send"}
							</button>
						</form>
					</div>
				</>
			)}
		</div>
	);
}

export default ChatLayer;

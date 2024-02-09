"use client";

import React, { useState } from "react";
import Loader from "./Loader";
import { useAuthStore } from "@/store/zustand";
import { trpc } from "@/app/_trpc/trpc";
import moment from "moment";
import { Message } from "@/constants/messageSchema";

type Props = {
	setSendingMessage?: () => void;
	recipientId: number;
	msgList: { date: Date; messages: Message[] }[];
	setMsgList: React.Dispatch<
		React.SetStateAction<
			{
				date: Date;
				messages: Message[];
			}[]
		>
	>;
	chatId?: string;
	resetScroller: () => void;
};

function ChatInput({ msgList, setMsgList, chatId, recipientId, resetScroller }: Props) {
	const [newMessage, setNewMessage] = useState("");
	const [sendingMessage, setSendingMessage] = useState(false);

	const sendMessage = trpc.message.sendIndividualMessage.useMutation({
		onSettled: () => setSendingMessage(false),
		onSuccess: (data) => {
			if (data.success && data.chat) {
				setSendingMessage(false);
				const sentAt = new Date(data.chat!.sentAt).toISOString();
				let dateIndex = msgList.findIndex((item) =>
					moment(new Date(data.chat!.sentAt)).isSame(item.date, "date")
				);
				if (dateIndex > -1) {
					if (
						!msgList[msgList.length - 1].messages.find(
							(item) => item.id === data.chat!.id
						)
					) {
						setMsgList((prev) => {
							const t = [...prev];
							t.splice(dateIndex, 1, {
								date: prev[dateIndex].date,
								messages: [...prev[dateIndex].messages, { ...data.chat!, sentAt }],
							});
							return t;
						});
						resetScroller();
					}
				} else {
					setMsgList((prev) => [
						...prev,
						{
							date: new Date(new Date(data.chat!.sentAt).setHours(0, 0, 0, 0)),
							messages: [data.chat!],
						},
					]);
				}
				setNewMessage("");
			}
		},
	});

	const userId = useAuthStore().userId!;

	const messageHandler = (msg: string) => {
		if (chatId) {
			setSendingMessage(true);
			sendMessage.mutate({
				message: msg,
				senderId: userId,
				recipientId,
				chatId: chatId,
			});
		}
	};
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (newMessage.length > 0) messageHandler(newMessage);
			}}
		>
			<div className="sm:pr-20 pr-10 pl-4 relative">
				<input
					type="text"
					placeholder="Send message"
					className="rounded p-2 w-full text-lg focus:outline-none border-none bg-transparent inline-block text-[#0AD5C1]"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button
					disabled={sendingMessage}
					className="py-2 text-center border-white sm:px-3 px-2 rounded absolute hover:bg-gray-800"
				>
					{sendingMessage ? (
						<Loader />
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="#0AD5C1"
							className="w-8 h-8 "
							viewBox="0 0 24 24"
						>
							<path d="M2 21l20-9L2 3v7l15 2-15 2z" />
							<path d="M0 0h24v24H0z" fill="none" />
						</svg>
					)}
				</button>
			</div>
		</form>
	);
}

export default ChatInput;

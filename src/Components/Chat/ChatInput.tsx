"use client";

import React, { useRef, useState } from "react";
import Loader from "../Loader";
import { useZStore } from "@/store/zustand";
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
	const inputRef = useRef<HTMLInputElement>(null);

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
					resetScroller();
				}
				setNewMessage("");
				inputRef.current?.focus();
			}
		},
	});

	const userId = useZStore().user.userId!;

	const messageHandler = (msg: string) => {
		if (chatId) {
			setSendingMessage(true);
			sendMessage.mutate({
				message: msg,
				senderId: userId,
				recipientId,
				chatId: chatId,
				sentAt: new Date().toISOString(),
			});
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (newMessage.trim().length > 0) messageHandler(newMessage.trim());
			}}
			className="border-t border-[rgba(25,147,147,0.3)] bg-[rgba(0,0,0,0.2)]"
		>
			<div className="flex items-center gap-2 px-4 py-3">
				<input
					ref={inputRef}
					type="text"
					placeholder="Type a message..."
					className="flex-1 rounded-full px-4 py-2 text-base focus:outline-none border border-[rgba(25,147,147,0.4)] bg-[rgba(25,147,147,0.08)] text-[#0AD5C1] placeholder:text-[rgba(10,213,193,0.35)] focus:border-[rgba(25,147,147,0.7)] transition-colors"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					autoFocus
				/>
				<button
					type="submit"
					disabled={sendingMessage || newMessage.trim().length === 0}
					className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(25,147,147,0.5)] hover:bg-[rgba(25,147,147,0.7)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					title="Send message"
				>
					{sendingMessage ? (
						<Loader />
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="#0AD5C1"
							className="w-5 h-5"
							viewBox="0 0 24 24"
						>
							<path d="M2 21l20-9L2 3v7l15 2-15 2z" />
						</svg>
					)}
				</button>
			</div>
		</form>
	);
}

export default ChatInput;

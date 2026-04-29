"use client";

import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import { useZStore } from "@/store/zustand";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import moment from "moment";
import ChatInput from "./ChatInput";
import MessageBox from "./MessageBox";
import { EventTypes, socket } from "@/app/_socket/socket";

type Props = {
	recipientId: number;
	recipientName: string;
	onBack: () => void;
};

const handleNewMessage = (
	data: Message,
	setMsgList: React.Dispatch<
		React.SetStateAction<
			{
				date: Date;
				messages: Message[];
			}[]
		>
	>,
	chatId?: string
) => {
	setMsgList((prev) => {
		if (!chatId || data.chatId !== chatId) return prev;
		const t = [...prev];
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
};

const handleAllDeleteMessage = (
	data: { success: boolean; message: Message },
	setMsgList: React.Dispatch<
		React.SetStateAction<
			{
				date: Date;
				messages: Message[];
			}[]
		>
	>,
	chatId?: string
) => {
	const { message } = data;
	if (!data.success) return;
	setMsgList((prev) => {
		if (!chatId || message.chatId !== chatId) return prev;
		const t = [...prev];
		const dateIndex = t.findIndex((item) =>
			moment.utc(message.sentAt).local().isSame(item.date, "date")
		);
		if (dateIndex > -1) {
			const msgIndex = t[dateIndex].messages.findIndex((item) => item.id === message.id);
			if (msgIndex > -1) {
				t[dateIndex].messages.splice(msgIndex, 1);
			}
			if (t[dateIndex].messages.length === 0) {
				t.splice(dateIndex, 1);
			}
		}
		return t;
	});
};

const handleEditMessage = (
	data: { success: boolean; message: Message },
	setMsgList: React.Dispatch<
		React.SetStateAction<
			{
				date: Date;
				messages: Message[];
			}[]
		>
	>,
	chatId?: string
) => {
	if (!data.success) return;
	const { message } = data;
	setMsgList((prev) => {
		if (!chatId || message.chatId !== chatId) return prev;
		const t = [...prev];
		const dateIndex = t.findIndex((item) =>
			moment.utc(message.sentAt).local().isSame(item.date, "date")
		);
		if (dateIndex > -1) {
			const msgIndex = t[dateIndex].messages.findIndex((item) => item.id === message.id);
			if (msgIndex > -1) {
				t[dateIndex].messages[msgIndex] = message;
			}
		}
		return t;
	});
};

const handleSelfDeleteMessage = (
	data: Message,
	setMsgList: React.Dispatch<
		React.SetStateAction<
			{
				date: Date;
				messages: Message[];
			}[]
		>
	>,
	chatId?: string
) => {
	setMsgList((prev) => {
		if (!chatId || data.chatId !== chatId) return prev;
		const t = [...prev];
		const dateIndex = t.findIndex((item) =>
			moment.utc(data.sentAt).local().isSame(item.date, "date")
		);
		if (dateIndex > -1) {
			const msgIndex = t[dateIndex].messages.findIndex((item) => item.id === data.id);
			if (msgIndex > -1) {
				t[dateIndex].messages.splice(msgIndex, 1);
			}
			if (t[dateIndex].messages.length === 0) {
				t.splice(dateIndex, 1);
			}
		}
		return t;
	});
};

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

function ChatLayer({ recipientId, recipientName, onBack }: Props) {
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
		setMsgList([]);
		setChat(null);
		chatData.mutate(
			{ recipientId },
			{
				onSuccess: (data) => {
					if (data.chatId && data.messages) {
						setChat({ chatId: data.chatId, messages: data.messages });
						setMsgList(data.messages);
						toggleResetScroller();
					}
					setLoading(false);
				},
				onError: () => {
					setLoading(false);
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
		socket.on(EventTypes.SEND_MESSAGE, (data: Message) =>
			handleNewMessage(data, setMsgList, chat?.chatId)
		);
		socket.on(EventTypes.DETELE_MESSAGE, (data: { success: boolean; message: Message }) =>
			handleAllDeleteMessage(data, setMsgList, chat?.chatId)
		);
		socket.on(EventTypes.EDIT_MESSAGE, (data: { success: boolean; message: Message }) =>
			handleEditMessage(data, setMsgList, chat?.chatId)
		);
		return () => {
			socket.off(EventTypes.SEND_MESSAGE, handleNewMessage);
			socket.off(EventTypes.DETELE_MESSAGE, handleAllDeleteMessage);
			socket.off(EventTypes.EDIT_MESSAGE, handleEditMessage);
		};
	}, [chat]);

	return (
		<div className="flex flex-col h-full">
			{/* Chat header */}
			<div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(25,147,147,0.3)] bg-[rgba(0,0,0,0.25)] flex-shrink-0">
				<button
					onClick={onBack}
					className="p-1 rounded hover:bg-[rgba(25,147,147,0.2)] transition-colors text-[rgba(10,213,193,0.6)] hover:text-[#0AD5C1]"
					title="Back"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<div className="w-9 h-9 rounded-full bg-teal-700 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
					{getInitials(recipientName)}
				</div>
				<div>
					<p className="text-[#0AD5C1] font-semibold leading-tight">{recipientName}</p>
				</div>
			</div>

			{/* Messages area */}
			{loading ? (
				<div className="flex-1 flex items-center justify-center">
					<Loader />
				</div>
			) : (
				<>
					<ul className="flex-1 list-none overflow-y-scroll chat-scrollbar px-4 sm:px-8 md:px-12 py-4 space-y-0">
						{msgList.length === 0 && (
							<li className="flex items-center justify-center h-full pt-16">
								<p className="text-[rgba(10,213,193,0.3)] text-sm">
									No messages yet. Say hello!
								</p>
							</li>
						)}
						{msgList.map((messagedByDate) => {
							const messages = messagedByDate.messages.map((msg) => {
								if (msg.deletedBy !== userId && msg.deletionScope !== "ALL")
									return (
										<MessageBox
											message={msg}
											userId={userId}
											key={msg.id}
											handleSelfDeleteMessage={(data) =>
												handleSelfDeleteMessage(
													data,
													setMsgList,
													chat?.chatId
												)
											}
											handleEditMessage={(data) =>
												handleEditMessage(data, setMsgList, chat?.chatId)
											}
										/>
									);
							});
							if (messages.filter(Boolean).length)
								return (
									<div key={messagedByDate.date.toString()}>
										<p className="text-center text-xs text-[rgba(10,213,193,0.45)] my-4 font-medium tracking-wider uppercase">
											{moment(messagedByDate.date).isSame(moment(), "D")
												? "Today"
												: moment(messagedByDate.date).format("Do MMM YYYY")}
										</p>
										{messages}
									</div>
								);
						})}
						<div ref={chatRef} />
					</ul>

					<ChatInput
						recipientId={recipientId}
						chatId={chat?.chatId}
						msgList={msgList}
						setMsgList={setMsgList}
						resetScroller={toggleResetScroller}
					/>
				</>
			)}
		</div>
	);
}

export default ChatLayer;

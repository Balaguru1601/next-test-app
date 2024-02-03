"use client";

import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import { useAuthStore } from "@/store/zustand";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Image from "next/image";

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

	const chatRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [msgList.length]);

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
			setMsgList((prev) => [...prev, data]);
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
					<ul className="list-none overflow-y-scroll chat-scrollbar pr-2 sm:p-4 sm:pr-4 pb-0 max-h-[80vh]">
						{msgList.map((msg) => (
							<MessageBox message={msg} userId={userId} key={Math.random()} />
						))}
						<div ref={chatRef} />
					</ul>
					<div className="pr-4">
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
					</div>
				</>
			)}
		</div>
	);
}

function MessageBox({ message, userId }: { message: Message; userId: number }) {
	const [showOptions, setShowOptions] = useState(false);
	const [isFocussed, setIsFocussed] = useState(false);

	const optionsRef = useRef<HTMLButtonElement>(null);

	function toggleShowOption(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (!showOptions) {
			optionsRef.current && optionsRef.current.focus();
		}
		setShowOptions((prev) => {
			return !prev;
		});
	}

	return (
		<li className={message.senderId === userId ? "text-right relative" : "relative"}>
			<p
				className={`mb-3 py-2 bg-[rgba(25,147,147,0.2)] text-left rounded-lg text-lg inline-block clear-both relative ${
					message.senderId === userId ? " text-[#0AD5C1] pl-4 pr-6" : "text-[#0EC879] pl-6 pr-4"
				} `}
			>
				{message.message}
				<button
					title="options"
					className="ml-2"
					tabIndex={-1}
					ref={optionsRef}
					onBlur={(e) => {
						console.log("blur");
						setShowOptions(false);
					}}
					onClick={toggleShowOption}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M6 12L12 18L18 12" />
					</svg>
					<span
						className={
							"absolute px-1 bg-[rgba(25,147,147,0.2)]" +
							`${message.senderId === userId ? " right-0" : " left-0"}`
						}
					>
						{showOptions && (
							<>
								<button className="block">Delete</button>
								<button className="block">Edit</button>
							</>
						)}
					</span>
				</button>
			</p>
		</li>
	);
}

export default ChatLayer;

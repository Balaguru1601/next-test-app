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
					<ul className="list-none overflow-y-scroll chat-scrollbar pr-2 sm:p-4 sm:px-8  md:px-12 pb-0 max-h-[80vh]">
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

	const optionsRef = useRef<HTMLDivElement>(null);

	function toggleShowOption(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (!showOptions) {
			optionsRef.current && optionsRef.current.focus();
		}
		setShowOptions((prev) => {
			return !prev;
		});
	}

	return (
		<li className={`${message.senderId === userId ? "text-right " : ""} relative`}>
			<div className="bg-[rgba(25,147,147,0.2)] max-w-[50%] text-left text-[#0AD5C1] inline-block mb-3 rounded-lg px-1">
				<p
					className={`py-2 text-lg inline-block clear-both relative ${
						message.senderId === userId ? " text-[#0AD5C1] pl-4" : "text-[#0EC879] pl-4"
					} `}
				>
					{message.message}
				</p>
				<div
					title="options"
					className="ml-2 relative cursor-pointer inline-block float-right"
					tabIndex={-1}
					ref={optionsRef}
					onBlur={(e) => setShowOptions(false)}
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
							"absolute mt-2 bg-[#104f4f] opacity-100 z-50 rounded" +
							`${message.senderId === userId ? " right-0" : " left-0"}` +
							`${showOptions ? " border border-gray-400" : ""}`
						}
					>
						{showOptions && (
							<>
								<button
									className="block px-2 pb-1 hover:bg-[rgba(25,147,147,0.2)] w-full text-left"
									title=""
								>
									Delete
								</button>
								{message.senderId === userId && (
									<button
										className="block px-2 pb-1 hover:bg-[rgba(25,147,147,0.2)] w-full text-left"
										title=""
									>
										Edit
									</button>
								)}
							</>
						)}
					</span>
				</div>
			</div>
		</li>
	);
}

export default ChatLayer;

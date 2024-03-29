"use client";

import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import { useAuthStore } from "@/store/zustand";
import React, { use, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Image from "next/image";
import moment from "moment";
import ChatInput from "./ChatInput";

type Props = {
	recipientId: number;
};

function ChatLayer({ recipientId }: Props) {
	const [loading, setLoading] = useState(true);
	const [resetScroller, setResetScroller] = useState(false);
	const [msgList, setMsgList] = useState<{ date: Date; messages: Message[] }[]>([]);
	const [chat, setChat] = useState<{
		chatId: string;
		messages: { date: Date; messages: Message[] }[];
	} | null>(() => {
		return null;
	});

	const toggleResetScroller = () => setResetScroller((prev) => !prev);
	const chatRef = useRef<HTMLDivElement>(null);

	const chatData = trpc.message.loadIndividualChat.useMutation();
	useEffect(() => {
		console.log("fired!!");
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
				onError: (data) => {
					console.log(data);
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
	}, [msgList.length, resetScroller]);

	const userId = useAuthStore().userId!;

	trpc.message.onSendMessage.useSubscription(undefined, {
		onData: (data) => {
			let dateIndex = msgList.findIndex((item) =>
				moment.utc(data.sentAt).local().isSame(item.date, "date")
			);
			if (dateIndex > -1) {
				if (!msgList[msgList.length - 1].messages.find((item) => item.id === data.id)) {
					setMsgList((prev) => {
						const t = [...prev];
						t.splice(dateIndex, 1, {
							date: prev[dateIndex].date,
							messages: [...prev[dateIndex].messages, data],
						});
						return t;
					});
					setResetScroller((prev) => !prev);
				}
			} else {
				setMsgList((prev) => [
					...prev,
					{
						date: new Date(new Date(data.sentAt).setHours(0, 0, 0, 0)),
						messages: [data],
					},
				]);
			}
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
						{msgList.map((chat) => {
							const messages = chat.messages.map((msg) => (
								<MessageBox message={msg} userId={userId} key={Math.random()} />
							));
							return (
								<div className="" key={Math.random()}>
									<p className="text-center my-4">
										{moment(chat.date).format("Do MMM YY")}
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

function MessageBox({ message, userId }: { message: Message; userId: number }) {
	const [showOptions, setShowOptions] = useState(false);

	const optionsRef = useRef<HTMLDivElement>(null);

	function toggleShowOption(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();
		e.stopPropagation();
		if (!showOptions) {
			optionsRef.current && optionsRef.current.focus();
		}
		setShowOptions((prev) => {
			return !prev;
		});
	}

	const messageSentAt = moment.utc(message.sentAt).local().format("HH:mm");

	return (
		<li className={`${message.senderId === userId ? "text-right " : " "}`}>
			<div
				className={
					"group max-w-[50%] bg-[rgba(25,147,147,0.2)] text-left relative text-[#0AD5C1] inline-block mb-3 rounded-lg px-1" +
					`${message.senderId === userId ? " rounded-tr-none" : " rounded-tl-none"}`
				}
			>
				<div className="flex z-0">
					<p
						className={`py-2 pr-3 text-lg pl-2 ${
							message.senderId === userId ? " text-[#0AD5C1]" : "text-[#0EC879]"
						} `}
					>
						{message.message}
					</p>
					<small className="self-end text-xs pr-1 pb-1">{messageSentAt}</small>
					<div className="self-end text-xs pb-1">
						{message.sentAt && message.receivedAt === null && (
							<svg
								viewBox="0 0 12 11"
								height="11"
								width="16"
								className=""
								preserveAspectRatio="xMidYMid meet"
								fill="none"
							>
								<path
									d="M11.1549 0.652832C11.0745 0.585124 10.9729 0.55127 10.8502 0.55127C10.7021 0.55127 10.5751 0.610514 10.4693 0.729004L4.28038 8.36523L1.87461 6.09277C1.8323 6.04622 1.78151 6.01025 1.72227 5.98486C1.66303 5.95947 1.60166 5.94678 1.53819 5.94678C1.407 5.94678 1.29275 5.99544 1.19541 6.09277L0.884379 6.40381C0.79128 6.49268 0.744731 6.60482 0.744731 6.74023C0.744731 6.87565 0.79128 6.98991 0.884379 7.08301L3.88047 10.0791C4.02859 10.2145 4.19574 10.2822 4.38194 10.2822C4.48773 10.2822 4.58929 10.259 4.68663 10.2124C4.78396 10.1659 4.86436 10.1003 4.92784 10.0156L11.5738 1.59863C11.6458 1.5013 11.6817 1.40186 11.6817 1.30029C11.6817 1.14372 11.6183 1.01888 11.4913 0.925781L11.1549 0.652832Z"
									fill="currentcolor"
								></path>
							</svg>
						)}
						{message.receivedAt !== null && (
							<svg
								viewBox="0 0 12 11"
								height="11"
								width="16"
								preserveAspectRatio="xMidYMid meet"
								fill="none"
							>
								<path
									d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 
                                    1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 
                                    7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 
                                    10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 
                                    1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 
                                    0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
									fill="currentColor"
								></path>
							</svg>
						)}
					</div>
				</div>
				<div
					title="options"
					className={`absolute right-1 top-0 cursor-pointer ${
						showOptions ? " z-10 " : " -z-10 "
					} group-hover:z-10`}
					tabIndex={-1}
					ref={optionsRef}
					onBlur={(e) => {
						e.stopPropagation();
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
							"absolute mt-0 bg-[#104f4f] opacity-100 z-50 rounded" +
							`${message.senderId === userId ? " left-0" : " left-0"}` +
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
				{message.senderId === userId ? (
					<span className="absolute z-0 top-0 right-[-16px] border-b-[16px] border-l-[16px] border-b-transparent border-l-[rgba(25,147,147,0.2)] rounded-tr" />
				) : (
					<span className="absolute z-0 top-0 left-[-16px] border-b-[16px] border-r-[16px] border-b-transparent border-r-[rgba(25,147,147,0.2)] rounded-tl" />
				)}
			</div>
		</li>
	);
}

export default ChatLayer;

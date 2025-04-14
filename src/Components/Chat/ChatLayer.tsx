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
	console.log("📨 incoming message : ", data);
	setMsgList((prev) => {
		if (!chatId || data.chatId !== chatId) return prev;
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
	console.log("📨 - all message  deleted : ", data);
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
	console.log("📨 - message edited : ", data);
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
	console.log("📨 message deleted : ", data);
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
						setChat({ chatId: data.chatId, messages: data.messages });
						setMsgList(data.messages);
						toggleResetScroller();
						console.log("chat data", data.messages);
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
		// console.log("effect for handle msgs");
		// const handleNewMessage = (data: Message) => {
		// 	console.log("📨 incoming message : ", data);
		// 	setMsgList((prev) => {
		// 		if (!chat || data.chatId !== chat.chatId) return prev;
		// 		const t = [...prev];
		// 		// find the index of the date in the msgList
		// 		// if the date exists, add the message to the messages array
		// 		const dateIndex = t.findIndex((item) =>
		// 			moment.utc(data.sentAt).local().isSame(item.date, "date")
		// 		);
		// 		if (dateIndex > -1) {
		// 			if (!t[dateIndex].messages.find((item) => item.id === data.id)) {
		// 				t.splice(dateIndex, 1, {
		// 					date: prev[dateIndex].date,
		// 					messages: [...prev[dateIndex].messages, data],
		// 				});
		// 			}
		// 		} else {
		// 			t.push({
		// 				date: new Date(new Date(data.sentAt).setHours(0, 0, 0, 0)),
		// 				messages: [data],
		// 			});
		// 		}

		// 		return t;
		// 	});
		// 	toggleResetScroller();
		// };
		socket.on(EventTypes.SEND_MESSAGE, (data: Message) =>
			handleNewMessage(data, setMsgList, chat?.chatId)
		);

		// const handleAllDeleteMessage = (data: { success: boolean; message: Message }) => {
		// 	console.log("📨 - all message  deleted : ", data);
		// 	const { message } = data;
		// 	if (!data.success) return;

		// 	setMsgList((prev) => {
		// 		if (!chat || message.chatId !== chat.chatId) return prev;
		// 		const t = [...prev];
		// 		const dateIndex = t.findIndex((item) =>
		// 			moment.utc(message.sentAt).local().isSame(item.date, "date")
		// 		);

		// 		if (dateIndex > -1) {
		// 			const msgIndex = t[dateIndex].messages.findIndex(
		// 				(item) => item.id === message.id
		// 			);
		// 			if (msgIndex > -1) {
		// 				t[dateIndex].messages.splice(msgIndex, 1);
		// 			}
		// 			if (t[dateIndex].messages.length === 0) {
		// 				t.splice(dateIndex, 1);
		// 			}
		// 		}
		// 		return t;
		// 	});
		// };
		socket.on(EventTypes.DETELE_MESSAGE, (data: { success: boolean; message: Message }) =>
			handleAllDeleteMessage(data, setMsgList, chat?.chatId)
		);

		// const handleEditMessage = (data: { success: boolean; message: Message }) => {
		// 	if (!data.success) return;
		// 	const { message } = data;
		// 	console.log("📨 - message edited : ", data);
		// 	setMsgList((prev) => {
		// 		if (!chat || message.chatId !== chat.chatId) return prev;
		// 		const t = [...prev];
		// 		const dateIndex = t.findIndex((item) =>
		// 			moment.utc(message.sentAt).local().isSame(item.date, "date")
		// 		);
		// 		if (dateIndex > -1) {
		// 			const msgIndex = t[dateIndex].messages.findIndex(
		// 				(item) => item.id === message.id
		// 			);
		// 			if (msgIndex > -1) {
		// 				t[dateIndex].messages[msgIndex] = message;
		// 			}
		// 		}
		// 		return t;
		// 	});
		// };
		socket.on(EventTypes.EDIT_MESSAGE, (data: { success: boolean; message: Message }) =>
			handleEditMessage(data, setMsgList, chat?.chatId)
		);

		// Cleanup on unmount
		return () => {
			socket.off(EventTypes.SEND_MESSAGE, handleNewMessage);
			socket.off(EventTypes.DETELE_MESSAGE, handleAllDeleteMessage);
			socket.off(EventTypes.EDIT_MESSAGE, handleEditMessage);
		};
	}, [chat]);

	// const handleSelfDeleteMessage = (data: Message) => {
	// 	console.log("📨 message deleted : ", data);
	// 	setMsgList((prev) => {
	// 		if (!chat || data.chatId !== chat.chatId) return prev;
	// 		const t = [...prev];
	// 		const dateIndex = t.findIndex((item) =>
	// 			moment.utc(data.sentAt).local().isSame(item.date, "date")
	// 		);

	// 		if (dateIndex > -1) {
	// 			const msgIndex = t[dateIndex].messages.findIndex((item) => item.id === data.id);
	// 			if (msgIndex > -1) {
	// 				t[dateIndex].messages.splice(msgIndex, 1);
	// 			}
	// 			if (t[dateIndex].messages.length === 0) {
	// 				t.splice(dateIndex, 1);
	// 			}
	// 		}
	// 		return t;
	// 	});
	// };

	// const handleEditMessage = (data: Message) => {
	//     console.log("📨 message edited : ", data)
	//     setMsgList((prev) => {
	//         if (!chat || data.chatId !== chat.chatId) return prev;
	//         const t = [...prev];
	//         const dateIndex = t.findIndex((item) =>
	//             moment.utc(data.sentAt).local().isSame(item.date, "date")
	//         );
	//         if (dateIndex > -1) {
	//             const msgIndex = t[dateIndex].messages.findIndex((item) => item.id === data.id);
	//             if (msgIndex > -1) {
	//                 t[dateIndex].messages[msgIndex] = data;
	//             }
	//         }
	//         return t;
	//     });
	// };

	//     };

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
						{msgList.map((messagedByDate) => {
							// console.log("messagedByDate", messagedByDate);
							const messages = messagedByDate.messages.map((msg) => {
								if (msg.deletedBy !== userId && msg.deletionScope !== "ALL")
									return (
										<MessageBox
											message={msg}
											userId={userId}
											key={Math.random()}
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
							if (messages.length)
								return (
									<div className="" key={Math.random()}>
										<p className="text-center my-4">
											{moment(messagedByDate.date).isSame(moment(), "D")
												? "TODAY"
												: moment(messagedByDate.date).format("Do MMM YY")}
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

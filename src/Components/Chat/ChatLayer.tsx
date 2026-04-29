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
import { ChevronLeft } from "lucide-react";
import { cn } from "@/Components/lib/utils";

type Props = { recipientId: number; recipientName: string; onBack: () => void };

/* ── socket event handlers ──────────────────────────────────────────────── */

const handleNewMessage = (
	data: Message,
	setMsgList: React.Dispatch<React.SetStateAction<{ date: Date; messages: Message[] }[]>>,
	chatId?: string
) => {
	setMsgList((prev) => {
		if (!chatId || data.chatId !== chatId) return prev;
		const t   = [...prev];
		const idx = t.findIndex((g) => moment.utc(data.sentAt).local().isSame(g.date, "date"));
		if (idx > -1) {
			if (!t[idx].messages.find((m) => m.id === data.id))
				t.splice(idx, 1, { date: prev[idx].date, messages: [...prev[idx].messages, data] });
		} else {
			t.push({ date: new Date(new Date(data.sentAt).setHours(0, 0, 0, 0)), messages: [data] });
		}
		return t;
	});
};

const handleAllDeleteMessage = (
	data: { success: boolean; message: Message },
	setMsgList: React.Dispatch<React.SetStateAction<{ date: Date; messages: Message[] }[]>>,
	chatId?: string
) => {
	if (!data.success) return;
	const { message } = data;
	setMsgList((prev) => {
		if (!chatId || message.chatId !== chatId) return prev;
		const t   = [...prev];
		const idx = t.findIndex((g) => moment.utc(message.sentAt).local().isSame(g.date, "date"));
		if (idx > -1) {
			t[idx].messages = t[idx].messages.filter((m) => m.id !== message.id);
			if (!t[idx].messages.length) t.splice(idx, 1);
		}
		return t;
	});
};

const handleEditMessage = (
	data: { success: boolean; message: Message },
	setMsgList: React.Dispatch<React.SetStateAction<{ date: Date; messages: Message[] }[]>>,
	chatId?: string
) => {
	if (!data.success) return;
	const { message } = data;
	setMsgList((prev) => {
		if (!chatId || message.chatId !== chatId) return prev;
		const t    = [...prev];
		const gIdx = t.findIndex((g) => moment.utc(message.sentAt).local().isSame(g.date, "date"));
		if (gIdx > -1) {
			const mIdx = t[gIdx].messages.findIndex((m) => m.id === message.id);
			if (mIdx > -1) t[gIdx].messages[mIdx] = message;
		}
		return t;
	});
};

const handleSelfDeleteMessage = (
	data: Message,
	setMsgList: React.Dispatch<React.SetStateAction<{ date: Date; messages: Message[] }[]>>,
	chatId?: string
) => {
	setMsgList((prev) => {
		if (!chatId || data.chatId !== chatId) return prev;
		const t   = [...prev];
		const idx = t.findIndex((g) => moment.utc(data.sentAt).local().isSame(g.date, "date"));
		if (idx > -1) {
			t[idx].messages = t[idx].messages.filter((m) => m.id !== data.id);
			if (!t[idx].messages.length) t.splice(idx, 1);
		}
		return t;
	});
};

/* ── helpers ────────────────────────────────────────────────────────────── */

function getInitials(name: string) {
	return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_PALETTE = ["#0f766e","#0e7490","#1d4ed8","#7c3aed","#be185d","#b45309"];
function avatarBg(name: string) {
	let h = 0;
	for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
	return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length];
}

/* ── component ──────────────────────────────────────────────────────────── */

function ChatLayer({ recipientId, recipientName, onBack }: Props) {
	const [loading, setLoading] = useState(true);
	const [reset, setReset]     = useState(false);
	const [msgList, setMsgList] = useState<{ date: Date; messages: Message[] }[]>([]);
	const [chatId, setChatId]   = useState<string | undefined>();
	const chatRef               = useRef<HTMLDivElement>(null);
	const chatData              = trpc.message.loadIndividualChat.useMutation();
	const userId                = useZStore().user.userId!;

	useEffect(() => {
		setLoading(true);
		setMsgList([]);
		setChatId(undefined);
		chatData.mutate(
			{ recipientId },
			{
				onSuccess: (data) => {
					if (data.chatId && data.messages) {
						setChatId(data.chatId);
						setMsgList(data.messages);
						setReset((p) => !p);
					}
					setLoading(false);
				},
				onError: () => setLoading(false),
			}
		);
	}, [recipientId]);

	useEffect(() => {
		chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [msgList.length, reset]);

	useEffect(() => {
		socket.on(EventTypes.SEND_MESSAGE,   (d: Message) => handleNewMessage(d, setMsgList, chatId));
		socket.on(EventTypes.DETELE_MESSAGE, (d: { success: boolean; message: Message }) => handleAllDeleteMessage(d, setMsgList, chatId));
		socket.on(EventTypes.EDIT_MESSAGE,   (d: { success: boolean; message: Message }) => handleEditMessage(d, setMsgList, chatId));
		return () => {
			socket.off(EventTypes.SEND_MESSAGE, handleNewMessage);
			socket.off(EventTypes.DETELE_MESSAGE, handleAllDeleteMessage);
			socket.off(EventTypes.EDIT_MESSAGE, handleEditMessage);
		};
	}, [chatId]);

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 border-b border-brand-dim/15 bg-surface-raised">
				<button
					onClick={onBack}
					className="p-1.5 rounded-md text-brand/40 hover:text-brand hover:bg-brand/10 transition-colors"
					title="Back"
				>
					<ChevronLeft className="w-4 h-4" />
				</button>
				<div
					className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
					style={{ background: avatarBg(recipientName) }}
				>
					{getInitials(recipientName)}
				</div>
				<span className="text-sm font-semibold text-brand/90">{recipientName}</span>
			</div>

			{/* Body */}
			{loading ? (
				<div className="flex-1 flex items-center justify-center"><Loader /></div>
			) : (
				<>
					<ul className="flex-1 list-none overflow-y-auto chat-scrollbar px-4 sm:px-6 md:px-10 py-4">
						{msgList.length === 0 && (
							<li className="flex items-center justify-center pt-16">
								<p className="text-brand/25 text-sm">No messages yet — say hello!</p>
							</li>
						)}
						{msgList.map((group) => {
							const visible = group.messages.filter(
								(msg) => !(msg.deletedBy === userId && msg.deletionScope !== "ALL")
							);
							if (!visible.length) return null;
							return (
								<div key={group.date.toString()}>
									<p className="text-center text-[0.7rem] text-brand/30 my-3 font-medium tracking-widest uppercase">
										{moment(group.date).isSame(moment(), "D")
											? "Today"
											: moment(group.date).format("Do MMM YYYY")}
									</p>
									{visible.map((msg) => (
										<MessageBox
											key={msg.id}
											message={msg}
											userId={userId}
											handleSelfDeleteMessage={(d) => handleSelfDeleteMessage(d, setMsgList, chatId)}
											handleEditMessage={(d) => handleEditMessage(d, setMsgList, chatId)}
										/>
									))}
								</div>
							);
						})}
						<div ref={chatRef} />
					</ul>
					<ChatInput
						recipientId={recipientId}
						chatId={chatId}
						msgList={msgList}
						setMsgList={setMsgList}
						resetScroller={() => setReset((p) => !p)}
					/>
				</>
			)}
		</div>
	);
}

export default ChatLayer;

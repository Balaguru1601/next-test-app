"use client";

import React, { useRef, useState } from "react";
import { useZStore } from "@/store/zustand";
import { trpc } from "@/app/_trpc/trpc";
import moment from "moment";
import { Message } from "@/constants/messageSchema";
import { SendHorizonal, Loader2 } from "lucide-react";
import { cn } from "@/Components/lib/utils";

type Props = {
	recipientId: number;
	msgList: { date: Date; messages: Message[] }[];
	setMsgList: React.Dispatch<React.SetStateAction<{ date: Date; messages: Message[] }[]>>;
	chatId?: string;
	resetScroller: () => void;
};

function ChatInput({ msgList, setMsgList, chatId, recipientId, resetScroller }: Props) {
	const [newMessage, setNewMessage] = useState("");
	const [sending, setSending]       = useState(false);
	const inputRef                    = useRef<HTMLInputElement>(null);

	const sendMessage = trpc.message.sendIndividualMessage.useMutation({
		onSettled: () => setSending(false),
		onSuccess: (data) => {
			if (data.success && data.chat) {
				const sentAt    = new Date(data.chat!.sentAt).toISOString();
				const dateIndex = msgList.findIndex((item) =>
					moment(new Date(data.chat!.sentAt)).isSame(item.date, "date")
				);
				if (dateIndex > -1) {
					if (!msgList[msgList.length - 1].messages.find((m) => m.id === data.chat!.id)) {
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
						{ date: new Date(new Date(data.chat!.sentAt).setHours(0, 0, 0, 0)), messages: [data.chat!] },
					]);
					resetScroller();
				}
				setNewMessage("");
				inputRef.current?.focus();
			}
		},
	});

	const userId = useZStore().user.userId!;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const trimmed = newMessage.trim();
				if (!trimmed || !chatId) return;
				setSending(true);
				sendMessage.mutate({ message: trimmed, senderId: userId, recipientId, chatId, sentAt: new Date().toISOString() });
			}}
			className="flex-shrink-0 border-t border-brand-dim/15 bg-surface-raised"
		>
			<div className="flex items-center gap-2 px-4 py-3">
				<input
					ref={inputRef}
					type="text"
					placeholder="Type a message…"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					autoFocus
					className={cn(
						"flex-1 rounded-full px-4 py-2 text-sm bg-surface-card border border-brand-dim/20",
						"text-brand placeholder:text-brand/25",
						"focus:outline-none focus:border-brand/50 transition-colors"
					)}
				/>
				<button
					type="submit"
					disabled={sending || !newMessage.trim()}
					className={cn(
						"w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full transition-colors",
						"bg-brand/20 border border-brand/30 text-brand",
						"hover:bg-brand/35 hover:border-brand/50",
						"disabled:opacity-35 disabled:cursor-not-allowed"
					)}
				>
					{sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizonal className="w-4 h-4" />}
				</button>
			</div>
		</form>
	);
}

export default ChatInput;

import React from "react";
import Loader from "../Loader";
import { MessageCircle } from "lucide-react";
import { cn } from "@/Components/lib/utils";

type Props = {
	chats:
		| { user: { id: number; email: string; username: string }; id: string; createdAt: Date; updatedAt: Date }[]
		| null
		| undefined;
	isLoading: boolean;
	setCurrentChatWith: (id: number, username: string) => void;
	activeUserId?: number;
};

const AVATAR_COLORS = ["bg-teal-700", "bg-cyan-700", "bg-emerald-700", "bg-sky-700", "bg-indigo-700", "bg-violet-700"];

function avatarColor(id: number) { return AVATAR_COLORS[id % AVATAR_COLORS.length]; }

function getInitials(name: string) {
	return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function ChatSidebar({ chats, isLoading, setCurrentChatWith, activeUserId }: Props) {
	return (
		<div className="flex flex-col h-full border-r border-brand-dim/15 bg-surface-raised">
			<div className="flex items-center gap-2 px-4 py-3.5 border-b border-brand-dim/15">
				<MessageCircle className="w-4 h-4 text-brand/60" />
				<h2 className="text-sm font-semibold text-brand/80 tracking-wide">Messages</h2>
			</div>

			<div className="flex-1 overflow-y-auto chat-scrollbar py-2">
				{isLoading && (
					<div className="flex justify-center pt-8"><Loader /></div>
				)}

				{!isLoading && chats && chats.length > 0 && (
					<ul className="list-none px-2 space-y-0.5">
						{chats.map((chat) => {
							const isActive = chat.user.id === activeUserId;
							return (
								<li
									key={chat.id}
									className={cn(
										"flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 transition-colors",
										isActive
											? "bg-brand/12 border border-brand/25"
											: "hover:bg-brand/8 border border-transparent"
									)}
									onClick={() => setCurrentChatWith(chat.user.id, chat.user.username)}
								>
									<div className={cn("flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white", avatarColor(chat.user.id))}>
										{getInitials(chat.user.username)}
									</div>
									<span className={cn("text-sm font-medium truncate", isActive ? "text-brand" : "text-foreground/75")}>
										{chat.user.username}
									</span>
								</li>
							);
						})}
					</ul>
				)}

				{!isLoading && (!chats || chats.length === 0) && (
					<div className="flex flex-col items-center justify-center pt-16 px-4 text-center">
						<MessageCircle className="w-8 h-8 text-brand/20 mb-3" />
						<p className="text-brand/35 text-sm">No conversations yet</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default ChatSidebar;

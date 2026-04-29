import React from "react";
import Loader from "../Loader";

type Props = {
	chats:
		| {
				user: {
					id: number;
					email: string;
					username: string;
				};
				id: string;
				createdAt: Date;
				updatedAt: Date;
		  }[]
		| null
		| undefined;
	isLoading: boolean;
	setCurrentChatWith: (id: number, username: string) => void;
	activeUserId?: number;
};

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

const AVATAR_COLORS = [
	"bg-teal-700",
	"bg-cyan-700",
	"bg-emerald-700",
	"bg-sky-700",
	"bg-indigo-700",
	"bg-violet-700",
];

function avatarColor(id: number) {
	return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

function ChatSidebar({ chats, isLoading, setCurrentChatWith, activeUserId }: Props) {
	return (
		<div className="flex flex-col bg-[rgba(10,20,30,0.6)] border-r border-[rgba(25,147,147,0.2)] h-full">
			<div className="px-4 py-4 border-b border-[rgba(25,147,147,0.2)]">
				<h2 className="text-[#0AD5C1] text-lg font-semibold tracking-wide">Messages</h2>
			</div>

			<div className="flex-1 overflow-y-auto chat-scrollbar py-2">
				{isLoading && (
					<div className="flex justify-center pt-8">
						<Loader />
					</div>
				)}

				{!isLoading && chats && chats.length > 0 && (
					<ul className="list-none px-2">
						{chats.map((chat) => {
							const isActive = chat.user.id === activeUserId;
							return (
								<li
									key={chat.id}
									className={`flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2 mb-1 transition-colors ${
										isActive
											? "bg-[rgba(25,147,147,0.25)] border border-[rgba(25,147,147,0.4)]"
											: "hover:bg-[rgba(25,147,147,0.12)]"
									}`}
									onClick={() => setCurrentChatWith(chat.user.id, chat.user.username)}
								>
									<div
										className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${avatarColor(chat.user.id)}`}
									>
										{getInitials(chat.user.username)}
									</div>
									<span
										className={`text-sm font-medium truncate ${
											isActive ? "text-[#0AD5C1]" : "text-[rgba(10,213,193,0.8)]"
										}`}
									>
										{chat.user.username}
									</span>
								</li>
							);
						})}
					</ul>
				)}

				{!isLoading && (!chats || chats.length === 0) && (
					<div className="flex flex-col items-center justify-center h-full pt-12 px-4 text-center">
						<svg
							className="w-10 h-10 text-[rgba(10,213,193,0.3)] mb-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
							/>
						</svg>
						<p className="text-[rgba(10,213,193,0.5)] text-sm">No conversations yet</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default ChatSidebar;

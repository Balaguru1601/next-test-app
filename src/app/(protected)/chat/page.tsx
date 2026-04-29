"use client";

import ChatLayer from "@/Components/Chat/ChatLayer";
import ChatSidebar from "@/Components/Chat/ChatSidebar";
import { trpc } from "@/app/_trpc/trpc";
import { useCallback, useEffect, useState } from "react";

type Props = {};

function Page({}: Props) {
	const { data, isLoading } = trpc.message.getAllChats.useQuery();
	const [currentChatWith, setCurrentChatWith] = useState<
		{ id: number; username: string } | undefined
	>();

	const closeChat = useCallback((event: KeyboardEvent) => {
		if (event.key !== "Escape") return;
		setCurrentChatWith(undefined);
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", closeChat);
		return () => window.removeEventListener("keydown", closeChat);
	}, [closeChat]);

	return (
		<div className="h-[calc(100vh-48px)]">
			<div className="grid grid-cols-[280px_1fr] h-full">
				<ChatSidebar
					isLoading={isLoading}
					setCurrentChatWith={(id, username) => setCurrentChatWith({ id, username })}
					chats={data?.chats}
					activeUserId={currentChatWith?.id}
				/>
				<div className="bg-chat-bg flex flex-col h-full overflow-hidden">
					{currentChatWith ? (
						<ChatLayer
							recipientId={currentChatWith.id}
							recipientName={currentChatWith.username}
							onBack={() => setCurrentChatWith(undefined)}
						/>
					) : (
						<div className="flex-1 flex items-center justify-center">
							<div className="text-center select-none">
								<svg
									className="w-16 h-16 mx-auto text-[rgba(10,213,193,0.2)] mb-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1}
										d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
									/>
								</svg>
								<p className="text-[rgba(10,213,193,0.4)] text-lg font-medium">
									Select a conversation
								</p>
								<p className="text-[rgba(10,213,193,0.25)] text-sm mt-1">
									Choose from your chats on the left
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Page;

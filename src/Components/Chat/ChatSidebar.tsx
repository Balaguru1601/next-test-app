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
	setCurrentChatWith: (t: number) => void;
};

function ChatSidebar({ chats, isLoading, setCurrentChatWith }: Props) {
	return (
		<div className="pt-2 bg-[rgba(25,147,147,0.2)] p-4">
			{chats && chats.length > 0 ? (
				<>
					{chats.map((chat) => (
						<div
							key={Math.random()}
							className="cursor-pointer"
							onClick={() => {
								setCurrentChatWith(chat.user.id);
							}}
						>
							{chat.user.username}
						</div>
					))}
				</>
			) : (
				!isLoading && (
					<>
						Start Chatting now!
						{/* {onlineUsers &&
									onlineUsers.users?.map((user) => (
										<div
											key={Math.random()}
											className="cursor-pointer"
											onClick={() => {
												setCurrentChatWith(user.id);
											}}
										>
											{user.username}
										</div>
									))} */}
					</>
				)
			)}
			{isLoading && (
				<div className="text-center">
					<Loader />
				</div>
			)}
		</div>
	);
}

export default ChatSidebar;

import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export default function MessageBox({
	message,
	userId,
	handleSelfDeleteMessage,
	handleEditMessage,
}: {
	message: Message;
	userId: number;
	handleSelfDeleteMessage: (message: Message) => void;
	handleEditMessage: (data: { success: boolean; message: Message }) => void;
}) {
	const [showOptions, setShowOptions] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [messageText, setMessageText] = useState(message.message);
	const [editMessageError, setEditMessageError] = useState<string | null>(null);

	const optionsRef = useRef<HTMLDivElement>(null);
	const isSelf = message.senderId === userId;

	const deleteMessage = trpc.message.deleteMessage.useMutation({
		onSuccess: (data) => {
			if (data.success) handleSelfDeleteMessage(message);
		},
	});

	const editMessage = trpc.message.editMessage.useMutation({
		onSuccess: (data) => {
			if (data.success) {
				handleEditMessage({ success: true, message: { ...message, message: messageText } });
				setEditMode(false);
			} else {
				setEditMessageError("Edit failed, try again.");
			}
		},
	});

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
				setShowOptions(false);
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setShowOptions(false);
				setEditMode(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const messageSentAt = moment.utc(message.sentAt).local().format("HH:mm");

	return (
		<li className={`flex mb-2 ${isSelf ? "justify-end" : "justify-start"}`}>
			<div
				className={`relative group max-w-[65%] min-w-[80px] ${
					isSelf
						? "bg-[rgba(25,147,147,0.25)] rounded-2xl rounded-tr-sm"
						: "bg-[rgba(25,147,147,0.12)] rounded-2xl rounded-tl-sm"
				} px-3 py-2`}
			>
				{/* Tail */}
				{isSelf ? (
					<span className="absolute top-0 right-[-8px] w-0 h-0 border-t-[10px] border-l-[10px] border-t-[rgba(25,147,147,0.25)] border-l-transparent border-r-transparent" />
				) : (
					<span className="absolute top-0 left-[-8px] w-0 h-0 border-t-[10px] border-r-[10px] border-t-[rgba(25,147,147,0.12)] border-r-transparent border-l-transparent" />
				)}

				{/* Message content or edit form */}
				{!editMode ? (
					<div className="flex items-end gap-1.5 flex-wrap">
						<p
							className={`text-sm leading-relaxed break-words ${
								isSelf ? "text-[#0AD5C1]" : "text-[#0EC879]"
							}`}
						>
							{message.message}
						</p>
						<div className="flex items-center gap-1 ml-auto flex-shrink-0 self-end">
							{message.editedAt && (
								<span className="text-[0.6rem] text-[rgba(10,213,193,0.45)] italic">
									edited
								</span>
							)}
							<span className="text-[0.6rem] text-[rgba(10,213,193,0.55)]">
								{messageSentAt}
							</span>
							{isSelf && (
								<span className="text-[rgba(10,213,193,0.55)]">
									{message.receivedAt ? (
										/* Double tick (delivered) */
										<svg viewBox="0 0 16 11" height="11" width="18" fill="none">
											<path
												d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832Z"
												fill="currentColor"
											/>
											<path
												d="M8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168L7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
												fill="currentColor"
											/>
										</svg>
									) : (
										/* Single tick (sent) */
										<svg viewBox="0 0 12 11" height="11" width="14" fill="none">
											<path
												d="M11.1549 0.652832C11.0745 0.585124 10.9729 0.55127 10.8502 0.55127C10.7021 0.55127 10.5751 0.610514 10.4693 0.729004L4.28038 8.36523L1.87461 6.09277C1.8323 6.04622 1.78151 6.01025 1.72227 5.98486C1.66303 5.95947 1.60166 5.94678 1.53819 5.94678C1.407 5.94678 1.29275 5.99544 1.19541 6.09277L0.884379 6.40381C0.79128 6.49268 0.744731 6.60482 0.744731 6.74023C0.744731 6.87565 0.79128 6.98991 0.884379 7.08301L3.88047 10.0791C4.02859 10.2145 4.19574 10.2822 4.38194 10.2822C4.48773 10.2822 4.58929 10.259 4.68663 10.2124C4.78396 10.1659 4.86436 10.1003 4.92784 10.0156L11.5738 1.59863C11.6458 1.5013 11.6817 1.40186 11.6817 1.30029C11.6817 1.14372 11.6183 1.01888 11.4913 0.925781L11.1549 0.652832Z"
												fill="currentColor"
											/>
										</svg>
									)}
								</span>
							)}
						</div>
					</div>
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (messageText.trim().length < 1) {
								setEditMessageError("Message cannot be empty");
								return;
							}
							editMessage.mutate({
								message: messageText.trim(),
								messageId: message.id,
								editedAt: new Date(),
							});
						}}
					>
						{editMessageError && (
							<small className="block text-red-400 text-xs mb-1">{editMessageError}</small>
						)}
						<input
							type="text"
							value={messageText}
							onChange={(e) => {
								setMessageText(e.target.value);
								setEditMessageError(null);
							}}
							className="bg-transparent w-full text-[#0AD5C1] text-sm px-1 py-0.5 border-b border-[rgba(10,213,193,0.5)] focus:outline-none focus:border-[#0AD5C1]"
							autoFocus
						/>
						<div className="flex gap-3 mt-1.5">
							<button
								type="submit"
								className="text-[#0AD5C1] text-xs font-semibold hover:underline"
							>
								Save
							</button>
							<button
								type="button"
								className="text-[rgba(10,213,193,0.6)] text-xs hover:underline"
								onClick={() => {
									setEditMode(false);
									setMessageText(message.message);
									setEditMessageError(null);
								}}
							>
								Cancel
							</button>
						</div>
					</form>
				)}

				{/* Options dropdown */}
				{!editMode && (
					<div
						ref={optionsRef}
						className={`absolute ${isSelf ? "right-1" : "left-1"} top-0 z-10`}
					>
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setShowOptions((prev) => !prev);
							}}
							className={`p-0.5 rounded text-[rgba(10,213,193,0.5)] hover:text-[#0AD5C1] hover:bg-[rgba(25,147,147,0.2)] transition-colors ${
								showOptions ? "opacity-100" : "opacity-0 group-hover:opacity-100"
							}`}
							title="Message options"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M6 12L12 18L18 12" />
							</svg>
						</button>

						{showOptions && (
							<div
								className={`absolute top-6 ${
									isSelf ? "right-0" : "left-0"
								} bg-[#0d3535] border border-[rgba(25,147,147,0.4)] rounded-lg shadow-lg z-50 min-w-[130px] overflow-hidden`}
							>
								<button
									className="block w-full text-left px-3 py-2 text-sm text-[rgba(10,213,193,0.8)] hover:bg-[rgba(25,147,147,0.2)] hover:text-[#0AD5C1] transition-colors"
									onClick={() => {
										setShowOptions(false);
										deleteMessage.mutate({ message, all: false });
									}}
								>
									Delete for me
								</button>
								{isSelf && (
									<>
										<button
											className="block w-full text-left px-3 py-2 text-sm text-[rgba(10,213,193,0.8)] hover:bg-[rgba(25,147,147,0.2)] hover:text-[#0AD5C1] transition-colors"
											onClick={() => {
												setShowOptions(false);
												setMessageText(message.message);
												setEditMode(true);
											}}
										>
											Edit
										</button>
										<button
											className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[rgba(255,80,80,0.1)] transition-colors"
											onClick={() => {
												setShowOptions(false);
												deleteMessage.mutate({ message, all: true });
											}}
										>
											Delete for all
										</button>
									</>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</li>
	);
}

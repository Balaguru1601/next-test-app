import { trpc } from "@/app/_trpc/trpc";
import { Message } from "@/constants/messageSchema";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { cn } from "@/Components/lib/utils";
import { CheckCheck, Check, MoreVertical, Pencil, Trash2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

const SENT_BG = "rgba(25,147,147,0.22)";
const RECV_BG = "rgba(25,147,147,0.10)";

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
	const [editMode, setEditMode]       = useState(false);
	const [messageText, setMessageText] = useState(message.message);
	const [editError, setEditError]     = useState<string | null>(null);

	const isSelf = message.senderId === userId;
	const sentAt = moment.utc(message.sentAt).local().format("HH:mm");

	const deleteMessage = trpc.message.deleteMessage.useMutation({
		onSuccess: (data) => { if (data.success) handleSelfDeleteMessage(message); },
	});

	const editMessage = trpc.message.editMessage.useMutation({
		onSuccess: (data) => {
			if (data.success) {
				handleEditMessage({ success: true, message: { ...message, message: messageText } });
				setEditMode(false);
			} else {
				setEditError("Edit failed — try again.");
			}
		},
	});

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setEditMode(false);
				setMessageText(message.message);
				setEditError(null);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [message.message]);

	return (
		<li className={cn("flex mb-1.5 group/msg", isSelf ? "justify-end" : "justify-start")}>
			{/* Row: options button sits outside the bubble on the correct side */}
			<div className={cn("flex items-start gap-1 max-w-[70%]", isSelf ? "flex-row-reverse" : "flex-row")}>

				{/* Bubble */}
				<div
					className={cn("relative min-w-[60px] px-3 py-2", isSelf ? "rounded-2xl rounded-tr-none" : "rounded-2xl rounded-tl-none")}
					style={{ background: isSelf ? SENT_BG : RECV_BG }}
				>
					{/* Tail: border-left (colored) + border-bottom (transparent) = correct corner tail */}
					{isSelf ? (
						<span
							className="absolute top-0 right-[-8px] w-0 h-0"
							style={{ borderLeft: `8px solid ${SENT_BG}`, borderBottom: "8px solid transparent" }}
						/>
					) : (
						<span
							className="absolute top-0 left-[-8px] w-0 h-0"
							style={{ borderRight: `8px solid ${RECV_BG}`, borderBottom: "8px solid transparent" }}
						/>
					)}

					{!editMode ? (
						<div className="flex items-end gap-2 flex-wrap">
							<p className={cn("text-sm leading-relaxed break-words", isSelf ? "text-brand" : "text-accent-green")}>
								{message.message}
							</p>
							<div className="flex items-center gap-1 ml-auto flex-shrink-0 self-end pb-0.5">
								{message.editedAt && (
									<span className="text-[0.6rem] text-brand/40 italic">edited</span>
								)}
								<span className="text-[0.62rem] text-brand/50 tabular-nums">{sentAt}</span>
								{isSelf && (
									<span className="text-brand/50">
										{message.receivedAt
											? <CheckCheck className="w-3.5 h-3.5" />
											: <Check className="w-3.5 h-3.5" />
										}
									</span>
								)}
							</div>
						</div>
					) : (
						<form
							onSubmit={(e) => {
								e.preventDefault();
								const trimmed = messageText.trim();
								if (!trimmed) { setEditError("Message cannot be empty"); return; }
								editMessage.mutate({ message: trimmed, messageId: message.id, editedAt: new Date() });
							}}
						>
							{editError && <p className="text-destructive text-xs mb-1">{editError}</p>}
							<input
								type="text"
								value={messageText}
								onChange={(e) => { setMessageText(e.target.value); setEditError(null); }}
								className="bg-transparent w-full text-brand text-sm border-b border-brand/40 focus:border-brand focus:outline-none pb-0.5"
								autoFocus
							/>
							<div className="flex gap-3 mt-2">
								<button type="submit" className="text-brand text-xs font-semibold hover:underline">Save</button>
								<button
									type="button"
									className="text-brand/50 text-xs hover:underline"
									onClick={() => { setEditMode(false); setMessageText(message.message); setEditError(null); }}
								>
									Cancel
								</button>
							</div>
						</form>
					)}
				</div>

				{/* Options trigger — hidden until group hover; Radix auto-flips above/below based on viewport */}
				{!editMode && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className={cn(
									"mt-1 flex-shrink-0 p-1 rounded-md text-brand/30 hover:text-brand hover:bg-brand/10",
									"opacity-0 group-hover/msg:opacity-100 focus:opacity-100 transition-opacity"
								)}
								title="Message options"
							>
								<MoreVertical className="w-4 h-4" />
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							side="bottom"
							align={isSelf ? "end" : "start"}
							avoidCollisions
							collisionPadding={8}
							className="min-w-[10rem]"
						>
							<DropdownMenuItem
								onClick={() => deleteMessage.mutate({ message, all: false })}
								className="text-foreground/80"
							>
								<Trash2 className="w-4 h-4 mr-2 text-muted-foreground" />
								Delete for me
							</DropdownMenuItem>

							{isSelf && (
								<>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										onClick={() => { setMessageText(message.message); setEditMode(true); }}
										className="text-foreground/80"
									>
										<Pencil className="w-4 h-4 mr-2 text-muted-foreground" />
										Edit
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => deleteMessage.mutate({ message, all: true })}
										className="text-destructive focus:text-destructive focus:bg-destructive/10"
									>
										<Trash2 className="w-4 h-4 mr-2" />
										Delete for everyone
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</li>
	);
}

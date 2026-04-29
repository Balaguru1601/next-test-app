"use client";

import { trpc } from "@/app/_trpc/trpc";
import { useZStore } from "@/store/zustand";
import { cn } from "@/Components/lib/utils";
import { Button } from "@/Components/ui/button";
import { MessageCircle, LogOut, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const { logout, isLoggedIn, username } = useZStore().user;
	const pathname = usePathname();

	const backLogout = trpc.user.logout.useMutation({ onSettled: logout });

	function getInitials(name: string) {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.slice(0, 2)
			.toUpperCase();
	}

	return (
		<nav className="h-12 w-full flex items-center justify-between px-4 md:px-8 glass border-b border-brand-dim/15 sticky top-0 z-50">
			{/* Logo */}
			<Link href="/" className="flex items-center gap-2 group">
				<div className="w-7 h-7 rounded-lg bg-brand/15 border border-brand/30 flex items-center justify-center group-hover:bg-brand/25 transition-colors">
					<MessageCircle className="w-4 h-4 text-brand" />
				</div>
				<span className="font-semibold text-brand text-sm tracking-wide hidden sm:block">
					ChatApp
				</span>
			</Link>

			{/* Centre nav links */}
			<div className="flex items-center gap-1">
				{isLoggedIn && (
					<Link
						href="/chat"
						className={cn(
							"px-3 py-1.5 rounded-md text-sm transition-colors",
							pathname === "/chat"
								? "bg-brand/15 text-brand font-medium"
								: "text-foreground/70 hover:text-brand hover:bg-brand/10"
						)}
					>
						Messages
					</Link>
				)}
			</div>

			{/* Right side */}
			<div className="flex items-center gap-2">
				{isLoggedIn ? (
					<>
						<div
							className="w-7 h-7 rounded-full bg-brand-dim/40 border border-brand/25 flex items-center justify-center text-[0.65rem] font-bold text-brand select-none"
							title={username ?? ""}
						>
							{username ? getInitials(username) : "?"}
						</div>
						<span className="text-xs text-foreground/60 hidden md:block">{username}</span>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 text-foreground/50 hover:text-destructive hover:bg-destructive/10"
							onClick={() => backLogout.mutate()}
							title="Logout"
						>
							<LogOut className="w-4 h-4" />
						</Button>
					</>
				) : (
					<>
						<Button asChild variant="ghost" size="sm">
							<Link href="/signup" className="flex items-center gap-1.5">
								<LogIn className="w-3.5 h-3.5" />
								Log in
							</Link>
						</Button>
						<Button asChild size="sm">
							<Link href="/signup?s" className="flex items-center gap-1.5">
								<UserPlus className="w-3.5 h-3.5" />
								Sign up
							</Link>
						</Button>
					</>
				)}
			</div>
		</nav>
	);
}

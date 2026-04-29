"use client";

import { Button } from "@/Components/ui/button";
import { useZStore } from "@/store/zustand";
import {
	MessageCircle,
	Zap,
	Shield,
	Users,
	ArrowRight,
	Check,
} from "lucide-react";
import Link from "next/link";

const features = [
	{
		icon: Zap,
		title: "Real-time delivery",
		description: "Messages appear instantly via Socket.io — no polling, no delays.",
	},
	{
		icon: Shield,
		title: "Secure by default",
		description: "JWT auth in HTTP-only cookies. Your credentials never touch local storage.",
	},
	{
		icon: Check,
		title: "Delivery receipts",
		description: "Single and double ticks tell you exactly when your message was received.",
	},
	{
		icon: Users,
		title: "Online presence",
		description: "See who's active right now with live online-status indicators.",
	},
	{
		icon: MessageCircle,
		title: "Edit & delete",
		description: "Changed your mind? Edit a sent message or remove it for everyone.",
	},
];

export default function Home() {
	const { isLoggedIn, username } = useZStore().user;

	return (
		<main className="min-h-[calc(100vh-48px)] bg-hero-bg text-foreground">
			{/* Hero */}
			<section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 overflow-hidden">
				{/* Decorative glow rings */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 flex items-center justify-center"
				>
					<div className="w-[600px] h-[600px] rounded-full border border-brand/5 absolute" />
					<div className="w-[400px] h-[400px] rounded-full border border-brand/8 absolute" />
					<div className="w-[200px] h-[200px] rounded-full bg-brand/5 blur-3xl absolute" />
				</div>

				{/* Badge */}
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/25 bg-brand/8 text-brand text-xs font-medium mb-6">
					<span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-brand" />
					Real-time · Secure · Open source
				</div>

				{/* Heading */}
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.1]">
					<span className="text-foreground">Chat that's</span>
					<br />
					<span className="text-brand">actually instant</span>
				</h1>

				<p className="max-w-[480px] text-foreground/55 text-base sm:text-lg mb-8 leading-relaxed">
					A lightweight, real-time messaging app built with Next.js, tRPC, and Socket.io.
					Fast. Private. No bloat.
				</p>

				{/* CTAs */}
				<div className="flex flex-wrap items-center justify-center gap-3">
					{isLoggedIn ? (
						<>
							<span className="text-foreground/50 text-sm">
								Welcome back,{" "}
								<span className="text-brand font-medium">{username}</span>
							</span>
							<Button asChild size="lg" className="gap-2">
								<Link href="/chat">
									Open messages
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
						</>
					) : (
						<>
							<Button asChild size="lg" className="gap-2">
								<Link href="/signup?s">
									Get started free
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/signup">Log in</Link>
							</Button>
						</>
					)}
				</div>

				{/* Mock chat preview */}
				<div className="mt-14 w-full max-w-sm mx-auto rounded-2xl border border-brand-dim/20 bg-surface-card shadow-2xl shadow-black/50 overflow-hidden text-left">
					{/* Header */}
					<div className="flex items-center gap-2.5 px-4 py-3 border-b border-brand-dim/15 bg-surface-raised">
						<div className="w-7 h-7 rounded-full bg-teal-700 flex items-center justify-center text-xs font-bold text-white">
							A
						</div>
						<span className="text-sm font-medium text-brand">Alice</span>
						<span className="ml-auto flex items-center gap-1.5 text-xs text-brand/40">
							<span className="w-1.5 h-1.5 rounded-full bg-brand/60" />
							online
						</span>
					</div>
					{/* Messages */}
					<div className="px-4 py-4 space-y-2 bg-chat-bg">
						<div className="flex justify-start">
							<div className="bg-[rgba(25,147,147,0.10)] rounded-2xl rounded-tl-none px-3 py-2 text-sm text-accent-green max-w-[75%]">
								hey! did you see the game last night?
							</div>
						</div>
						<div className="flex justify-end">
							<div className="bg-[rgba(25,147,147,0.22)] rounded-2xl rounded-tr-none px-3 py-2 text-sm text-brand max-w-[75%]">
								yeah!! unbelievable finish 🔥
							</div>
						</div>
						<div className="flex justify-start">
							<div className="bg-[rgba(25,147,147,0.10)] rounded-2xl rounded-tl-none px-3 py-2 text-sm text-accent-green max-w-[75%]">
								right?! want to watch the replay tonight?
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features grid */}
			<section className="px-4 pb-24 max-w-4xl mx-auto">
				<h2 className="text-center text-2xl font-semibold text-foreground/80 mb-10">
					Everything you need, nothing you don't
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{features.map((f) => (
						<div
							key={f.title}
							className="rounded-xl border border-brand-dim/15 bg-surface-raised p-5 hover:border-brand/30 hover:bg-surface-card transition-colors group"
						>
							<div className="w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-3 group-hover:bg-brand/15 transition-colors">
								<f.icon className="w-4.5 h-4.5 text-brand" />
							</div>
							<h3 className="font-medium text-foreground/90 mb-1">{f.title}</h3>
							<p className="text-sm text-foreground/45 leading-relaxed">{f.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* CTA footer strip */}
			{!isLoggedIn && (
				<section className="border-t border-brand-dim/10 bg-surface-raised py-12 px-4 text-center">
					<h2 className="text-xl font-semibold text-foreground/80 mb-2">
						Ready to start chatting?
					</h2>
					<p className="text-foreground/40 text-sm mb-6">
						Create a free account in seconds — no email verification required.
					</p>
					<Button asChild size="lg" className="gap-2">
						<Link href="/signup?s">
							Create account
							<ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</section>
			)}
		</main>
	);
}

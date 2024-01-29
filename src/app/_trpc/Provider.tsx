"use client";
import React, { useEffect, useState } from "react";
import { WebSocketClientOptions, createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { useAuthStore } from "@/store/zustand";
import superjson from "superjson";

type Props = {
	children: React.ReactNode;
};

const wsClient = wsLink({
	client: createWSClient({
		url: "ws://localhost:8080/trpc",
		onOpen: () => {
			console.log("Web socket connection established!");
		},
		onClose: () => {
			console.log("Web socket connection closed");
		},
	}),
});

const Provider = (props: Props) => {
	const [queryClient] = useState(() => new QueryClient());
	const { isLoggedIn } = useAuthStore();
	const [trpcClient] = useState(() =>
		trpc.createClient({
			transformer: superjson,
			links: [
				splitLink({
					condition: (op) => {
						console.log("fire");
						return isLoggedIn && op.type === "subscription";
					},
					true: wsClient,
					false: httpBatchLink({
						url: "http://localhost:8080/trpc",
						fetch(url, options) {
							return fetch(url, {
								...options,
								credentials: "include",
							});
						},
					}),
				}),
			],
		})
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
		</trpc.Provider>
	);
};

export default Provider;

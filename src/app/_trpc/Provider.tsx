"use client";
import React, { useState } from "react";
import { createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";

type Props = {
	children: React.ReactNode;
};

// const wsClient;

const Provider = (props: Props) => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				splitLink({
					condition: (op) => op.type === "subscription",
					true: wsLink({
						client: createWSClient({
							url: "ws://localhost:8080/trpc",
						}),
					}),
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

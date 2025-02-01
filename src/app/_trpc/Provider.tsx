"use client";
import React, { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { useAuthStore } from "@/store/zustand";
import superjson from "superjson";

type Props = {
	children: React.ReactNode;
};

const Provider = (props: Props) => {
	const [queryClient] = useState(() => new QueryClient());
	const { isLoggedIn } = useAuthStore();
	const [trpcClient] = useState(() =>
		trpc.createClient({
			transformer: superjson,
			links: [
				httpBatchLink({
					url: "http://localhost:8080/trpc",
					fetch(url, options) {
						return fetch(url, {
							...options,
							credentials: "include",
						});
					},
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

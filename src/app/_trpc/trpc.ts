import type { AppRouter } from "../../utils/server-types/routes/AppRoutes";
import { createTRPCReact } from "@trpc/react-query";
import { createTRPCProxyClient, createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>();

export const trpcVanilla = createTRPCProxyClient<AppRouter>({
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
});

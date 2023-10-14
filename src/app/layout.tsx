import "./globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { trpc } from "./_trpc/trpc";
import Provider from "./_trpc/Provider";
import Navbar from "@/Components/Navbar";

export const metadata = {
	title: "Next Client",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="max-w-full min-h-screen">
				<Provider>
					<Navbar />
					<>{children}</>
				</Provider>
			</body>
		</html>
	);
}

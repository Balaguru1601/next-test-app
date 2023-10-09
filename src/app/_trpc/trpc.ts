import type { AppRouter } from "../../utils/server-types/routes/AppRoutes";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

# ChatApp — Frontend

A real-time 1-on-1 chat application built with **Next.js 14**, **tRPC**, **Socket.io**, and **Zustand**. Supports instant messaging, delivery status indicators, message editing/deletion, and persistent authentication via JWT cookies.

---

## Features

- **Authentication** — Sign up or log in with username & password; session stored as an HTTP-only JWT cookie
- **Real-time messaging** — Socket.io for instant delivery, tRPC mutations for persistence
- **Delivery ticks** — Single tick (sent) / double tick (delivered) shown on your own messages
- **Edit & delete** — Edit your own messages inline; delete for yourself or for everyone
- **Date grouping** — Messages grouped by date with a "Today" label for the current day
- **Online presence** — Server tracks active users via Redis (1-hour TTL)
- **Browser timestamps** — `sentAt` is captured on the client so it always reflects the sender's local clock

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| API client | tRPC v10 with React Query |
| Real-time | Socket.io client v4 |
| State management | Zustand (persisted to `localStorage`) |
| Date formatting | Moment.js |
| Styling | Tailwind CSS |

---

## Prerequisites

- **Node.js 18+**
- The **tRPC server** ([`tRPC-server`](https://github.com/Balaguru1601/tRPC-server)) running on:
  - Port **8080** — tRPC HTTP API
  - Port **8081** — Socket.io

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

> Make sure the backend server is running first, or API calls will fail.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/           Standalone login page
│   │   └── signup/          Combined sign-up / login page with animated toggle
│   ├── (protected)/
│   │   └── chat/            Main chat page (sidebar + message pane)
│   ├── _socket/             Socket.io client singleton
│   └── _trpc/               tRPC client + React Query provider
├── Components/
│   ├── Chat/
│   │   ├── ChatLayer.tsx    Message list, date groups, socket event handlers
│   │   ├── ChatInput.tsx    Message input bar with send button
│   │   ├── ChatSidebar.tsx  Conversation list with avatars
│   │   └── MessageBox.tsx   Individual message bubble (edit/delete/ticks)
│   ├── Navbar.tsx
│   └── Wrapper.tsx          Auth guard + Zustand store hydration
├── constants/
│   └── messageSchema.ts     Zod schemas (mirrored from server)
└── store/
    ├── zustand.ts            Root store
    ├── userStore.ts          User slice (login / logout / persist)
    └── chatStore.ts          Chat slice
```

---

## How It Works

### Sending a message

1. User types and submits via `ChatInput`.
2. `sentAt: new Date().toISOString()` is generated **in the browser** and included in the mutation payload.
3. The tRPC `sendIndividualMessage` mutation persists the message and checks Redis for recipient online status.
4. If the recipient is online, the server emits a `SEND_MESSAGE` Socket.io event to their socket.
5. The sender's UI appends the message immediately; the recipient's `ChatLayer` receives it via the socket listener.

### Timestamps

All timestamps are stored as UTC ISO strings. The UI uses `moment.utc(ts).local()` to convert them to the viewer's local timezone for display. Because `sentAt` is sent from the browser, it always represents the sender's wall-clock time — not the server's timezone.

### Auth flow

1. `POST /trpc/user.login` → server sets an HTTP-only JWT cookie (12-hour expiry).
2. Zustand persists `{ username, userId }` to `localStorage` for UI state.
3. All tRPC requests use `credentials: "include"` so the cookie is sent automatically.
4. On logout, the server clears the cookie and Zustand state is reset.

---

## Socket Events

| Event | Direction | Payload |
|---|---|---|
| `SEND_MESSAGE` | Server → Client | `Message` |
| `DETELE_MESSAGE` | Server → Client | `{ success: boolean, message: Message }` |
| `EDIT_MESSAGE` | Server → Client | `{ success: boolean, message: Message }` |
| `GET_ONLINE_USERS` | Server → Client | `{ users }` |

---

## Related

- **Backend**: [`tRPC-server`](https://github.com/Balaguru1601/tRPC-server) — Express + tRPC + Socket.io + Prisma (PostgreSQL) + Redis

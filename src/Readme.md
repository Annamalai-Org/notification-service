# Real-Time Notification and Email Queue Service

A Node.js service that processes background email jobs using Redis queues and delivers real-time notifications to connected clients via WebSockets.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express
- **Queue**: BullMQ + Redis
- **WebSockets**: Socket.IO
- **Email**: Nodemailer
- **Logging**: Winston

## Project Structure

```
src/
├── config/
│   ├── redis.ts          # Redis connection setup
│   └── mailer.ts         # Nodemailer transporter config
├── queues/
│   └── emailQueue.ts     # BullMQ queue definition
├── workers/
│   └── emailWorker.ts    # Job processor (sends email + emits socket events)
├── socket/
│   └── index.ts          # Socket.IO server init and getIO helper
├── routes/
│   └── notification.ts   # API route handlers
├── utils/
│   └── logger.ts         # Winston logger
└── index.ts              # App entry point
```

## Prerequisites

- Node.js v18+
- Redis server running locally or via URL

## Setup

### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root:

```env
PORT=3000
NODE_ENV=development

REDIS_URL=redis://localhost:6379

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

> For Gmail, use an [App Password](https://myaccount.google.com/apppasswords) instead of your actual password.

### 3. Start Redis

```bash
# Using Docker
docker run -d -p 6379:6379 redis

# Or if Redis is installed locally
redis-server
```

### 4. Run the server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Reference

### POST /notifications/email

Queue an email job for async processing.

**Request Body**
```json
{
  "to": "user@example.com",
  "subject": "Welcome",
  "message": "Welcome to the platform"
}
```

**Response**
```json
{
  "jobId": "1"
}
```

---

### GET /notifications/queue-status

Get current queue metrics.

**Response**
```json
{
  "waiting": 5,
  "active": 2,
  "completed": 10,
  "failed": 1
}
```

## WebSocket Events

Connect to the server using Socket.IO client. The server emits `notification-status` events as the email job progresses.

**Event:** `notification-status`

**Payload:**
```json
{
  "email": "user@example.com",
  "status": "queued | processing | sent | failed",
  "timestamp": "2026-03-16T08:00:00.000Z"
}
```

### Quick test with Socket.IO client

```javascript
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("notification-status", (data) => {
  console.log(data);
});
```

## How It Works

1. Client sends a `POST /notifications/email` request
2. Job is pushed to the BullMQ Redis queue — Socket.IO emits `queued` status
3. Email worker picks up the job asynchronously
4. Worker emits `processing` → sends email via Nodemailer → emits `sent` or `failed`
5. Failed jobs are retried up to **3 times** with exponential backoff

## Logs

- `logs/combined.log` — all logs
- `logs/error.log` — errors only
- Console output in development mode

## Scripts

```bash
npm run dev      # ts-node-dev / nodemon for development
npm run build    # Compile TypeScript
npm start        # Run compiled JS
```

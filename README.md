# Notification Service

## Overview
A real-time notification and email queue service built with Node.js, 
BullMQ, Redis, Socket.IO and Nodemailer.

## Tech Stack
- Node.js + Express
- TypeScript
- BullMQ (Job Queue)
- Redis (Queue Storage)
- Socket.IO (Real-time notifications)
- Nodemailer (Email sending)
- Winston (Logging)

## Features
- (write 4-5 bullet points of what it does)

## Prerequisites
- Node.js v18+
- Redis instance (local or cloud)
- Gmail account with App Password

## Installation

1. Clone the repo
git clone https://github.com/Annamalai-Org/notification-service.git
cd notification-service

2. Install dependencies
npm install

3. Create .env file
cp .env.example .env
(fill in your values)

4. Run the project
npm run dev

## Environment Variables
| Variable | Description |
|---|---|
| REDIS_URL | Redis connection URL |
| SMTP_HOST | (fill) |
| SMTP_PORT | (fill) |
| SMTP_USER | (fill) |
| SMTP_PASS | (fill) |
| PORT | (fill) |

## API Endpoints

### POST /notifications/email
(write request body and response here)

### GET /notifications/queue-status
(write response here)

## WebSocket Events
Event: `notification-status`
(write payload structure here)

## Project Structure
(paste your folder structure here)

## How Retry Works
(explain in 2-3 lines — you explained it well earlier)
```

---

Fill the sections marked with `(write...)` yourself — you know all the answers from building it 😄

Then create a `.env.example` file with empty values so reviewer knows what variables are needed:
```
REDIS_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
PORT=
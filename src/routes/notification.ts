import { Router, Request, Response } from 'express';
import { getIO } from '../socket';
import emailQueue from '../queues/emailQueue';

const router = Router();

// POST /notifications/email
router.post('/notifications/email', async (req: Request, res: Response) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, message' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(to)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const job = await emailQueue.add("send-email", { to, subject, message }, {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000
            }
        })
        getIO().emit("notification-status", {
            email: to,
            status: "queued",
            timestamp: new Date().toISOString()
        })
        return res.status(200).json({ jobId: job.id });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to queue email job' });
    }
});

// GET /notifications/queue-status
router.get('/notifications/queue-status', async (_req: Request, res: Response) => {
    try {
        const waiting = await emailQueue.getWaitingCount();
        const active = await emailQueue.getActiveCount();
        const completed = await emailQueue.getCompletedCount();
        const failed = await emailQueue.getFailedCount();

        return res.status(200).json({ waiting, active, completed, failed });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch queue status' });
    }
});

export default router;
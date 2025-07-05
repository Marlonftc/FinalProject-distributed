const express = require('express');
const router = express.Router();
const redisClient = require('../redisClient');

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Send a notification to a user
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       400:
 *         description: Message is required
 *       500:
 *         description: Internal server error
 */
router.post('/notifications', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    await redisClient.publish('user_notifications', message);
    res.status(200).json({ success: true, message });
  } catch (error) {
    console.error('🔴 Error publishing to Redis:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

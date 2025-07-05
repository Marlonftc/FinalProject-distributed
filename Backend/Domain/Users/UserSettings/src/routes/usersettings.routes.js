const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersettings.controller');

/**
 * @swagger
 * /api/settings/{userId}:
 *   get:
 *     summary: Get user settings
 *     tags: [User Settings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Settings found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 theme:
 *                   type: string
 *                 language:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get('/:userId', controller.getSettings);

/**
 * @swagger
 * /api/settings/{userId}:
 *   put:
 *     summary: Update user settings
 *     tags: [User Settings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated
 *       400:
 *         description: Invalid input
 */
router.put('/:userId', controller.updateSettings);

module.exports = router;

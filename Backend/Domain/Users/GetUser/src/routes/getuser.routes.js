const express = require('express');
const router = express.Router();
const controller = require('../controllers/getuser.controller');

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', controller.getUser);

module.exports = router;


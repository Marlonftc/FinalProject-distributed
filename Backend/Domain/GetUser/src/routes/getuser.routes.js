const express = require('express');
const router = express.Router();
const controller = require('../controllers/getuser.controller');

router.get('/:id', controller.getUser);

module.exports = router;

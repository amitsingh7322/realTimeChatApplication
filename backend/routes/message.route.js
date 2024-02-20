const express = require("express");
const router = express.Router();
const messageController = require('../controllers/message.controller');
const {authGuard }= require("../middleware/authGuard");
router.post('/send/:id',authGuard, messageController.sendMessage);
router.get('/:id',authGuard, messageController.getMessage);

module.exports = router;


const express = require('express');
const router = express.Router();

const ChatController = require('../app/Controllers/ChatController');

router.post('/', ChatController.createChat);
router.get('/userId', ChatController.findUserChats);
router.get('/find/:firstId/:secondId', ChatController.findChat);

module.exports = router;

const express = require('express');
const router = express.Router();

const ChatController = require('../app/Controllers/ChatController');

router.get('/find/:firstId/:secondId', ChatController.findChat);
router.get('/:userId', ChatController.findUserChats);

router.post('/', ChatController.createChat);

module.exports = router;

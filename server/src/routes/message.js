const express = require('express');
const router = express.Router();

const MessageController = require('../app/Controllers/MessageController');

router.get('/:chatId', MessageController.getMessage);

router.post('/', MessageController.createMessage);

module.exports = router;

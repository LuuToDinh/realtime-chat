const ChatModel = require('../Models/ChatModel');

class ChatController {
    async createChat(req, res) {
        const [firstId, secondId] = req.body;
    }

    async findUserChats(req, res) {
        const [firstId, secondId] = req.params;
    }

    async findChat(req, res) {
        const [firstId, secondId] = req.params;
    }
}

module.exports = new ChatController();

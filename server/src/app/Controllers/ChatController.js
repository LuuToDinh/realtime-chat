const ChatModel = require('../Models/ChatModel');

class ChatController {
    async createChat(req, res) {
        try {
            console.log(req.body);

            const { firstId, secondId } = req.body;

            const chat = await ChatModel.findOne({
                members: { $all: [firstId, secondId] },
            });

            if (chat) {
                return res.status(200).json(chat);
            }

            const newChat = new ChatModel({
                members: [firstId, secondId],
            });

            const response = await newChat.save();

            return res.status(200).json(response);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: `An error occurred in server side: ${err}` });
        }
    }

    async findUserChats(req, res) {
        try {
            const userId = req.params.userId;

            const userChats = await ChatModel.find({
                members: { $in: [userId] },
            });

            return res.status(200).json(userChats);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: `An error occurred in server side: ${err}` });
        }
    }

    async findChat(req, res) {
        try {
            const { firstId, secondId } = req.params;

            const chats = await ChatModel.find({
                members: { $all: [firstId, secondId] },
            });

            return res.status(200).json(chats);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: `An error occurred in server side: ${err}` });
        }
    }
}

module.exports = new ChatController();

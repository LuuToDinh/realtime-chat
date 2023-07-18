const MessageModel = require('../Models/MessageModel');

class MessageController {
    async createMessage(req, res) {
        const { chatId, senderId, text } = req.body;

        const message = new MessageModel({
            chatId,
            senderId,
            text,
        });

        try {
            const response = await message.save();

            return res.status(200).json(response);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: `An error occurred in server side: ${err}` });
        }
    }

    async getMessage(req, res) {
        console.log('Ok');
        const chatId = req.params.chatId;

        try {
            const response = await MessageModel.find({ chatId });

            return res.status(200).json(response);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: `An error occurred in server side: ${err}` });
        }
    }
}

module.exports = new MessageController();

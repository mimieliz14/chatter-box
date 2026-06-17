const Message = require("../models/Message")

const createMessage = async (messageData) => {
    const message = await Message.create(messageData)
    return await message.populate('sender', 'username')
}

const getMessagesByChannel = async (channelId) => {
    return await Message.find({ channelId })
        .populate('sender', 'username')
        .sort({ timestamp: 1 })
        .lean()
}

module.exports = {
    createMessage,
    getMessagesByChannel
};
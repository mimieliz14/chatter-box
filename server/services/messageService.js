const messageRepository = require("../repositories/messageRepository")
const channelRepository = require("../repositories/channelRepository")
const AppError = require("../middleware/AppError")

const createMessage = async (channelId, userId, content) => {

    const channel = await channelRepository.findChannelById(channelId)
    if (!channel) {
        throw new AppError("Channel not found", 404)
    }

    const isMember = channel.members.some(member => member.toString() === userId)
    if (!isMember) {
        throw new AppError("User is not member of this channel", 403)

    }
    const message = await messageRepository.createMessage({ channelId, sender: userId, content })
    return message
}

const getMessagesByChannel = async (channelId) => {
    const channel = await channelRepository.findChannelById(channelId)
    if (!channel) {
        throw new AppError("Channel not found", 404)
    }
    return await messageRepository.getMessagesByChannel(channelId)
}
module.exports = {
    createMessage,
    getMessagesByChannel
}
const channelRepository = require("../repositories/channelRepository")
const userRepository = require("../repositories/userRepository")
const AppError = require("../middleware/AppError")

const createChannel = async (name, description, userId) => {
    const channelExists = await channelRepository.findChannelByName(name)
    if (channelExists) {
        throw new AppError("Channel name already exists", 409)
    }
    const channel = await channelRepository.createChannel({
        name, description, createdBy: userId, members: [userId]
    })
    await userRepository.addJoinedChannel(userId, channel._id)

    return channel
}


const getPublicChannels = async () => {
    return await channelRepository.getPublicChannels()
}

const subscribeChannel = async (channelId, userId) => {
    const channel = await channelRepository.findChannelById(channelId)
    if (!channel) {
        throw new AppError("Channel not found", 404)
    }

    await channelRepository.addMemberToChannel(channelId, userId)
    await userRepository.addJoinedChannel(userId, channelId)
    return {
        message: "Joined channel successfully"
    }
}

const getChannelDetails = async (channelId) => {
    const channel = await channelRepository.getChannelDetails(channelId)

    if (!channel) {
        throw new AppError("Channel not found", 404)
    }
    return channel
}

const unsubscribeChannel = async (channelId, userId) => {
    const channel = await channelRepository.findChannelById(channelId);
    if (!channel) {

        throw new AppError("Channel not found", 404);

    }
    await channelRepository.removeMemberFromChannel(channelId, userId);

    await userRepository.removeJoinedChannel(userId, channelId);

    return {
        message: "Successfully left the channel"
    }

}

module.exports = {
    createChannel,
    getPublicChannels,
    subscribeChannel,
    getChannelDetails,
    unsubscribeChannel
}
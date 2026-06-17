const Channel = require("../models/Channel")

const createChannel = async (channelData) => {
    return await Channel.create(channelData)

}

const findChannelById = async (channelId) => {
    return await Channel.findById(channelId)
}

const findChannelByName = async (name) => {
    return await Channel.findOne({ name })

}

const getPublicChannels = async () => {
    return await Channel.find().select("-members").sort({ createdAt: -1 })
}

const addMemberToChannel = async (channelId, userId) => {
    return await Channel.findByIdAndUpdate(
        channelId,
        {
            $addToSet: {
                members: userId
            }
        },
        {
            returnDocument: "after"
        }
    )

}

const getChannelDetails = async (channelId) => {
    return await Channel.findById(channelId)
        .populate("members", "username")

}

const removeMemberFromChannel = async (channelId, userId) => {
    return await Channel.findByIdAndUpdate(channelId,
        {
            $pull: {
                members: userId
            }
        },
        {
            new: true
        }
    )
}
module.exports = {
    createChannel,
    findChannelById,
    findChannelByName,
    getPublicChannels,
    addMemberToChannel,
    getChannelDetails,
    removeMemberFromChannel
}

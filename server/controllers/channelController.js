const channelService = require("../services/channelService");

const createChannel = async (req, res, next) => {

    try {
        const { name, description } = req.body
        const channel = await channelService.createChannel(name, description,  req.user.userId)
        return res.status(201).json({
            success: true,
            message: "Channel created successfully",
            data: channel
        })

    } catch (error) {
        next(error)
    }
}

const getPublicChannels = async (req, res, next) => {
    try {

        const channel = await channelService.getPublicChannels()

        return res.status(200).json({
            success: true,
            data: channel
        })

    } catch (error) {
        next(error)
    }
}

const subscribeChannel = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = channelService.subscribeChannel(id, req.user.id)
        return res.status(200).json({
            success: true,
            ...result
        })

    } catch (error) {
        next(error)
    }
}

const getChannelDetails = async (req, res, next) => {
    const { id } = res.params
    try {
        const channel = channelService.getChannelDetails(id)

        return res.status(200).json({
            success: true,
            data: channel
        })

    } catch (error) {
        next(error)
    }
}

const unsubscribeChannel = async (req, res, next) => {
    try {
        const result =
            await channelService.unsubscribeChannel(req.params.id, req.user.userId);
        res.status(200).json({
            success: true,
            ...result
        })
    } catch (error) {

        next(error)

    }

}
module.exports = {
    createChannel,
    getPublicChannels,
    subscribeChannel,
    getChannelDetails,
    unsubscribeChannel
}


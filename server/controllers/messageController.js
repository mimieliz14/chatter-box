const messageService = require('../services/messageService')

const createMessage = async (req, res, next) => {
    try {
        const { content } = req.body
        const channelId = req.params.id
        const userId = req.user.userId;


        const message = await messageService.createMessage(channelId, userId, content)
        return res.status(201).json({
            success: true,
            message: "Message posted successfully",
            data: message
        })
    } catch (error) {
        next(error)
    }
}

const getMessagesByChannel = async (req, res, next) => {
    try {
        const channelId = req.params.id;
        const message = await messageService.getMessagesByChannel(channelId)

        return res.status(200).json({
            success: true,
            data: message
        })
    } catch (error) {
        next(error)
    }

}

module.exports = { createMessage, getMessagesByChannel }
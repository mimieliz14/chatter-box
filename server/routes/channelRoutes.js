const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { createChannel, getPublicChannels, subscribeChannel, getChannelDetails, unsubscribeChannel } = require("../controllers/channelController")


router.post("/", authMiddleware, createChannel)
router.get("/public", authMiddleware, getPublicChannels)
router.post("/:id/join", authMiddleware, subscribeChannel)
router.get("/:id", authMiddleware, getChannelDetails)
router.get("/:id/leave", authMiddleware, unsubscribeChannel)


module.exports = router

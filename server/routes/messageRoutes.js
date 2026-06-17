const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { createMessage,getMessagesByChannel } = require("../controllers/messageController")


router.post("/:id/messages", authMiddleware, createMessage)
router.get("/:id/messages", authMiddleware, getMessagesByChannel)


module.exports = router
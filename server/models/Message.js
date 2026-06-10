const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', require: true }

},
{
    timestamps: true,
  }
)

const messageModel = mongoose.model("Message", messageSchema)
export default messageModel
const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

const channelModel = mongoose.model("channel", channelSchema)
export default channelModel
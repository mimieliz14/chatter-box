const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{    content:{
        type:String,
        required:true,
        trim:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel",
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }


},
{
    timestamps:true
})

const messageModel =
mongoose.model(
    "Message",
    messageSchema
)


module.exports = messageModel;
const User = require("../models/User")


const findUserByEmail = async (email) => {
    return User.findOne({email});
};

const createUser = async (userData) => {
    return User.create(userData)
}

const addJoinedChannel = async (userId, channelId) => {
    return await User.findByIdAndUpdate(userId,
        {
            $addToSet: {
                joinedChannels: channelId
            }
        },
        {
            new: true
        }
    )
}

const removeJoinedChannel = async (userId, channelId) => {
    return await User.findByIdAndUpdate(userId,
        {
            $pull: {
                joinedChannels: channelId
            }
        },
        {
            new: true
        }
    )

}

module.exports = { findUserByEmail, createUser, addJoinedChannel, removeJoinedChannel }
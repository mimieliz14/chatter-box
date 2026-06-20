const User = require("../models/User")


const findUserByEmail = async (email) => {
    return User.findOne({ email })
}

const findUserByUsernameOrEmail = async (identifier) => {

    return User.findOne({
        $or: [
            { email: identifier },
            { username: identifier }
        ]
    });

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
            returnDocument: 'after'
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
            returnDocument: 'after'
        }
    )

}

module.exports = { findUserByEmail, findUserByUsernameOrEmail, createUser, addJoinedChannel, removeJoinedChannel }
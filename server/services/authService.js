const userRepository = require("../repositories/userRepository")
const bcrypt = require("bcryptjs")

const registerUser = async (username, email, password) => {
    const userExists = await userRepository.findByEmail(email)

    if (userExists) {
        throw new Error(" User already exist")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userRepository.createUser({ username, email, password: hashedPassword })

    return user

}

module.exports ={registerUser}

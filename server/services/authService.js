const userRepository = require("../repositories/userRepository")
const AppError = require("../middleware/AppError")
const { generateToken } = require("../helpers/jwtHelper")
const { hashPassword, comparePassword } = require("../helpers/bcryptHelper");

const registerUser = async (username, email, password) => {
    email = email.toLowerCase().trim();
    const userExists = await userRepository.findUserByEmail(email)

    if (userExists) {
        throw new AppError("User already exist", 409)
    }

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.createUser({
        username,
        email,
        password: hashedPassword
    })

    return {
        userId: user._id,
        username: user.username,
        email: user.email
    }

}

const loginUser = async (email, password) => {
    email = email.toLowerCase().trim();

    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user._id);

    return {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        token
    }

}
module.exports = { registerUser, loginUser }

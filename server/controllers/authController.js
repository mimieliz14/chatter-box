const authService = require('../services/authService')
const authMiddleware = require("../middleware/authMiddleware")
const bcrypt = require("bcryptjs");


const registerUser = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;
        const user = await authService.registerUser(username, email, password)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        })

    } catch (error) {
        next(error);
    }

}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });

    } catch (error) {
        next(error);
    }
}

const getProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            data: { userId: req.user.userId }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { registerUser, loginUser, getProfile };
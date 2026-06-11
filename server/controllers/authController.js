const authService = require('../services/authService')
const

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await authService.registerUser(username, email, password)
        res.status(201).json({ user })

    } catch (error) {
        res.status(400).json({ message: error.message },
            user
        );
    }

}

module.exports = { register };
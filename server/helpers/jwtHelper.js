const jwt = require("jsonwebtoken")

const generateToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,{
            expiresIn: "1d"
        })
}

console.log("JWT SECRET (helper):", process.env.JWT_SECRET);
const verifyToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
}

console.log("verifyToken", verifyToken);

module.exports ={generateToken, verifyToken}
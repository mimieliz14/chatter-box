const User = require ("../models/User")


const findByEmail = async(email) =>{
    return await User.findOne({email})
}

 const createUser = async(userData) =>{
    return await User.create(userData)
 }

 module.exports = {findByEmail,createUser}
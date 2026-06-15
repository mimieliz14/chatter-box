const bycrypt = require ("bcryptjs")

const hashPassword = async([password])=>{
    return await bcrypt.hash(password,10)
}

 const isMatch = async(password,hashPassword) =>{
    return await bcrypt.compare(password,hashPassword) 
 }


 module.export ={hashPassword,isMatch}
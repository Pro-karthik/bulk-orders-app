const jwtToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateToken = (account) => {
    return jwtToken.sign({
      id : account.id,
      email : account.email,
      role : account.role,
    },process.env.JWT_SECRET,{ expiresIn: "7d" })

}

const verifyToken = (token) => {
    try{
        return jwtToken.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return null
    }
    
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password,10)
}

const comparePassword = async (password,hash) => {
    return await bcrypt.compare(password,hash)
}

module.exports = {generateToken,verifyToken,hashPassword,comparePassword}
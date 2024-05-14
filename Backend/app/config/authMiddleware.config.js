const db = require("../models")
const User = db.users

const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(401).json({message: "Authorization token missing" })
    }
    try {
      const user =  User.findOne({where: {access_token: token}})
      if(!user){
        return res.status(401).json({message: "Authorization token invalid" })
      } else {
         req.user = user
         next()
      }
     
    } catch (error) {
        console.log(error)
    }

}

module.exports = authMiddleware
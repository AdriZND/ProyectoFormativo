const db = require("../models")
const User = db.users

const authMiddleware = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(401).json({message: "Ausencia de token de autorización" })
    }
    try {
      const user =  User.findOne({where: {access_token: token}})
      if(!user){
        return res.status(401).json({message: "Token de autorización invalido" })
      } else {
         req.user = user
         next()
      }
     
    } catch (error) {
        console.log(error)
    }

}

module.exports = authMiddleware
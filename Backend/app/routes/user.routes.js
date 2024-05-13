//Definimos las rutas que recibiran las peticiones y las respuestas que ejecutaran

module.exports = (app) => {
  const users = require("../controllers/user.controller")
  const userRouter = require("express").Router()
  const upload = require('../config/multer.config')

  // Create a new user
  userRouter.post("/user", users.create)

  // Retrieve all users
  userRouter.get("/user", users.findAll)

  userRouter.get("/user/students", users.findAllStudents)

  //Delete all users
  userRouter.delete("/user", users.deleteAll)

  //Retrieve one user by username
  userRouter.get("/user/username", users.findOneUsername)

  //Retrieve user by id
  userRouter.get("/user/id", users.findOneId)

  //Update user with username
  userRouter.put("/user/username/id", users.update)

  //Delete user with username
  userRouter.delete("/user/username/:id", users.delete)

  //Retrieve one user by email for email validation
  userRouter.post("/forgetpassword", users.findOneEmail)

  //Change user password
  userRouter.put(
    "/forgetpassword/changepassword/:access_token",
    users.updateUserPassword
  )

  userRouter.post('/upload/id',upload.single('avatar'), async (req, res) => {
    try {
     console.log(req.file)
     console.log(req.query.id)
     const userId = req.query.id
     const avatarPath = {
      avatarPath : req.file.path
     }
     await users.updateUserAvatar(userId, avatarPath)
     res.status(200).send({message: 'Image uploaded!'})
    } catch (error) {
      console.log(error)
    }
  }) 

  app.use("/api", userRouter)
}

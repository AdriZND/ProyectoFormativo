//Definimos las rutas que recibiran las peticiones y las respuestas que ejecutaran

module.exports = (app) => {
  const users = require("../controllers/user.controller");

  const userRouter = require("express").Router();

  // Create a new user
  userRouter.post("/user", users.create);

  // Retrieve all users
  userRouter.get("/user", users.findAll);

  //Delete all users
  userRouter.delete("/user", users.deleteAll);

  //Retrieve one user by username
  userRouter.get("/user/username", users.findOneUsername);

  //Retrieve user by id
  userRouter.get("/user/id", users.findOneId);

  //Update user with username
  userRouter.put("/user/username/:username", users.update);

  //Delete user with username
  userRouter.delete("/user/username/:id", users.delete);

  //Retrieve one user by email for email validation
  userRouter.post("/forgetpassword", users.findOneEmail);

  //Change user password
  userRouter.put(
    "/forgetpassword/changepassword/:access_token",
    users.updateUserPassword
  );

  app.use("/api", userRouter);
};

module.exports = (app, passport) => {
  const sessions = require("../controllers/session.controller");
  const authRouter = require("express").Router();

  //Dirección en la que se efectuará la petición y manejo de la misma
  authRouter.post("/login", (req, res, next) => {
    passport.authenticate("local-login", async (err, user, info) => {
      //Handle error
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      //Handle authentication fail
      if (!user) {
        console.error(info.message);
        return res.status(401).json({ message: info.message }); //Con info.message recuperamos el mensaje devuelto del findOne
      }

      //Authentication succeeded
      console.log("User authenticated successfully");
      await sessions.create(user.id);
      const session = await sessions.findOne(user.id);
      return res
        .status(200)
        .send({ message: "Authentication successful", user, session });
    })(req, res, next);
  });

  authRouter.post("/logout", sessions.delete);

  app.use("/api", authRouter);
};

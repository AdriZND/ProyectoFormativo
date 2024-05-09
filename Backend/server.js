require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();


//Conectar a la DB
const db = require("./app/models");
db.sequelize
  .authenticate({})
  .then(() => {
    console.log("Connection successfully established");
  })
  .catch((err) => {
    console.log("Failed to connect: " + err.message);
  });

//CORS SETUP
const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:8081",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Passport strategies config
require("./app/controllers/passport.controller")(passport, db.users);

//Routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app, passport);
require("./app/routes/relations.routes")(app);
require("./app/routes/subject.routes")(app);

//Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PFormativo app." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server ir running on port ${PORT}`);
});

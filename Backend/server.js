require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();
const path = require('path')


//Conectar a la DB
const db = require("./app/models");
db.sequelize
  .authenticate({})
  .then(() => {
    console.log("Conexión establecida");
  })
  .catch((err) => {
    console.log("Fallo de conexión: " + err.message);
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

//Provide static
app.use('/app/assets', express.static(path.join(__dirname, 'app', 'assets')))

//Passport strategies config
require("./app/controllers/passport.controller")(passport, db.users);

//Routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app, passport);
require("./app/routes/relations.routes")(app);
require("./app/routes/subject.routes")(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//  error handler
  app.use(function(err, req, res, next) {
 // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 404).send({message: 'Unknown route'})
  });

//Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PFormativo app." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server ir running on port ${PORT}`);
});

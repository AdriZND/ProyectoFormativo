require("dotenv").config()
const express = require("express")
const cors = require("cors")
const passport = require("passport")
const app = express()
const path = require("path")
const http = require("http")
var history = require('connect-history-api-fallback');

//Conectar a la DB
const db = require("./app/models")
db.sequelize
  .authenticate({})
  .then(() => {
    console.log("Conexión establecida")
  })
  .catch((err) => {
    console.log("Fallo de conexión: " + err.message)
  })

//CORS SETUP
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:81",
    "http://localhost:8080",
  ],
  credentials: true,
}
app.use(cors(corsOptions))

//Body parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the 'dist' directory

//Provide static
app.use("/app/assets", express.static(path.join(__dirname, "app", "assets")))

//Passport strategies config
require("./app/controllers/passport.controller")(passport, db.users)

//Routes
require("./app/routes/user.routes")(app)
require("./app/routes/auth.routes")(app, passport)
require("./app/routes/relations.routes")(app)
require("./app/routes/subject.routes")(app)

app.use(history());

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

 // catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
//  error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 404).send({ message: "Unknown route" })
}) 

//Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PFormativo app." })
})

const PORT = process.env.PORT || 8080
if (process.env.NODE_ENV === "production") {
  //Create server that serves front and back
  const server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`Server ir running on production mode port ${PORT}`)
  })
} else {
  app.listen(PORT, () => {
    console.log(`Server ir running on dev mode port ${PORT}`)
  })
}

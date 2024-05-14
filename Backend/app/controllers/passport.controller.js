module.exports = (passport, user) => {
  const LocalStrategy = require("passport-local").Strategy
  const User = user
  const bcrypt = require("bcrypt")


  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        // Find the user by username
        User.findOne({ where: { username: username } })
          .then((user) => {
            // If user does not exist
            if (!user) {
              return done(null, false, {
                message: "Usuario o contraseña incorrectos",
              })
            }
            // Compare the provided password with the hashed password
            bcrypt.compare(
              password,
              user.password_token,
              function (err, result) {
                if (err) {
                  return done(err)
                }
                if (!result) {
                  return done(null, false, { message: "Contraseña incorrecta" })
                }
                // If everything is correct but the account is inactive
                if (!user.dataValues.active) {
                  return done(null, false, {
                    message: "Debes validar el email antes de iniciar sesión",
                  })
                }
                // If everything is correct, return the user
                return done(null, user)
              }
            )
          })
          .catch((err) => {
            console.error("Error: ", err)
            return done(null, false, {
              message: "Algo fue mal iniciando sesión",
            })
          })
      }
    )
  )
}

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
                message: "Incorrect username or password",
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
                  return done(null, false, { message: "Incorrect password" })
                }
                // If everything is correct but the account is inactive
                if (!user.dataValues.active) {
                  return done(null, false, {
                    message: "You must validate your e-mail before logging in",
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
              message: "Something went wrong with your login",
            })
          })
      }
    )
  )
}

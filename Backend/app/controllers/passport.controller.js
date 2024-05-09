module.exports = (passport, user) => {
  const LocalStrategy = require("passport-local").Strategy;
  const User = user;

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password_token",
        passReqToCallback: true,
      },
      function (req, username, password_token, done) {
        const isValidPassword = (userPass, password_token) => {
          return userPass === password_token ? true : false;
        };
        //Buscamos el usuario por el username
        User.findOne({ where: { username: username } })
          .then((user) => {
            //Si no existe el usuario
            if (!user) {
              return done(null, false, {
                message: "Incorrect username or password",
              });
            }
            //Si existe el usuario pero la contraseña no es correcta
            if (!isValidPassword(user.password_token, password_token)) {
              return done(null, false, { message: "Incorrect password" });
            }
            //Si todo es correcto pero el estado de la cuenta es inactivo
            if (!user.dataValues.active) {
              return done(null, false, {
                message: "You must validate your e-mail before loggin in",
              });
            }
            //Si todo es correcto, se devuelve el usuario
            return done(null, user);
          })
          .catch((err) => {
            console.log("Error: ", err);
            return done(null, false, {
              message: "Something went wront with your Login",
            });
          });
      }
    )
  );
};

const db = require("../models");
const Session = db.sessions;

//Crear sesión de usuario en BDD
exports.create = async (id_user) => {
  try {
    const session = {
      id_user: id_user,
    };
    await Session.create(session);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  const id_user = req.body.id_user;
  await Session.destroy({
    where: { id_user: id_user },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Sesión eliminada correctamente",
        });
      } else {
        res.send({
          message: `Imposible eliminar sesión con id de usuario: ${id_user}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Imposible eliminar sesión con id de usuario: ${id_user}`,
      });
    });
};

exports.findOne = async (id_user) => {
  try {
    return await Session.findOne({ where: { id_user: id_user } });
  } catch (error) {
    console.log(error);
  }
};

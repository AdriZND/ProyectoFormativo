const db = require("../models")
const Relation = db.relations
const User = db.users
const Subject = db.subjects

exports.findUserRelations = async (req, res) => {
  try {
    const id = req.query.id
    const user = await User.findOne({ where: { id: id } })
    if (user.role === 1) {
      const relation = await Relation.findAll({
        where: { id_student: user.id },
      })
      return res.status(200).send({ relation })
    } else if (user.role === 2) {
      const relation = await Relation.findAll({
        where: { id_teacher: user.id },
      })
      return res.status(200).send({ relation })
    } else {
      throw new Error(`No se pudo encontrar usuario con ese ID`)
    }
  } catch (error) {
    console.log(error)
  }
}

exports.findNumberOfStudents = async (req, res) => {
  try {
    const id_subject = req.query.id_subject
    const numberOfStudents = await Relation.findAll({where: {id_subject: id_subject}})
    res.status(200).send(String(numberOfStudents.length))
  } catch (error) {
    console.log(error)
    res.status(500).send("Error interno del servidor")
  }
}

exports.findUserSubject = async (req, res) => {
  try {
    const id = req.query.id
    const subject = await Subject.findOne({ where: { id: id } })
    return res.status(200).send({ subject })
  } catch (error) {
    console.log(error)
  }
}

exports.delete = async (req, res) => {
  const id = req.query.id

  await Relation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Relación eliminada correctamente",
        })
      } else {
        res.send({
          message: `Imposible eliminar la relación con id: ${id}`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Imposible eliminar la relación con id:  ${id}`,
      })
    })
}

exports.create = async (req, res) => {
  const relation = {
    id_student: req.body.id_user,
    id_teacher: req.body.id_teacher,
    id_subject: req.body.id_subject,
  }

  try {
    const fetchRelation = await Relation.findOne({ where: relation })
    if (fetchRelation) {
      res.status(250).send({ message: "Relación ya creada" })
      return
    } else {
      await Relation.create(relation)
      res.status(200).send({ message: "Relación creada!" })
    }
  } catch (error) {
    console.log(error)
  }
}

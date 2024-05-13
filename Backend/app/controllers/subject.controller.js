const db = require("../models");
const Subject = db.subjects;

exports.create = async (req, res) => {
  const subject = {
    subject_name: req.body.subject_name,
    id_teacher: req.body.id_teacher,
  }

  try {
    const checkIfSubject = await Subject.findOne({
      where: { subject_name: subject.subject_name },
    })
    if (!checkIfSubject) {
      try {
        await Subject.create(subject)
        res.status(200).send({
          message: "Subject created!",
        });
      } catch (error) {
        console.log(error)
      }
    } else {
      res.status(250).send({
        message: "Subject already registered",
      })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.findAll = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).send(subjects)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving subjects",
    })
  }
}

exports.findAllByTeacher = async (req, res) => {
  try {
    const id_teacher = req.query.teacher
    const subjects = await Subject.findAll({where: {id_teacher: id_teacher} })
    res.status(200).send({subjects})
  } catch (error) {
    res.status(500).send({
      message: err.message || "Error retrieving subjects"
    })
  }
}

exports.findSubjectName = async (req, res) => {
  const name = req.query.name
  try {
    const subject = await Subject.findOne({ where: { subject_name: name } })
    res.send(subject)
  } catch (error) {
    res.status(500).send({
      message: err.message || "Error retrieving subject",
    })
  }
}

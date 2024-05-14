const db = require("../models")
const User = db.users
const Op = db.Sequelize.Op

const getUuid = require("uuid-by-string")
const {
  sendMessageValidation,
  sendMessageForgetPassword,
} = require("../config/email.config")
const bcrypt = require("bcrypt")
const saltRounds = 10

//Crear y guardar un nuevo Usuario
exports.create = async (req, res) => {
  try {
    // Check if existing user in the database
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    })
    if (existingUser) {
      return res
        .status(250)
        .send({ message: "Username has already been registered" })
    }

    // Check token
    if (
      req.body.role === "2" &&
      req.body.token !== process.env.TOKEN_PROFESOR
    ) {
      return res.status(260).send({ message: "Token provided wasn't valid" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    // Create user
    const user = {
      username: req.body.username,
      name: req.body.name,
      surnames: req.body.surnames,
      email: req.body.email,
      role: req.body.role,
      password_token: hashedPassword,
    }

    const createdUser = await User.create(user)

    sendMessageValidation(createdUser.email, createdUser.username)

    res.status(200).send({
      message: "User created successfully, please validate your email to login",
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: error.message || "Error al crear usuario",
    })
  }
}

//Devolver todos los usuarios
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll()
    res.status().send(users)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving users",
    })
  }
}

exports.findAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({ where: { role: 1 } })
    res.status(200).send(students)
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error retrieving students",
    })
  }
}

//Devolver usuario por username
exports.findOneUsername = async (req, res) => {
  const username = req.query.username

  await User.findOne({ where: { username: username } })
    .then((user) => {
      if (user) {
        res.send(user)
      } else {
        res.status(404).send({
          message: `Cannot find User with username= ${username}`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with username= " + username,
      })
    })
}

//Encontrar usuario por email
exports.findOneEmail = async (req, res) => {
  const email = req.body.email

  await User.findOne({ where: { email: email } })
    .then((data) => {
      if (data.active === true) {
        sendMessageForgetPassword(data.email, data.access_token)
        res.status(200).send({
          message: "Email sent successfully",
        })
      } else {
        res.status(400).send({
          message: "Email is not active",
        })
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: `Email is not registered= ${email}`,
      })
    })
}

//Encontrar al user por id
exports.findOneId = async (req, res) => {
  try {
    const id = req.query.id
    const user = await User.findOne({ where: { id: id } })
    if (user) {
      res.status(200).send({ message: "User found!", user })
    } else {
      res.send({ message: "Couldnt find user with ID: " + id })
    }
  } catch (error) {
    console.log(error)
  }
}

//Update de usuario mediante el username
exports.update = async (req, res) => {
  const id = req.query.id
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
      const body = {
        name: req.body.name,
        surnames: req.body.surnames,
        username: req.body.username,
        email: req.body.email,
        password_token: hashedPassword,
      }

      const response = await User.update(body, {
        where: { id: id },
      })
      if (response) {
        res.status(200).json({
          message: "User updated successfully",
        })
      } else {
        res.send({
          message: `Cannot update user with id: ${id}`,
        })
      }
    } catch (error) {
      console.log(error)
    }
  
}

exports.updateValidation = async (req, res) => {
  const username = req.query.username

  if (req.body.active === true) {
    const activeUser = await User.findOne({ where: { username: username } })
    const body = {
      access_token: await getUuid(activeUser.username),
      active: req.body.active,
    }
    
    try {
      const response = await User.update(body, {
        where: { username: username },
      })
      if (response) {
        res.status(200).json({
          message: "User updated successfully",
        })
      } else {
        res.send({
          message: `Cannot update user with username: ${username}`,
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: `Error updating user with username=${username} `,
      })
    }
  }
}

//Update de password de usuario mediante access_token
exports.updateUserPassword = async (req, res) => {
  const access_token = req.params.access_token
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
  const password_token = {
    password_token: hashedPassword,
  } 

  await User.update(password_token, {
    where: { access_token: access_token },
  })
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Password updated successfully",
        })
      } else {
        res.send({
          message: `Cannot update password for that user`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating user`,
      })
    })
}

//Update avatar path on avatar submit
exports.updateUserAvatar = async (userId, avatarPath) => {
  await User.update(avatarPath, { where: { id: userId } })
}

//Borrar usuario por id
exports.delete = async (req, res) => {
  const id = req.query.id

  await User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User deleted successfully",
        })
      } else {
        res.send({
          message: `Cannot delete user with id= ${id}`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot delete user with id= ${id}`,
      })
    })
}

//Borrar todos los usuarios
exports.deleteAll = async (req, res) => {
  await User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Users deleted successfully`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while removing all users",
      })
    })
}

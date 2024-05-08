const db = require("../models")
const User = db.users;
const Op = db.Sequelize.Op
const getUuid = require('uuid-by-string')
const { sendMessageValidation, sendMessageForgetPassword } = require("../config/email.config")


//Crear y guardar un nuevo Usuario
exports.create = async (req, res) => {
   
    //Validar si el usuario ya está en la BDD
    if (await User.findOne({ where: { username: req.body.username } })) {
        res.status(250).send({
            message: "Username has already been registered"
        })
        return
    } else if (req.body.role === '2' && req.body.token !== process.env.TOKEN_PROFESOR) {
        res.status(260).send({
            message: "Token provided wasn't valid"
        })
        return
    }
    else {

        //Crear usuario
        const user = {
            username: req.body.username,
            name: req.body.name,
            surnames: req.body.surnames,
            email: req.body.email,
            role: req.body.role,
            password_token: getUuid(req.body.password)
        }

        //Guardar usuario en DB
        await User.create(user)
            .then(data => {
                //Enviar mensaje de validación de correo electrónico

                sendMessageValidation(data.email, data.username)

                res.status(200).send({
                    message: 'User created successfully, please validate your email to login'
                })


            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Error al crear usuario"
                })
            })
    }
}


//Devolver todos los usuarios
exports.findAll = async (req, res) => {
    const username = req.query.username
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null

    await User.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error retrieving users"
            })
        })
}

//Devolver usuario por username
exports.findOneUsername = async (req, res) => {
    const username = req.params.username

    await User.findOne({ where: { username: username } })
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find User with username= ${username}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with username= " + username
            })
        })
}

//Encontrar usuario por email
exports.findOneEmail = async (req, res) => {
    const email = req.body.email



    await User.findOne({ where: { email: email } })
        .then(data => {
            if (data.active === true) {
                sendMessageForgetPassword(data.email, data.access_token)
                res.status(200).send({
                    message: 'Email sent successfully'
                })
            } else {
                res.status(400).send({
                    message: 'Email is not active'
                })
            }
        })
        .catch(err => {
            res.status(404).send({
                message: `Email is not registered= ${email}`

            })

        })
}

//Encontrar al user por id
exports.findOneId = async (req, res) => {
    try { 
    console.log(req.query.id)
    const id = req.query.id
    const user = await User.findOne({where: {id : id}})
    if(user){
        res.status(200).send({message: 'User found!', user})
    } else {
        res.send({message: 'Couldnt find user with ID: ' + id})
    }
} catch (error) {
    console.log(error)
}

}

//Update de usuario mediante el username 
exports.update = async (req, res) => {
    const username = req.params.username

    if (req.body.active === true) {

        req.body.access_token = await getUuid(req.params.username)
    }

    await User.update(req.body, {
        where: { username: username }
    })
        .then((data) => {
            if (data) {
                res.status(200).json({
                    message: "User updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update user with username: ${username}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating user with username=${username} `
            })
        })

}

//Update de password de usuario mediante access_token
exports.updateUserPassword = async (req, res) => {
    const access_token = req.params.access_token

    const password_token = {
        password_token: await getUuid(req.body.password)
    }

    await User.update(password_token, {
        where: { access_token: access_token }
    })
        .then((data) => {
            if (data) {
                res.status(200).send({
                    message: "Password updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update password for that user`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating user`
            })
        })

}

//Borrar usuario por id
exports.delete = async (req, res) => {
    const id = req.query.id

    await User.destroy({
        where: { id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User deleted successfully"
                })
            } else {
                res.send({
                    message: `Cannot delete user with id= ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot delete user with id= ${id}`
            })
        })

}

//Borrar todos los usuarios
exports.deleteAll = async (req, res) => {

    await User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Users deleted successfully`
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while removing all users"
            })
        })

}


const db = require("../models")
const Session = db.sessions





//Crear sesión de usuario en BDD
exports.create = async (id_user) => {

    try {
        const session = {
            id_user: id_user
        }
        await Session.create(session)


    } catch (error) {
        console.log(error)
    }
}


exports.delete = async (req, res) => {
    const id_user = req.body.id_user
    await Session.destroy({
        where: { id_user: id_user }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Session deleted successfully"
                })
            } else {
                res.send({
                    message: `Cannot delete session with user-id= ${id_user}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot delete session with id_user= ${id_user}`
            })
        })
}


exports.findOne = async (id_user) => {
    try {
       return await Session.findOne({where: {id_user: id_user}})  
    } catch (error) {
        console.log(error)
    }
}
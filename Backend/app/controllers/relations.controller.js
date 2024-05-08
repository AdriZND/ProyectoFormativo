const db = require("../models")
const Relation = db.relations
const User = db.users
const Subject = db.subjects



exports.findUserRelations = async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findOne({where: {id : id}})
        if(user.role === 1){
           const relation = await Relation.findAll({where : {id_student: user.id}})
       return res.status(200).send({relation})
    } else if (user.role === 2) {
            const relation = await Relation.findAll({where: {id_teacher: user.id}})
        return res.status(200).send({relation})
    } else {
        throw new Error(`Couldn't find user with this ID`)
    }
    } catch (error) {
        console.log(error)
    }

}

exports.findUserSubject = async (req, res) => {
    try {
        const id = req.query.id
        const subject = await Subject.findOne({where: {id : id}})
        return res.status(200).send({subject})
    } catch (error) {
        console.log(error)
    }
}

exports.delete = async (req, res) => {
    const id = req.query.id

    await Relation.destroy({
        where: { id_student: id}
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
const { sequelize, Sequelize } = require(".");
const {DataTypes} = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const Relation = sequelize.define("Students_Teachers_Relations", {
       id: {
            type: DataTypes.INTEGER,
            primaryKey: true,           
            autoIncrement: true
        } 
    }, {
        timestamps: false
    })

   /*   Relation.sync().then(() => {

        Relation.create({
            id_student: 14,
            id_teacher: 2,
            id_subject: 1
        })  
        Relation.create({
            id_student: 14,
            id_teacher: 3,
            id_subject: 2
        }) 
        Relation.create({
            id_student: 14,
            id_teacher: 7,
            id_subject: 3
        }) 
        Relation.create({
            id_student: 14,
            id_teacher: 5,
            id_subject: 4
        }) 
        Relation.create({
            id_student: 14,
            id_teacher: 6,
            id_subject: 5
        })  
        // Relation.destroy({where: {id: 17}})
    })   */
    return Relation
}
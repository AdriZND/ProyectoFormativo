const { sequelize, Sequelize } = require(".");
const {DataTypes} = require("sequelize")

module.exports = (sequelize, Sequelize) => {

    const Subject = sequelize.define("Subjects", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        }, 
        subject_name: {
            type: DataTypes.STRING
        }
    })

  /*   sequelize.sync({force: true})
        .then(() => {
            console.log("Asignaturas creadas corectamente")
            Subject.create({
                subject_name: "matematicas"
            })

            Subject.create({
                subject_name: "lengua"
            })
            Subject.create({
                subject_name: "conocimiento del medio"
            })
            Subject.create({
                subject_name: "geografia"
            })
            Subject.create({
                subject_name: "fisica"
            })
        }).catch((error) => {
            console.error('Fallo creando los roles: ', error)
        })
    */
    return Subject
}
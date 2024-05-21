const { sequelize, Sequelize, roles } = require(".")
const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Roles",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      role_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )
        /*   Role.sync({})
        .then(() => {
            console.log("Roles creados correctamente")
            Role.create({
                id: "1",
                role_name: "estudiante"
            })

            Role.create({
                id: "2",
                role_name: "profesor"
            })
        }).catch((error) => {
            console.error('Fallo creando los roles: ', error)
        })   
           */
  return Role
}

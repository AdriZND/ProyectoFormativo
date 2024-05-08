const { sequelize, Sequelize } = require(".");
const {DataTypes} = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
       id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

       },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
        },
        surnames: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        access_token: {
            type: DataTypes.UUID,
            
        },
        password_token: {
            type: DataTypes.UUID,
            
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
        

    })

    

    return User
}
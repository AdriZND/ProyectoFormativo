const { sequelize, Sequelize } = require(".");
const {DataTypes} = require("sequelize")

module.exports =  (sequelize, Sequelize) => {

    const Session = sequelize.define("Sessions",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
                
        },
        signed_in: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
            
        }
    }, {
        timestamps: false
    })

    

    return Session
}
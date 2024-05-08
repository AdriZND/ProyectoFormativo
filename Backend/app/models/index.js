const { BULKDELETE } = require("sequelize/lib/query-types")

const Sequelize = require("sequelize")
require('dotenv').config()


const sequelize = new Sequelize(
    process.env.DB, 
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        operatorAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })


    const db = {}

    db.Sequelize = Sequelize
    db.sequelize = sequelize

    //Añadimos los modelos
    db.users = require("./user.model.js")(sequelize, Sequelize)
    db.relations = require("./students_teachers_relation.model.js")(sequelize, Sequelize)
    db.sessions = require("./session.model.js")(sequelize, Sequelize)
    db.roles = require("./role.model.js")(sequelize, Sequelize)
    db.subjects = require("./subject.model.js")(sequelize, Sequelize)

    //Relaciones 
    // User con Roles
    db.users.belongsTo(db.roles, {
        foreignKey: {
            name: "role"   
        }
    })
   
     //Entre las relaciones y las asignaturas
    db.relations.belongsTo(db.subjects, {
        as: "Subject",
        foreignKey: {
            name: "id_subject"
        }    
    })

    //Relaciones profesores y alumnos
    db.relations.belongsTo(db.users, {
        foreignKey: "id_teacher",
        as: "Profesor",
        constraints: false,
        scope: {
            role: "profesor"
        }
    })

    db.relations.belongsTo(db.users, {
        foreignKey: "id_student",
        as: "Estudiante",
        constraints: false,
        scope: {
            role: "estudiante"
        }
    })

    //Relacion sesion de usuario
    db.sessions.belongsTo(db.users, {
        foreignKey: "id_user",
        as: "Session"
    })

    
    module.exports = db

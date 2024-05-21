const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Relation = sequelize.define(
    "Students_Teachers_Relations",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_teacher: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_student: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_subject: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Subjects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: false,
    }
  );

 
  return Relation;
};

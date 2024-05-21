const { sequelize, Sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define(
    "Subjects",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subject_name: {
        type: DataTypes.STRING,
      },
      id_teacher: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  

  return Subject;
};

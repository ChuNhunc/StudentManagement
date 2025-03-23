const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");

const Class = sequelize.define("Classes", {
  ClassID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  CourseID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TeacherID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ClassName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Class;

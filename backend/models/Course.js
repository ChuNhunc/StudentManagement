const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");

const Courses = sequelize.define(
  "Courses",
  {
    CourseID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    CourseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Courses;

const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");

const Attendance = sequelize.define(
  "Attendance",
  {
    AttendanceID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ClassID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StudentID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    tableName: "Attendance",
    timestamps: false,
  }
);

module.exports = Attendance;

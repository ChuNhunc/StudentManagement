const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");
const AttendanceDetail = require("./AttendanceDetail.js");

const Status = sequelize.define(
  "Status",
  {
    StatusID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Status",
    timestamps: false,
  }
);

module.exports = Status;
const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");
const Class = require("./Classes.js");

const Schedule = sequelize.define("Schedule", {
  ScheduleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ClassID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LessonID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StartTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  EndTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: "Schedule",
  timestamps: false,
});

module.exports = Schedule;

const {DataTypes} = require("sequelize");

const sequelize = require("../sequelize.js");
const Class = require("./Classes.js");

const Attendance = sequelize.define(
    "Attendance",
    {
        AttendanceID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        ClassID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LessonID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        StudentID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        StatusID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        AttendanceDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }
)

module.exports = Attendance;
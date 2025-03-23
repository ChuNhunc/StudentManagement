const {DataTypes} = require("sequelize");

const sequelize = require("../sequelize.js");

const Teachers = sequelize.define(
    "Teachers",
    {
        TeacherID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        AccountID:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        FullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Introduction: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)

module.exports = Teachers;
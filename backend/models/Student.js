const {DataTypes} = require("sequelize");

const sequelize = require("../sequelize.js");

const Students = sequelize.define(
    "Students",
    {
        StudentID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        AccountID:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        FullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "Students",
        timestamps: false,
    }
)

module.exports = Students;
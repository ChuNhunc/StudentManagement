const { DataTypes } = require("sequelize");
const Student = require("./Student.js");
const Status = require("./Status.js");

const sequelize = require("../sequelize.js");

const Application = sequelize.define(
  "Application",
  {
    ApplicationID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    StudentID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClassID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StatusID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ApplicationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ModifiedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    Remarks: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  },
  {
    tableName: "Application",
    createdAt: "ApplicationDate",
    updatedAt: "ModifiedDate",
  }
);

Application.belongsTo(Student, { foreignKey: "StudentID" });
Application.belongsTo(Status, {
  foreignKey: "StatusID", 
  targetKey: "StatusID", 
});

Application.beforeCreate((application) => {
    if (!application.ModifiedDate) {
      application.ModifiedDate = application.ApplicationDate;
    }
  });

module.exports = Application;
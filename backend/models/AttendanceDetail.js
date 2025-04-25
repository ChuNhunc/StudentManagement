const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");
const Attendance = require("./Attendance.js");
const Status = require("./Status.js");

const AttendanceDetail = sequelize.define("AttendanceDetail", {
  AttendanceDetailID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  AttendanceID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  LessonID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StatusID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  AttendanceDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

AttendanceDetail.belongsTo(Attendance, { foreignKey: "AttendanceID" });

AttendanceDetail.belongsTo(Status, {
  foreignKey: "StatusID", // Khóa ngoại trong AttendanceDetails
  targetKey: "StatusID", // Khóa chính trong Status
});

module.exports = AttendanceDetail;


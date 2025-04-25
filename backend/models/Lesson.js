const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");
const Courses = require("./Course.js");

const Lesson = sequelize.define(
  "Lesson",
  {
    LessonID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Serial_Num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CourseID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SkillID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Lesson.belongsTo(Courses, { foreignKey: "CourseID" });
Courses.hasMany(Lesson, { foreignKey: "CourseID" });

module.exports = Lesson;

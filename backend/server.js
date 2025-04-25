const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./sequelize.js");
const authRoutes = require("./routes/authRoute.js");
const classRoutes = require("./routes/classRoute.js");
const courseRoutes = require("./routes/courseRoute.js");
const attendanceRoutes = require("./routes/attendanceRoute.js");
const studentRoutes = require("./routes/studentRoute.js");
const scheduleRoutes = require("./routes/scheduleRoute.js");
const lessonRoutes = require("./routes/lessonRoute.js");
const teacherRoutes = require("./routes/teacherRoute.js");
const attendanceDetailRoutes = require("./routes/attendanceDetailRoute.js");
const accountRoutes = require("./routes/accountRoute.js");
const applicationRoutes = require("./routes/applicationRoute.js");
const statusRoutes = require("./routes/statusRoute.js");

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error.message);
    console.log("Error");
  });

app.use("/auth", authRoutes);
app.use("/class", classRoutes);
app.use("/course", courseRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/student", studentRoutes);
app.use("/schedule", scheduleRoutes);
app.use("/lesson", lessonRoutes);
app.use("/teacher", teacherRoutes);
app.use("/attendanceDetail", attendanceDetailRoutes);
app.use("/account", accountRoutes);
app.use("/application", applicationRoutes);
app.use("/status", statusRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});

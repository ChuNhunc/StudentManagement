const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize.js");
const authRoutes = require("./routes/authRoute.js");

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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

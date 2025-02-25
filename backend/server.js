const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const {connect} = require("./db.js");

const app = express();
app.use(cors());

connect()
  .then((connection) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database", error.message);
    console.log("Error");
  });

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

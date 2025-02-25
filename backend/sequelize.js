const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("EnglishCenterDB", "nhung", "123456", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;

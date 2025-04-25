const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("EnglishCenterDB", "nhung", "123456", {
  host: "localhost",
  dialect: "mssql",
  timezone: "+07:00",
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
});

module.exports = sequelize;

const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");

const Account = sequelize.define(
  "Accounts",
  {
    AccountID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Tên người dùng bắt buộc phải nhập",
        },
        len: {
          args: [6, 20],
          msg: "Tên người dùng phải có từ 6 đến 20 ký tự",
        },
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Mật khẩu bắt buộc phải nhập",
        },
      },
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // CreatedAt: {
    //   type: DataTypes.DATE,
    // },
  },
  {
    timestamps: false,
  }
);

// Account.beforeCreate(async (account) => {
//   const salt = await bcrypt.genSalt(10);
//   account.Password = await bcrypt.hash(account.Password, salt);
// });

module.exports = Account;

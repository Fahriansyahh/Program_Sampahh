// //! setup sequelize
const { DataTypes } = require("sequelize");
const database = require("../config/database");

const User = database.define(
  "users",
  {
    username: {
      type: DataTypes.STRING(30), // Sesuaikan dengan panjang VARCHAR di basis data
      allowNull: false, // Jika tidak boleh kosong
    },
    password: {
      type: DataTypes.STRING(70), // Sesuaikan dengan panjang VARCHAR di basis data
    },
  },
  {
    timestamps: false,
  }
);
User.removeAttribute("id");

module.exports = User;

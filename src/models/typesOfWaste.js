const { DataTypes } = require("sequelize");
const database = require("../config/database");

const typesOfWaste = database.define(
  "typesofwastes",
  {
    garbagetypename: {
      type: DataTypes.STRING(50), // Sesuaikan panjang VARCHAR sesuai kebutuhan
      allowNull: false, // Jangan boleh kosong
    },
    description: {
      type: DataTypes.TEXT(200), // Tipe data TEXT untuk deskripsi yang lebih panjang
    },
    pricekilogramme: {
      type: DataTypes.INTEGER, // Tipe data FLOAT untuk harga per kilogram
      allowNull: false, // Jangan boleh kosong
    },
  },
  {
    timestamps: false,
  }
);
typesOfWaste.removeAttribute("id");

module.exports = typesOfWaste;

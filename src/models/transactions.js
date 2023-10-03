const { DataTypes } = require("sequelize");
const database = require("../config/database");

const transactions = database.define(
  "transactions",
  {
    user: {
      type: DataTypes.STRING(30), // Sesuaikan panjang VARCHAR sesuai kebutuhan
      allowNull: false, // Jangan boleh kosong
    },
    trashtypeid: {
      type: DataTypes.STRING(45), // Tipe data TEXT untuk deskripsi yang lebih panjang
    },
    numberkilograms: {
      type: DataTypes.INTEGER, // Tipe data FLOAT untuk harga per kilogram
      allowNull: false, // Jangan boleh kosong
    },
    totalprice: {
      type: DataTypes.INTEGER, // Tipe data FLOAT untuk harga per kilogram
      allowNull: false, // Jangan boleh kosong
    },
    transactiondate: {
      type: DataTypes.DATE, // Tipe data FLOAT untuk harga per kilogram
      allowNull: false, // Jangan boleh kosong
    },
  },
  {
    timestamps: false,
  }
);
transactions.removeAttribute("id");

module.exports = transactions;

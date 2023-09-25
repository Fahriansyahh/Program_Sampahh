// //!setup sequlize
const { Sequelize } = require("sequelize");
const database = new Sequelize("express_sql", "root", "fahriansyah09", {
  dialect: "mysql",
  host: "localhost",
  logging: false, // Perhatikan penulisan host yang sebelumnya salah
});

module.exports = database;

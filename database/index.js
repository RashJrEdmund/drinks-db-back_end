const Sequelize = require("sequelize");

const sequelize = new Sequelize("drinks_database", "root", undefined, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
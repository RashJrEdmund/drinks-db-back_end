const Sequelize = require("sequelize");

const sequelize = new Sequelize("drinis_database", "root", undefine, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
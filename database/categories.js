const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Category = sequelize.define(
  "category", // sequelize actually pluralizes these names
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
  },

  {
    timestamp: true,
    paranoid: true, // this is so that whenever something is deleted, it should just mark as deleted
  }
);

module.exports = Category;

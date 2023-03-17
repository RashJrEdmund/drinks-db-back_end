const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Drink = sequelize.define(
  "drink", // sequelize actually pluralizes these names
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
    decription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe: {
      type: DataTypes.STRING,
    },
    is_alcoholic: DataTypes.BOOLEAN,
  },
  {
    timestamp: true,
    paranoid: true, // this is so that whenever something is deleted, it should just mark as deleted
  }
);

module.exports = Drink;

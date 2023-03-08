const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Drink = sequelize.define(
  'drink',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primarykey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    decription: DataTypes.STRING,
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
    },
    glass_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    is_alcoholic: DataTypes.BOOLEAN,
  },
  {
    timestamp: true,
    paranoid: true,
  }
);

module.exports = Drink
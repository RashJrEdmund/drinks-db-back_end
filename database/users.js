const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define(
  "user", // sequelize actually pluralizes these names
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    apikey: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    is_admin: DataTypes.BOOLEAN,
  },
  {
    timestamp: true,
    paranoid: true, // this is so that whenever something is deleted, it should just mark as deleted
  }
);

module.exports = User;
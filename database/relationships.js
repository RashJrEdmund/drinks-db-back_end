const sequelize = require(".");
const Category = require("./categories");
const Drink = require("./drinks");
const Glass = require("./glasses");
const Ingredient = require("./ingredients");
const User = require("./users");

function relate() {
  sequelize.sync();

  User.hasMany(Drink);
  Drink.belongsTo(User);

  Drink.belongsToMany(Category, { through: "drinks_categories" });
  Category.belongsToMany(Drink, { through: "drinks_categories" });

  Drink.belongsToMany(Ingredient, { through: "drinks_ingredients" });
  Ingredient.belongsToMany(Drink, { through: "drinks_ingredients" });

  Drink.belongsToMany(Glass, {through: "drinks_glasses" });
  Glass.belongsToMany(Drink, {through: "drinks_glasses" });

  sequelize.sync();
}

module.exports = relate;
const express = require('express');
const router = express.Router();

const Drink = require('../database/drinks');
const Category = require('../database/categories');
const Ingredient = require('../database/ingredients');
const Glass = require('../database/glasses');

const getAllDrinks = async () => {
  const allDrinks = await Drink.findAll();
  allDrinks.forEach(drink => {
    drink.recipe = drink.recipe.split('_/-/_');
  })

  return allDrinks;
}

const getAllCategories = async (req, res, next) => {
  const allCategorys = await Category.findAll();
  return allCategorys;
}

const getAllIngredients = async (req, res, next) => {
  const allIngredientes = await Ingredient.findAll();
  return allIngredientes;
};

const getAllGlasses = async (req, res, next) => {
  const allGlasses = await Glass.findAll();
  return allGlasses;
}

router.get('/', (req, res) => {
  const drinks = getAllDrinks();
  const categories = getAllCategories();
  const ingredients = getAllIngredients();
  const glasses = getAllGlasses();

  res.send([...drinks, ...categories, ...ingredients, ...glasses])
});

module.exports = router;
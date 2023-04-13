const express = require('express');
const router = express.Router();

const Drink = require('../database/drinks');
const Category = require('../database/categories');
const Ingredient = require('../database/ingredients');
const Glass = require('../database/glasses');

const getAllDrinks = async () => {
  console.log('\n get all drinks entered \n');

  const allDrinks = await Drink.findAll();
  allDrinks.forEach(drink => {
    drink.recipe = drink.recipe.split('_/-/_');
  })

  return allDrinks;
}

router.get('/', async (req, res) => {
  const Drinks = await getAllDrinks();
  const Categories = await Category.findAll();
  const Ingredients = await Ingredient.findAll();
  const Glasses =  await Glass.findAll();

  res.send({Drinks, Categories, Ingredients, Glasses})
});

module.exports = router;
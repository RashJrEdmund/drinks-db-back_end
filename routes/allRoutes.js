/**
 * @swagger
 * components:
 *   schemas:
 *     All:
 *       type: object
 *       properties:
 *         Drinks:
 *           type: object
 *           description: all drinks in the database
 *         Categories:
 *           type: object
 *           description: all categories in the database
 *         Ingredients:
 *           type: object
 *           description: all ingredients in the database
 *         Glasses:
 *           type: object
 *           description: all glasses in the database
 */

/**
 * @swagger
 * tags:
 *   name: All
 *   description: all drinks, categories, ingredients and glasses from the API
 * /all:
 *   get:
 *     summary: Lists all drinks, categories, ingredients and glasses from the API
 *     tags: [all]
 *     responses:
 *       200:
 *         description: The list of all drinks, categories, ingredients and glasses from the API
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *             $ref: '#/components/schemas/all'
 */


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

router.get('/', async (req, res) => {
  const Drinks = await getAllDrinks();
  const Categories = await Category.findAll();
  const Ingredients = await Ingredient.findAll();
  const Glasses =  await Glass.findAll();

  res.send({Drinks, Categories, Ingredients, Glasses})
});

module.exports = router;
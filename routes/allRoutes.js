const express = require('express');
const router = express.Router();

const Users = require('../database/users');
const Drinks = require('../database/drinks');
const Ingredients = require('../database/ingredients');
const Glasses = require('../database/glasses');
const Categories = require('../database/categories');

router.get('/', async (req, res) => {
  const allUsers = await Users.findAll();
  const allDrinks = await Drinks.findAll();
  const allIngredients = await Ingredients.findAll();
  const allGlasses = await Glasses.findAll();
  const allCategories = await Categories.findAll();
  const text = [{test1: 'test1', test2: 'test2', test3: 'test3'}]

  const ALL = [
    ...allUsers,
    ...allDrinks,
    ...allIngredients,
    ...allGlasses,
    ...allCategories,
    ...text
  ]

  res.send(ALL)
});

router.post('/', async (req, res) => {
  res.status(412).send('{ cannot upload all at once }')
});

router.put('/', async (req, res) => {
  res.status(412).send('{ cannot update all at once }')
});

router.patch('/', async (req, res) => {
  res.status(412).send('{ cannot update all at once }')
});

router.delete('/', async (req, res) => {
  res.status(412).send('{ cannot delete all data at once }')
});

module.exports = router;
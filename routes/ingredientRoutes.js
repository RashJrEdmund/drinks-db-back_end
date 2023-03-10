const express = require('express');
const router = express.Router();
const Ingredient = require("../database/ingredients")

/* GET Ingredient listing. */
router.get('/', async function(req, res, next) {
  const allIngredientes = await Ingredient.findAll();
  res.send(allIngredientes);
});

// continue from here

router.post('/', async function(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.send('{ Missing Ingredient Info }');
    return;
  }

  const newIngredient = await Ingredient.create({ name, description });

  res.send(newIngredient);
});

router.get('/:id', async function(req, res, next) {
  const [ingredient] = await Ingredient.findAll({ // this to make sure the ingredient exits
    where: {
      id: +req.params.id
    }
  });

  if(!ingredient) {
    res.send(`IngredientID ${req.params.id} does not Exits`);
    return;
  }

  res.send(ingredient);
});

router.put('/:id', async function(req, res, next) {
  const [ingredient] = await Ingredient.findAll({ // this to make sure the ingredient exits
    where: {
      id: +req.params.id
    }
  });

  if(!ingredient) {
    res.send(`IngredientID ${req.params.id} does not Exits`);
    return;
  }

  await Ingredient.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenIngredient = await Ingredient.findAll({where: { id: req.params.id}})
  res.send(overWrittenIngredient)
});

router.patch('/:id', async function(req, res, next) {
  const [ingredient] = await Ingredient.findAll({ // this to make sure the ingredient exits
    where: {
      id: +req.params.id
    }
  });

  if(!ingredient) {
    res.send(`IngredientID ${req.params.id} does not Exits`);
    return;
  }

 await Ingredient.update(req.body, { where: { id: req.params.id}})
 updatedIngredient = await Ingredient.findAll( { where: { id: req.params.id } })
  res.send(updatedIngredient);
});

router.delete('/:id', async function(req, res, next) {
  await Ingredient.destroy({
    where: { id: +req.params.id }
  });
  res.send(`IngredientId ${req.params.id} dropped!`);
});

module.exports = router;
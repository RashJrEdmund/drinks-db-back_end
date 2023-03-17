const express = require('express');
const router = express.Router();
const Drink = require("../database/drinks")

/* GET drinks listing. */
router.get('/', async function(req, res, next) {
  const allDrinks = await Drink.findAll();
  res.send(allDrinks);
});

// continue from here

router.post('/', async function(req, res, next) {
  const{
    name,
    description,
    image_url,
    recipe,
    is_alcoholic,
  } = req.body;

  console.log('this req.body', req.body);

  if (!name || !description || !image_url || !recipe || !is_alcoholic ) {
    res.send('{ Missing Drink Info }');
    return;
  }

  const newDrink = await Drink.create({
    name,
    description,
    image_url,
    recipe,
    is_alcoholic,
  });

  res.send(newDrink);
});

router.get('/:id', async function(req, res, next) {
  const [drink] = await Drink.findAll({ // this to make sure the drink exits
    where: {
      id: +req.params.id
    }
  });
  if(!drink) {
    res.send(`DrinkID ${req.params.id} does not Exits`);
    return;
  }

  res.send(drink);
});

router.put('/:id', async function(req, res, next) {
  const [drink] = await Drink.findAll({ // this is to make sure that the drink even exits
    where: {
      id: +req.params.id
    }
  });
  if(!drink) {
    res.send(`DrinkID ${req.params.id} does not Exits`);
    return;
  }

  await Drink.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenDrink = await Drink.findAll({where: { id: req.params.id}})
  res.send(overWrittenDrink)
});

router.patch('/:id', async function(req, res, next) {
  const [drink] = await Drink.findAll({ // this is to make sure that the drink even exits
    where: {
      id: +req.params.id
    }
  });
  if(!drink) {
    res.send(`DrinkID ${req.params.id} does not Exits`);
    return;
  }

 await Drink.update(req.body, { where: { id: req.params.id}})
 updatedDrink = await Drink.findAll( { where: { id: req.params.id } })
  res.send(updatedDrink);
});

router.delete('/:id', async function(req, res, next) {
  await Drink.destroy({
    where: { id: +req.params.id }
  });
  res.send(`DrinkId ${req.params.id} dropped!`);
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Drink:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - image_url
 *       properties:
 *         id:
 *           type: interger
 *           description: The auto-generated id of the drink
 *         name:
 *           type: string
 *           description: The name of the drink
 *         description:
 *           type: string
 *           description: The drink's description
 *         image_url:
 *           type: string
 *           description: A link for the drink's image
 *         recipe:
 *           type: string
 *           description: The drink's recipe
 *         is_alcoholic:
 *           type: boolean
 *           description: whether or not the drink is alcoholic
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the drink was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the drink was modified
 *       example:
 *         id: 1
 *         name: name of the drink
 *         description: describe the drink
 *         image_url: link for an image of the drink
 *         recipe: the drinks recipe
 *         is_alcoholic: true
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Drink
 *   description: The Drink From the API
 * /drinks:
 *   get:
 *     summary: Lists all the drinks
 *     tags: [Drinks]
 *     responses:
 *       200:
 *         description: The list of the drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *             $ref: '#/components/schemas/Drink'
 *   post:
 *     summary: Create a new drink
 *     tags: [Drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Drink'
 *     responses:
 *       200:
 *         description: The created drink.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Drink'
 *       500:
 *         description: Some server error
 * /drinks/{id}:
 *   get:
 *     summary: Get the drink by id
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The drink id
 *     responses:
 *       200:
 *         description: The drink response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Drink'
 *       404:
 *         description: The drink was not found
 *   put:
 *    summary: Update the drink by the id
 *    tags: [Drinks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The drink id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Drink'
 *    responses:
 *      200:
 *        description: The drink was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Drink'
 *      404:
 *        description: The drink was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the drink by id
 *     tags: [Drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The drink id
 *
 *     responses:
 *       200:
 *         description: The drink was deleted
 *       404:
 *         description: The drink was not found
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - password
 *         - email
 *       properties:
 *         id:
 *           type: interger
 *           description: The auto-generated id of the user
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         password:
 *           type: string
 *           description: The user password
 *         email:
 *           type: string
 *           description: The user email
 *         apikey:
 *           type: string
 *           description: The user's api key
 *         phone:
 *           type: string
 *           description: The user phone number
 *         is_admin:
 *           type: boolean
 *           description: User priorities
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was modified
 *       example:
 *         id: 1
 *         first_name: first name
 *         last_name: last name
 *         password: 1234
 *         email: user@emai.com
 *         phone: + 212 232
 *         is_admin: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing API
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *             $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
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

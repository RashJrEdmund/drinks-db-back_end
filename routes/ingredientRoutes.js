/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: interger
 *           description: The auto-generated id of the ingredient
 *         name:
 *           type: string
 *           description: The name of the ingredient
 *         description:
 *           type: string
 *           description: The ingredient's description
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the ingredient was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the ingredient was modified
 *       example:
 *         id: 1
 *         name: name of the ingredient
 *         description: describe the ingredient
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Ingredient
 *   description: The Ingredient From the API
 * /ingredients:
 *   get:
 *     summary: Lists all the ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: The list of the ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *             $ref: '#/components/schemas/Ingredient'
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: The created ingredient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Some server error
 * /ingredients/{id}:
 *   get:
 *     summary: Get the ingredient by id
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *     responses:
 *       200:
 *         description: The ingredient response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: The ingredient was not found
 *   put:
 *    summary: Update the ingredient by the id
 *    tags: [Ingredients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ingredient id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Ingredient'
 *    responses:
 *      200:
 *        description: The ingredient was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ingredient'
 *      404:
 *        description: The ingredient was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the ingredient by id
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *
 *     responses:
 *       200:
 *         description: The ingredient was deleted
 *       404:
 *         description: The ingredient was not found
 */

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
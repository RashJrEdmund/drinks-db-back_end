/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: interger
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: The category's description
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the category was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the category was modified
 *       example:
 *         id: 1
 *         name: name of the category
 *         description: describe the category
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The Category From the API
 * /categories:
 *   get:
 *     summary: Lists all the categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *             $ref: '#/components/schemas/Category'
 *   post:
 *     summary: Create a new Category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The created Category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 * /categories/{id}:
 *   get:
 *     summary: Get the Category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Category id
 *     responses:
 *       200:
 *         description: The Category response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The Category was not found
 *   put:
 *    summary: Update the Category by the id
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: The Category was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      404:
 *        description: The Category was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Category by id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Category id
 *
 *     responses:
 *       200:
 *         description: The Category was deleted
 *       404:
 *         description: The Category was not found
 */


const express = require('express');
const router = express.Router();
const Category = require("../database/categories")

/* GET Categorys listing. */
router.get('/', async function(req, res, next) {
  const allCategorys = await Category.findAll();
  res.send(allCategorys);
});

// continue from here

router.post('/', async function(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    res.send('{ Missing Category Info }');
    return;
  }

  const newCategory = await Category.create({ name, description });

  res.send(newCategory);
});

router.get('/:id', async function(req, res, next) {
  const [category] = await Category.findAll({ // this to check if the category even exits
    where: {
      id: +req.params.id
    }
  });
  if(!category) {
    res.send(`CategoryID ${req.params.id} does not Exits`);
    return;
  }

  res.send(category);
});

router.put('/:id', async function(req, res, next) {
  const [category] = await Category.findAll({ // this to check if the category even exits
    where: {
      id: +req.params.id
    }
  });
  if(!category) {
    res.send(`CategoryID ${req.params.id} does not Exits`);
    return;
  }

  await Category.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenCategory = await Category.findAll({where: { id: req.params.id}})
  res.send(overWrittenCategory)
});

router.patch('/:id', async function(req, res, next) {
  const [category] = await Category.findAll({ // this to check if the category even exits
    where: {
      id: +req.params.id
    }
  });
  if(!category) {
    res.send(`CategoryID ${req.params.id} does not Exits`);
    return;
  }

 await Category.update(req.body, { where: { id: req.params.id}})
 updatedCategory = await Category.findAll( { where: { id: req.params.id } })
  res.send(updatedCategory);
});

router.delete('/:id', async function(req, res, next) {
  await Category.destroy({
    where: { id: +req.params.id }
  });
  res.send(`CategoryId ${req.params.id} dropped!`);
});

module.exports = router;
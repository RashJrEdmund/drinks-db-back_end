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
const CategoriesController = require('../Controllers/CategoriesController');
const { authApiKey, authMiddleware, authAdmin } = require('../services/auth');

/* GET Categorys listing. */
router.get('/', authApiKey, CategoriesController.getAllCategories);

router.post('/', authMiddleware, authAdmin, CategoriesController.createOneCategory);

router.get('/:id', authApiKey, authAdmin, CategoriesController.getOneCategory);

router.put('/:id', authMiddleware, authAdmin, CategoriesController.putOneCategory);

router.patch('/:id', authMiddleware, authAdmin, CategoriesController.patchOneCategory);

router.delete('/:id', authMiddleware, authAdmin, CategoriesController.deleteOneCategory);

module.exports = router;

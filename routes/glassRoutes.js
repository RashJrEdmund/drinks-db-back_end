/**
 * @swagger
 * components:
 *   schemas:
 *     Glass:
 *       type: object
 *       required:
 *         - name
 *         - size
 *       properties:
 *         id:
 *           type: interger
 *           description: The auto-generated id of the glass
 *         name:
 *           type: string
 *           description: The name of the glass
 *         size:
 *           type: string
 *           description: The glass' description
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the glass was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the glass was modified
 *       example:
 *         id: 1
 *         name: name of the glass
 *         size: specify the size of the glass
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Glass
 *   description: The Glass From the API
 * /glasses:
 *   get:
 *     summary: Lists all the glasses
 *     tags: [Glasses]
 *     responses:
 *       200:
 *         description: The list of the glasses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *             $ref: '#/components/schemas/Glass'
 *   post:
 *     summary: Create a new Glass
 *     tags: [Glasses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Glass'
 *     responses:
 *       200:
 *         description: The created Glass.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Glass'
 *       500:
 *         description: Some server error
 * /glasses/{id}:
 *   get:
 *     summary: Get the Glass by id
 *     tags: [Glasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Glass id
 *     responses:
 *       200:
 *         description: The Glass response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Glass'
 *       404:
 *         description: The Glass was not found
 *   put:
 *    summary: Update the Glass by the id
 *    tags: [Glasses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Glass id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Glass'
 *    responses:
 *      200:
 *        description: The Glass was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Glass'
 *      404:
 *        description: The Glass was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Glass by id
 *     tags: [Glasses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Glass id
 *
 *     responses:
 *       200:
 *         description: The Glass was deleted
 *       404:
 *         description: The Glass was not found
 */

const express = require('express');
const router = express.Router();
const GlassController = require('../Controllers/GlassController');

/* GET Glass listing. */
router.get('/', GlassController.getAllGlasses);

router.post('/', GlassController.createOneGlass);

router.get('/:id', GlassController.getOneGlass);

router.put('/:id', GlassController.putOneGlass);

router.patch('/:id', GlassController.patchOneGlass);

router.delete('/:id', GlassController.deleteOneGlass);

module.exports = router;

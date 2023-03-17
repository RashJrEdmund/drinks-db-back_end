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
const User = require("../database/users");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allUsers = await User.findAll();
  res.send(allUsers);
});

router.post('/', async function(req, res, next) {
  const{first_name, last_name, email, phone, password} = req.body;
  if (!first_name || !last_name || !email || !phone || !password) {
    res.send('{ Missing User Info }');
    return;
  }

  bcrypt.hash(password, +process.env.SALT_ROUNDS, async (err, hash) => {
    if(err) {
      res.status(500).send(err);
    } else {
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        phone,
        password: hash,
        api_key: Date.now(),
        is_admin: false,
      });
      res.send(newUser);
    }
  })

  // const newUser = await User.create({
  //   first_name,
  //   last_name,
  //   email,
  //   phone,
  //   password,
  //   api_key: Date.now(),
  //   is_admin: false,
  // });

  // res.send(newUser);
});

router.get('/:id', async function(req, res, next) {
  const [user] = await User.findAll({ // this to make sure the user exits
    where: {
      id: +req.params.id
    }
  });
  if(!user) {
    res.send(`userID ${req.params.id} does not Exits`);
    return;
  }

  res.send(user);
});

router.put('/:id', async function(req, res, next) {
  const [user] = await User.findAll({ // this to make sure the user exits
    where: {
      id: +req.params.id
    }
  });

  if(!user) {
    res.send(`userID ${req.params.id} does not Exits`);
    return;
  }

  await User.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenUser = await User.findAll({where: { id: req.params.id}})
  res.send(overWrittenUser)
});

router.patch('/:id', async function(req, res, next) {
  const [user] = await User.findAll({ // this to make sure the user exits
    where: {
      id: +req.params.id
    }
  });
  if(!user) {
    res.send(`userID ${req.params.id} does not Exits`);
    return;
  }

 await User.update(req.body, { where: { id: req.params.id}})
 updatedUser = await User.findAll( { where: { id: req.params.id } })
  res.send(updatedUser);
});

router.delete('/:id', async function(req, res, next) {
  await User.destroy({
    where: { id: +req.params.id }
  });
  res.send(`UserId ${req.params.id} dropped!`);
});

module.exports = router;

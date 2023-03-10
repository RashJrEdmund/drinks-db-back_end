const express = require('express');
const router = express.Router();
const User = require("../database/users")

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

  const newUser = await User.create({
    first_name,
    last_name,
    email,
    phone,
    password,
    api_key: Date.now(),
    is_admin: false,
  });

  res.send(newUser);
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

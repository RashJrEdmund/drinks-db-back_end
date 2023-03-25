const User = require("../database/users");
const bcrypt = require("bcrypt");
const uuid = require('uuid');

const getAllUsers = async (req, res, next) => {
  const allUsers = await User.findAll();
  res.send(allUsers);
}

const createOneUser = async (req, res, next) => {
  const{first_name, last_name, email, phone, password} = req.body;
  if (!first_name || !last_name || !email || !phone || !password) {
    res.send('{ Missing User Info }');
    return;
  }

  const duplicateUser = await User.findOne({
    where: {
      email: email,
    }
  });

  if(duplicateUser) return res.status(401).send(`user_email: ${email} already exist`);

  bcrypt.hash(password, +process.env.SALT_ROUNDS, async (err, hash) => {
    if(err) return res.status(500).send(err);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone,
      password: hash,
      apikey: uuid.v4(),
      is_admin: false,
    });
    res.send(newUser);
  });
}

const getOneUser = async (req, res, next) => {
  const [user] = await User.findAll({ // this to make sure the user exits
    where: {
      id: +req.params.id
    }
  });
  if(!user) {
    res.send(`userID ${req.params.id} does not Exits`);
    return;
  }

  delete user.password;
  delete user.apikey;

  res.send(user);
}

const putOneUser = async (req, res, next) => {
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
}

const patchOneUser = async (req, res, next) => {
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
}

const deleteOneUser = async (req, res, next) => {
  await User.destroy({
    where: { id: +req.params.id }
  });
  res.send(`UserId ${req.params.id} dropped!`);
}

module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  putOneUser,
  patchOneUser,
  deleteOneUser
}

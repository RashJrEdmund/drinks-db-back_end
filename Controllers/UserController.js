const User = require("../database/users");
const bcrypt = require("bcrypt");

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

const User = require('../database/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_PRIVATE_KEY } = require('../services/constant');

const loginWithEmailPassword = async (email, password) => {
  let user = await User.findOne({
    where: {
      email: email
    }
  });

  if(!user) return { status: 401, message: 'incorrect logins' };

  user = user.dataValues || user; // since users gives a complex object(proxy) with unneccesary key value pairs

  const match = await bcrypt.compare(password, user.password);

  if(!match) return { status: 401, message: 'incorrect logins' };

  const token = jwt.sign(
    { barer_id: user.id, barer_email: user.email }, // giving the token barer his normal id, and email as barer_id / barer_email so i'll use it as reference when i want to log in with token
    JWT_PRIVATE_KEY,
    { expiresIn: 30 }
  );

  return { user, token }
}

// loginWithEmailPassword('godden@gmail.com', '1234').then((res) => console.log(res));

module.exports = {
  loginWithEmailPassword
}

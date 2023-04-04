const User = require('../database/users');
const bcrypt = require('bcrypt');

const { signToken } = require('./jwt');

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

  const token = signToken(user)

  return { user, token }
}

// loginWithEmailPassword('rash@gmail.com', '1234').then((res) => console.log(res));

module.exports = {
  loginWithEmailPassword
}

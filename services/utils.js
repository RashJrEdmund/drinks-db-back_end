const User = require('../database/users');

const loginWithEmailPassword = async (email, password) => {
  let user = await User.findOne({
    where: {
      email: email
    }
  });

  if(!user) return { status: 401 };

  user = user.dataValues || user; // since users gives a complex object(proxy) with unneccesary key value pairs

  const match = await bcrypt.compare(password, user.password);

  if(!match) return { status: 401 };

  const token = jwt.sign(
    { barer_id: user.id, barer_email: user.email }, // giving the token barer his normal id, and email as barer_id / barer_email so i'll use it as reference when i want to log in with token
    JWT_PRIVATE_KEY,
    { expiresIn: '1h' }
  );

  return { user, token }
}

module.exports = {
  loginWithEmailPassword
}
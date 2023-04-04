const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("./constant");

const  signToken = (user) => {
  return jwt.sign(
    { bearer_id: user.id, bearer_email: user.email }, // giving the token bearer his normal id, and email as bearer_id / bearer_email so i'll use it as reference when i want to log in with token
    JWT_PRIVATE_KEY,
    { expiresIn: '1h' }
  );
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_PRIVATE_KEY);
}

module.exports = { signToken, verifyToken };

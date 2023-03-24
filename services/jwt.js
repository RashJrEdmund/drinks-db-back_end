const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("./constant");

function signToken(data) {
  return jwt.sign(
    { data },
    JWT_PRIVATE_KEY,
    { expiresIn: '1h' }
  )
}

function verifyToken(token) {
    return jwt.verify(token, JWT_PRIVATE_KEY);
}

module.exports = { signToken, verifyToken };

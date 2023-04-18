const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../services/auth');

const {
  loginWithEmailPassword
} = require('../services/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express App' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await loginWithEmailPassword(email, password); // getting an err and it shows that password must be a string

  if(result.status === 401) return res.status(401).send(result.message); // since loginWith... returns either a { status: 401 } || the user and the created user and his token

  let { user } = result
  delete user.password;
  delete user.deletedAt
  delete user.updatedAt
  delete result.user;
  res.send(result);
  // this way the user's password and apikey are not sent to the fontend
});

router.get('/current-user', authMiddleware, (req, res) => {
  let { user } = req
  delete user.password;
  delete user.deletedAt
  delete user.updatedAt
  res.send(user)
})

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require("../database/users");
const { JWT_PRIVATE_KEY } = require('../services/constant');

const {
  loginWithEmailPassword
} = require('../services/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await loginWithEmailPassword(email, password);

  if(result.status === 401) res.sendStatus(401); // since loginWith... returns either a { status: 401 } || the user and the created user and his token

  res.send(result);
});

module.exports = router;

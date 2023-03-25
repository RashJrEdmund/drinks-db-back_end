const express = require('express');
const router = express.Router();

const {
  loginWithEmailPassword
} = require('../services/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express App' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('\n\n this email and password', email, password, '\n \n');
  const result = await loginWithEmailPassword(email, password); // getting an err and it shows that password must be a string

  console.log('\n next part entered \n', result, email, password);

  if(result.status === 401) res.sendStatus(401); // since loginWith... returns either a { status: 401 } || the user and the created user and his token

  res.send(result);
});

module.exports = router;

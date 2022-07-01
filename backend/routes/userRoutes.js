var userModel = require('../models/user.js');

const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await user.find({}, { _id: 1, email: 1 });
  return res.json(users);
});

router.post('/register', (req, res, next) => {
  var obj = {
    givenName: req.given_name,
    familyName: req.family_name,
    email: req.email,
    sub: req.sub,
  };

  console.log(req.body);
  console.log(obj);

  userModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.json({ message: 'lo que sea' });
    }
  });
});

//get user by email
router.get('/:userEmail', async (req, res) => {
  var email = req.param('userEmail');
  const user = await userModel.find({ email: email });
  return res.json(user);
});

module.exports = router;

var userAssetModel = require('../models/userAsset.js');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

router.post('/upload', upload.single('asset'), (req, res, next) => {
  //en caso no funque, checkear how to upload with multer
  var obj = {
    url: '/uploads/' + req.file.filename,
    title: req.body.title,
    category: req.body.category,
    userId: req.body.userId,
  };

  console.log(req.body);
  console.log(obj);
  userAssetModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.json({ message: 'lo que sea' });
    }
  });
});

router.get('/', async (req, res) => {
  const images = await userAssetModel.find(
    {},
    { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
  );
  return res.json(images);
});

router.get('/api/images/:id', async (req, res) => {
  const image = await userAssetModel.find('_id', req.params.id);
  return res.json(image);
});

router.delete('/api/images/:id', async (req, res) => {});

module.exports = router;

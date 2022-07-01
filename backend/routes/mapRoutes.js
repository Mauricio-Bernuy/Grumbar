var mapModel = require('../models/map.js');

const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var path = require('path');

var contentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(path, { recursive: true });
    cb(null, 'files/maps/contents');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var previewStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(path, { recursive: true });
    cb(null, 'files/maps/previews');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var contentUpload = multer({ storage: contentStorage });
var previewUpload = multer({ storage: previewStorage });

//maps
router.get('/', async (req, res) => {
  const maps = await mapModel.find({}, { tittle: 1, _id: 1 });
  return res.json(maps);
});

router.post('/create', (req, res, next) => {
  var obj = {
    url: req.body.url,
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
  };

  console.log(obj);

  userModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      res.json({ message: 'Upload Failed' });
    } else {
      // item.save();
      res.json({ message: 'Upload Success' });
      console.log('Asset upload success');
    }
  });
});

router.post(
  '/save',
  contentUpload.single('content'),
  previewUpload.single('preview'),
  (req, res, next) => {
    console.log(obj);

    mapModel.updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
  }
);

//find all maps from an especific user
router.get('/user/:mongoId', async (req, res) => {
  var id = req.param('mongoId');
  const userMaps = await mapModel.find({ userId: id });
  return res.json(userMaps);
});

//find map with id
router.get('/:mongoId', async (req, res) => {
  var id = req.param('mongoId');
  const map = await mapModel.find({ _id: id });
  return res.json(map);
});

module.exports = router;

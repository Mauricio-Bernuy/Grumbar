var userAssetModel = require('../models/userAsset.js');
var assetModel = require('../models/asset.js');

const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(path, { recursive: true });
    cb(null, 'assets');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

//default assets
router.get('/', async (req, res) => {
  const assets = await assetModel.find(
    {},
    { url: 1, title: 1, category: 1, userid: 1, _id: 1 }
  );
  return res.json(assets);
});

//assets from users
router.get('/user', async (req, res) => {
  const assets = await userAssetModel.find(
    {},
    { url: 1, title: 1, category: 1, userid: 1, _id: 1 }
  );
  return res.json(assets);
});

router.post('/dev/upload', upload.single('asset'), (req, res, next) => {
  var obj = {
    url: '/assets/' + req.file.filename,
    title: req.body.title,
    category: req.body.category,
  };

  console.log(obj);
  userAssetModel.create(obj, (err, item) => {
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

router.post('/user/upload', upload.single('asset'), (req, res, next) => {
  var obj = {
    url: '/assets/' + req.file.filename,
    //url: req.protocol + '://' + req.get('host') + '/api/assets/' + req.file.filename,
    title: req.body.title,
    category: req.body.category,
    userId: req.body.userId,
  };

  // console.log(req.body);
  console.log(obj);
  userAssetModel.create(obj, (err, item) => {
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

router.get('/clear', async (req, res) => {
  await userAssetModel.deleteMany({});
  await assetModel.deleteMany({});

  const path = 'uploads';
  fs.rmdirSync(path, { recursive: true });

  console.log('xd');
  return res.json('DONE!');
});

// for userID
router.post('/personal', upload.single(''), async (req, res, next) => {
  const userId = req.body.userId;
  console.log(userId);
  const images = await userAssetModel.find(
    { userId: userId },
    { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
  );
  return res.json(images);
});

//find asset with id
router.get('/:mongoId', async (req, res) => {
  var id = req.param('mongoId');
  const asset = await assetModel.find({ _id: id });
  return res.json(asset);
});

//find all assets from an especific user
router.get('user/:mongoId', async (req, res) => {
  var id = req.param('mongoId');
  const userAssets = await userAssetModel.find({ userId: id });
  return res.json(userAsset);
});

//router.delete('/:id', async (req, res) => {});

module.exports = router;

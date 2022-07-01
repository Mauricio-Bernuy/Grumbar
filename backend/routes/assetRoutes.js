var userAssetModel = require('../models/userAsset.js');
var assetModel = require('../models/asset.js');

const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var path = require('path');
const assetFolder = "files/assets";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = assetFolder;
    // fs.mkdirSync("files/", { recursive: true });
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

// * UPLOAD ASSETS
// User uploading
router.post('/upload', upload.single('asset'), (req, res, next) => {
  var obj = {
    url: req.file.filename,
    title: req.body.title,
    category: req.body.category,
    userId: req.body.userId,
  };

  userAssetModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      res.json({ message: 'Upload Failed' });
    } else {
      // item.save();
      res.json({ message: 'Upload Success' });
      console.log("Asset upload success");
    }
  });
});

// Developer uploading
router.post('/dev/upload', upload.single('asset'), (req, res, next) => {
  var obj = {
    url: req.file.filename,
    title: req.body.title,
    category: req.body.category,
  };

  assetModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      res.json({ message: 'Upload Failed' });
    } else {
      res.json({ message: 'Upload Success' });
      console.log("Asset upload success");
    }
  });
});

// * GET JSON OBJECTS
// All assets
router.get('/', async (req, res) => {
  const images = await assetModel.find(
    {},
    { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
  );
  for (var i = 0; i < images.length; i++) {
    images[i].url = req.protocol + '://' + req.get('host') + '/api/assets/' + images[i].url;
  }

  // const images2 = await userAssetModel.find(
  //   {},
  //   { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
  // );
  // for (var i = 0; i < images2.length; i++) {
  //   images2[i].url = req.protocol + '://' + req.get('host') + '/api/assets/' + images[i].url;
  // }
  // images = await images.concat(images2);
  return res.json(images);
});

// Common assets
router.post('/common', upload.single(''), async (req, res, next) => {
  const category = req.body.category;

  console.log(category)
  const images = await assetModel.find(
    {category: category},
    { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
  );

  for (var i = 0; i < images.length; i++) {
    images[i].url = req.protocol + '://' + req.get('host') + '/api/assets/' + images[i].url;
  }

  return res.json(images);
});

// User assets
router.post('/personal', upload.single(''), async (req, res, next) => {
  const userId = req.body.userId;

  console.log(userId)
  const images = await userAssetModel.find(
    { userId: userId },
    { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
  );
  
  for (var i = 0; i < images.length; i++) {
    images[i].url = req.protocol + '://' + req.get('host') + '/api/assets/' + images[i].url;
  }
  return res.json(images);
});

// * GET CATEGORIES
// Common categories
router.get('/categories', async (req, res) => {
  const categories = await assetModel.distinct('category');
  return res.json(categories);
});

// not really needed rn
router.get('/personal/categories', async (req, res) => {
  const categories = await userAssetModel.distinct('category');
  return res.json(categories);
});

// * CLEARING DB AND UPLOADS
// Common assets
// TODO specific category
router.get('/common/clear', async (req, res) => {
  const images = await assetModel.find(
    {},
    { url: 1}
  );
  for (var i = 0; i < images.length; i++) {
    const path = './' + assetFolder  + images[i].url;
    console.log(path)
    if (fs.existsSync(path)) 
      fs.unlinkSync(path, { recursive: true })
  }
  await assetModel.deleteMany({})

  return res.json("cleared common assets!");
});

// User assets 
// TODO select specific user
router.get('/personal/clear', async (req, res) => {
  const images = await userAssetModel.find(
    {},
    { url: 1}
  );
  for (var i = 0; i < images.length; i++) {
    const path = './' + assetFolder  + images[i].url;
    console.log(path)
    if (fs.existsSync(path)) 
      fs.unlinkSync(path, { recursive: true })
  }
  await userAssetModel.deleteMany({})

  return res.json("cleared user assets!");
});

// everything else

router.get('/api/images/:id', async (req, res) => {
  const image = await userAssetModel.find('_id', req.params.id);
  return res.json(image);
});

//find asset with id
router.get('/find/:mongoId', async (req, res) => {
  var id = req.param('mongoId');
  const asset = await assetModel.find({ _id: id });
  return res.json(asset);
});

//find all assets from an especific user
router.get('/user/:mongoId', async (req, res) => {
  var id = req.param('mongoId');
  const userAssets = await userAssetModel.find({ userId: id });
  return res.json(userAsset);
});

//router.delete('/:id', async (req, res) => {});

module.exports = router;

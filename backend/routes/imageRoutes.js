var userAssetModel = require('../models/userAsset.js');
var assetModel = require('../models/asset.js');

const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = 'uploads'
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

router.post('/upload', upload.single('asset'), (req, res, next) => {
  //en caso no funque, checkear how to upload with multer
  var obj = {
    url: req.protocol + '://' + req.get('host') + '/api/assets/' + req.file.filename,
    title: req.body.title,
    category: req.body.category,
    userId: req.body.userId,
  };

  // console.log(req.body);
  // console.log(obj);
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

router.post('/devupload', upload.single('asset'), (req, res, next) => {
  //en caso no funque, checkear how to upload with multer
  var obj = {
    url: '/uploads/' + req.file.filename,
    title: req.body.title,
    category: req.body.category,
  };

  // console.log(req.body);
  // console.log(obj);
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

router.get('/clear', async (req, res) => {
  await userAssetModel.deleteMany({})
  const path = 'uploads'
  fs.rmdirSync(path, { recursive: true })

  console.log("xd")
  return res.json("DONE!");
});


router.get('/', async (req, res) => {
  const images = await userAssetModel.find(
    {},
    { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
  );
  return res.json(images);
});



// for userID 
// router.get('/', async (req, res) => {
//   const images = await userAssetModel.find(
//     {},
//     { url: 1, title: 1, category: 1, userId: 1, _id: 1 }
//   );
//   return res.json(images);
// });


router.get('/api/images/:id', async (req, res) => {
  const image = await userAssetModel.find('_id', req.params.id);
  return res.json(image);
});

router.delete('/api/images/:id', async (req, res) => {

});

module.exports = router;

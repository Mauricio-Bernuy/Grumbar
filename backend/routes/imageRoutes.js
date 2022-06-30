var imageModel = require('../models.js');
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
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, 'base64'),
  };

  var obj = {
    name: 'asset_generic_name',
    desc: 'asset_desc',
    url: '/uploads/' + req.file.filename,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + '/../uploads/' + req.file.filename)
      ),
      contentType: 'image/png',
    },
  };

  console.log(obj);
  imageModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.json({ message: 'lo que sea' });
    }
  });
});

router.get('/', async (req, res) => {
  const images = await imageModel.find({}, { url: 1, _id: 0 });
  return res.json(images);
});

router.get('/api/images/:id', async (req, res) => {
  const image = await imageModel.find('_id', req.params.id);
  return res.json(image);
});

router.delete('/api/images/:id', async (req, res) => {});

module.exports = router;

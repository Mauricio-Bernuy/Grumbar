var mongoose = require('mongoose');

var assetSchema = mongoose.Schema({
  url: String,
  title: String,
  category: String,
  //img: {
  //  data: buffer,
  //  contenttype: string,
  //},
});

//image is a model which has a schema imageschema

module.exports = new mongoose.model('assets', assetSchema);

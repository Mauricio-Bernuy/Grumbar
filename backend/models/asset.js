var mongoose = require('mongoose');

var assetSchema = new mongoose.schema({
  url: String,
  title: String,
  category: String,
  //img: {
  //  data: buffer,
  //  contenttype: string,
  //},
});

//image is a model which has a schema imageschema

module.exports = new mongoose.model('image', assetSchema);

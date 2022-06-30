var mongoose = require('mongoose');

var assetSchema = new mongoose.schema({
  url: string,
  title: string,
  category: string,
  //img: {
  //  data: buffer,
  //  contenttype: string,
  //},
});

//image is a model which has a schema imageschema

module.exports = new mongoose.model('image', assetSchema);

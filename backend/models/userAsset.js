var mongoose = require('mongoose');

var userAssetSchema = new mongoose.schema({
  url: string,
  title: string,
  category: string,
  userId: string,
});

//image is a model which has a schema imageschema

module.exports = new mongoose.model('image', userAssetSchema);

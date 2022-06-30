var mongoose = require('mongoose');

var userAssetSchema = mongoose.Schema({
  url: String,
  title: String,
  category: String,
  userId: String,
});

//image is a model which has a schema imageschema

module.exports = new mongoose.model('userAsset', userAssetSchema);

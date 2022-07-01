var mongoose = require('mongoose');

var assetSchema = mongoose.Schema({
  givenName: String,
  familyName: String,
  email: String,
  sub: String,
});

//image is a model which has a schema imageschema

module.exports = new mongoose.model('user', assetSchema);

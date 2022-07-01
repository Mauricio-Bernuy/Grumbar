var mongoose = require('mongoose');

var mapSchema = mongoose.Schema({
  url: String, //url where the content is saved
  title: String,
  decription: String,
  preview: String, //url where the preview is saved
  userId: String,
});

module.exports = new mongoose.model('mapAsset', mapSchema);

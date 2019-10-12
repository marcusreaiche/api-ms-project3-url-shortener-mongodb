const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  short_url: {
    type: Number,
    required: true
  },
  original_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Url", UrlSchema);
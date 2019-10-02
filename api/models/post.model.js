const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  published: Date,
  author: String,
  content: String
});

module.exports = mongoose.model("Post", postSchema);

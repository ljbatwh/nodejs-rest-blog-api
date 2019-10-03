const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  published: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  externalUrl:{ type: String, required: false },
});

module.exports = mongoose.model("Post", postSchema);

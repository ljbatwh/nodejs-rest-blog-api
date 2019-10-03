const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  published: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  externalUrl: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true }
});

module.exports = mongoose.model("Post", postSchema);

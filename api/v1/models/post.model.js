const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true }, //Check type
  published: { type: Date, required: true },
  user: { type: String, required: true }, //Check type
  likes: { type: Number, required: false }, 
  comments: { type: String, required: false }, //Check type
  featuredImgUrl: { type: String, required: false },
  tags: { type: String, required: false }, //Check type
  references: { type: String, required: false } //Check type
});

module.exports = mongoose.model("Post", postSchema);

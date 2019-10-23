const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  description: { type: String, required: true },
  categoryType: { type: Number, required: true },
  createdAt: { type: Date, required: true }
});

module.exports = mongoose.model("Category", categorySchema);

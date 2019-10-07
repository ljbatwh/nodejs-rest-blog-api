const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true },
  createdAt: { type: Date, required: true , default: new Date()},
  birthDate: { type: Date, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);

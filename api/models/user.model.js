const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  joinAt: { type: Date, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);

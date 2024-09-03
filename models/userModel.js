const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;
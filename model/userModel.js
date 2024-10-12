const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  contact: {
    type: String,
  },
});

const userModel = mongoose.model("newusers", userSchema);

module.exports={ userModel};

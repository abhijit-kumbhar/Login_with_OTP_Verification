const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("student_details", userSchema);

module.exports = userModel;

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "user must have a name"],
  },
  email: {
    type: String,
    // unique: true,
    required: [true, "user must have an email"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    trim: true,
    required: [true, "user must have a password"],
    minlength: [8, "the password must be at least 8 characters"],
  },
  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, "user must have a password confirmtion"],
    minlength: [8, "the password must be at least 8 characters"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "passwords must be equal with each other",
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

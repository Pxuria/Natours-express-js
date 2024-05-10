const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, "user must have a password confirmtion"],
    minlength: [8, "the password must be at least 8 characters"],
    validate: {
      // This only works on create and save!!!
      validator: function (val) {
        return val === this.password;
      },
      message: "passwords must be equal with each other",
    },
  },
});

userSchema.pre("save", async function (next) {
  // only run this action if the password was modified
  if (!this.isModified("password")) return next();

  //   hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  //   delete confirm password
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

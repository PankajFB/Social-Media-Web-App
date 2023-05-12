const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true, // this will make sure that no two users can have the same email address
  },
  photoURL: {
    type: String,
    // required: true,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
});

const User = new mongoose.model("user", userSchema);

module.exports = User;

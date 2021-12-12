const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      min: 3,
      max: 50,
      unique: true,
    },
    authId: { type: String, unique: true },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    authorize: {
      type: Number,
      enum: [1, 2, 3],
      default: 3,
    },
    city: {
      type: String,
      default: "",
    },
    faculty: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

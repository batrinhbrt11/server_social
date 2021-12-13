const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
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
    },
    email: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    authorize: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
      default: 3,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
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

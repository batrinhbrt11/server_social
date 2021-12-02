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
    name:{
      type:String,
      required: true,
      maxlength: 256
    },
    username: {
      type: String,
      required: true,
      maxlength: 256,
      unique: true
    },
    password:{
      type: String
    }, 
    role:{
      type: String,
      required: true
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

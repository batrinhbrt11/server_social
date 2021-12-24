const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 1000,
    },
    img: {
      type: String,
    },
    video: {
      type: String,
    },
    content:{
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    

  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

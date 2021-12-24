const mongoose = require("mongoose");

const Faculty = new mongoose.Schema(
  {
    name: {
      type: String,
      reuqired: true,
      maxlength: 256,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Faculty", Faculty);

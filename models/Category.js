const mongoose = require("mongoose");
const Category = new mongoose.Schema(
    {
        name:{
            type: String,
            reuqired: true,
            maxlength: 256
        },
        slug: {
            type: String
        }
    },
        { timestamps: true }
)
module.exports = mongoose.model("Falcuty", Falcuty);
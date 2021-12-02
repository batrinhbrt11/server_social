const mongoose = require("mongoose");

const Student = new mongoose.Schema({
    studentId:{
        type: String,
        unique: true,
        required: true
    },
    class:{
        type: String,
        default: ""
    },
    falcuty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'falcuty'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},
    { timestamps: true}
);

module.exports = mongoose.model("Student", Student);
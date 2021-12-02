const mongoose = require("mongoose");

const falNotification = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 400,
        required: true,
    },
    content: {
        type: String,
        reuquired: true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    falcutyId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('FalNotification', falNotification);
const mongoose = require("mongoose");
const Category = require("./Category");
const User = require("./User");
const referrenceValidator = require('mongoose-referrence-validator');
const { text } = require("express");
const falNotification = new mongoose.Schema({
    title: {
        type: String,
        minlength: 10,
        maxlength: 400,
        required: true,
    },
    content: {
        type: String,
        reuquired: true,
        minlength: 10
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true});

falNotification.plugin(referrenceValidator)
module.exports = mongoose.model('FalNotification', falNotification);
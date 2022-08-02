const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,

    },
    phone: {
        type: Number,
        required: true,
        unique:true,

    },
    userName: {
        type: String,
        required: true,
        unique:true,

    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
  
   
}, {
    collection: 'admin',
    versionKey: false,
});


module.exports = mongoose.model("admin", adminSchema);
const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const labSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,

    },
    address: {
        type: String,
        required: true,
        // unique:true,

    },
    phone: {
        type: String,
        required: true,
        unique:true,

    },
  
   
 
  
   
}, {
    collection: 'lab',
    versionKey: false,
});


module.exports = mongoose.model("lab", labSchema);
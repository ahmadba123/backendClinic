const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        // unique:true,

    },
    from: {
        type: String,
        required: true,
        // unique:true,

    },
    to: {
        type: String,
        required: true,
        // unique:true,

    },
  
   
 
  
   
}, {
    collection: 'schedule',
    versionKey: false,
});


module.exports = mongoose.model("schedule", scheduleSchema);
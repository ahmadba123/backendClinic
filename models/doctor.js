const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
    dob: {
        type: Date,
        // required: true,

    },
    domain: {
        type: Schema.Types.ObjectId,
        ref: "domain",
        required:true
      },
   
 
  
   
}, {
    collection: 'doctor',
    versionKey: false,
});
doctorSchema.pre(["find", "findOne"], function () {
    this.populate(["domain"]);
  });

module.exports = mongoose.model("doctor", doctorSchema);
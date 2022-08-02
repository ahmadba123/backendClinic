const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const visitSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        unique:true,

    },
    symptoms: {
        type: String,
        required: true,
        unique:true,

    },
    price: {
        type: Schema.Types.ObjectId,
        ref: "price",
        // required:true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "doctor",
        // required:true
      },
      
      patient: {
        type: Schema.Types.ObjectId,
        ref: "patient",
        // required:true
      },
      lab: {
        type: Schema.Types.ObjectId,
        ref: "lab",
        // required:true
      },
      accounting: {
        type: Schema.Types.ObjectId,
        ref: "accounting",
        // required:true
      },
   
 
  
   
}, {
    collection: 'visit',
    versionKey: false,
});
visitSchema.pre(["find", "findOne"], function () {
    this.populate(["doctor","patient","lab","accounting"]);
  });

module.exports = mongoose.model("visit", visitSchema);
const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const visitSchema = new mongoose.Schema({
 
  symptoms: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    default:Date.now()
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
  service: {
    type: Schema.Types.ObjectId,
    ref: "service",
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
  this.populate(["doctor", "patient", "service", "price", "accounting"]);
});

module.exports = mongoose.model("visit", visitSchema);
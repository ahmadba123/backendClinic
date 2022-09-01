const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    // _id: {
    //     type: Number,
    //     alias: 'id',
    //     // required: true,
    // },
    title: {
        type: String,
        required: true,
        // unique:true,

    },
    start: {
        type: Date,
        required: true,
        // unique:true,

    },
    end: {
        type: Date,
        required: true,
        // unique:true,

    },
    resourceId: {
        type: Schema.Types.ObjectId,
        ref: "doctor",
        // required:true
      },
   
 
  
   
}, {
    collection: 'schedule',
    versionKey: false,
});
// scheduleSchema.pre(["find", "findOne"], function () {
//     this.populate(["doctor"]);
//   });

module.exports = mongoose.model("schedule", scheduleSchema);
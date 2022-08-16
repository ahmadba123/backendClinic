const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,

    },
    price: {
        type: Number,
        required: true,
        // unique:true,

    },
    description: {
        type: String,
    },

    lab: {
        type: Schema.Types.ObjectId,
        ref: "lab",
        // required:true
    },





}, {
    collection: 'service',
    versionKey: false,

});

serviceSchema.pre(["find", "findOne"], function () {
    this.populate(["lab"]);
});


module.exports = mongoose.model("service", serviceSchema);
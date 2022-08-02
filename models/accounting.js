const mongoose = require('mongoose');

const accountingSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true,

    },
    amount: {
        type: Number,
        required: true,

    },
    description: {
        type: String,
        // required: true,

    },
    type: {
        type: String,
        required: true,

    }, date: {
        type: Date,
        required: true,

    },
 
  
   
}, {
    collection: 'accounting',
    versionKey: false,
})

module.exports = mongoose.model("accounting", accountingSchema);
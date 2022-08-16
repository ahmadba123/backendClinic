const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        // unique: true,
    },
}, {
    collection: 'price',
    versionKey: false,
})

module.exports = mongoose.model("price", priceSchema);
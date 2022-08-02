const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,

    },
 
  
   
}, {
    collection: 'domain',
    versionKey: false,
})

module.exports = mongoose.model("domain", domainSchema);
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true,
     
    },
    motherName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        // unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        // required: true,
    },
 
    password: {
        type: String,
        // required: true,
        min: 8,
        max: 1024
    },
  
   
}, {
    collection: 'patients',
    versionKey: false,
})

module.exports = mongoose.model("patient", patientSchema);
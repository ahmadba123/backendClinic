const patient = require('../models/patient');
const bcrypt = require('bcryptjs');
const visit = require('../models/visit')
class Controller {

    // get all patients
  async  getAll(req, res, next) {
   
    try {
        let allpatient = await patient.find();
        let countPatient = await patient.count({});
        
        res.status(200).json({patient:allpatient,countPatient});
    } catch (err) {
        res.status(404).send("error");
    }
}
    //post
    add(req, res, next) {
        let body = req.body;
        // console.log(body)
        let doc = new patient(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    //delete
    delete(req, res, next) {
        let {id} = req.params.id;
        patient.findByIdAndDelete(req.params.id , function (err, docs) {
            if (err){
                res.status(404).json(err)
                // console.log("Deleted price : ",err);

            }
            else{
                // lab.findOneAndDelete(req.params.id)
                visit.remove({patient: req.params.id}).then((err, response) => {
                    if (err) console.log("delete error:", err)
                    else console.log("delete succeeded:", response)
                })
                res.status(200).json("deleted successfully ")
                console.log("Deleted price : ", docs);
            }
        });
    }
    //update
    async update(req, res, next) {
        let { id } = req.params;
        const { firstName, lastName, fatherName, motherName, dob, address,phone } = req.body;
        const oldPatient = await patient.findById(id);
        if (firstName) oldPatient.firstName = firstName;
        if (lastName) oldPatient.lastName = lastName;
        if (fatherName) oldPatient.fatherName = fatherName;
        if (phone) oldPatient.phone = phone;
        // if (password) oldPatient.password =password;
        // = await bcrypt.hash(req.body.password);
        if (motherName) oldPatient.motherName = motherName;
        if (dob) oldPatient.dob = dob;
        // if (userName) oldPatient.userName = userName;
        if (address) oldPatient.address = address;
        await oldPatient.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;
const doctor = require('../models/doctor');
class Controller {

    // get all patients
   async getAll(req, res, next) {
    //     doctor.find((err, response) => {
    //         if (err) return next(err);
    //         res.status(200).send({ success: true, response });
    //     })
    // }
    try {
        let alldoctor = await doctor.find();
        let countdoctor = await doctor.count({});
        
        res.status(200).json({doctor:alldoctor,countdoctor});
    } catch (err) {
        res.status(404).send("error");
    }
}
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new doctor(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    //delete
    delete(req, res, next) {
        doctor.findOneAndDelete({_id: req.params.id }, function (err, docs) {
            if (err){
                res.status(404).json(err)
            }
            else{
                res.status(200).json("deleted successfully ")
                console.log("Deleted price : ", docs);
            }
        });
    }
    //update
    async update(req, res, next) {
        let { id } = req.params;
        const {name, phone,dob,domain } = req.body;
        const oldDoctor = await doctor.findById(id);
        if (name) oldDoctor.name = name;
        if (phone) oldDoctor.phone = phone;
        if (dob) oldDoctor.dob = dob;
        if (domain) oldDoctor.domain = domain;

       

        
        await oldDoctor.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;
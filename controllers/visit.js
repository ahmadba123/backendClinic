const visit = require('../models/visit');
class Controller {

    // get all patients
    getAll(req, res, next) {
        visit.find((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new visit(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    //delete
    delete(req, res, next) {
        visit.findOneAndDelete({_id: req.params.id }, function (err, docs) {
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
        const { description,symptoms,price,doctor,patient,lab,accounting } = req.body;
        const oldVisit = await visit.findById(id);
        if (description) oldVisit.description = description;
        if (symptoms) oldVisit.symptoms = symptoms;
        if (price) oldVisit.price = price;
        if (doctor) oldVisit.doctor = doctor;
        if (patient) oldVisit.patient = patient;
        if (lab) oldVisit.lab = lab;
        if (accounting) oldVisit.accounting = accounting;

        
        await oldVisit.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;
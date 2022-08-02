const service = require('../models/service');
class Controller {

    // get all patients
    getAll(req, res, next) {
        service.find((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new service(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    //delete
    delete(req, res, next) {
        service.findOneAndDelete({_id: req.params.id }, function (err, docs) {
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
        const { name,phone,address,lab } = req.body;
        const oldservice = await service.findById(id);
        if (name) oldservice.name = name;
        if (phone) oldservice.price = price;
        if (address) oldservice.description = description;
        if (lab) oldservice.lab = lab;


        
        await oldservice.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;
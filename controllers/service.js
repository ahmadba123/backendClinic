const service = require('../models/service');
class Controller {

    // get all patients
  async  getAll(req, res, next) {
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
    //del
    // deletee(req, res, next) {

    //     service.findById(req.params.service, function(err, lab) {
    //         if (err)
    //             return next(new restify.InternalError(err));
    //         else if (!service)
    //             return next(new restify.ResourceNotFoundError('The resource you requested could not be found.'));
    //         // find and remove all associated sweepstakes
    //         // Sweepstakes.find({lab_id: lab._id}).remove();
    //         // find and remove all submissions
    //         lab.find({id: lab._id}).remove();
    //         lab.remove();
    //         res.send({id: req.params.id});
    //     });
    // }
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
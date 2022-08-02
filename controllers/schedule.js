const schedule = require('../models/schedule');
class Controller {

    // get all patients
    getAll(req, res, next) {
        schedule.find((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new schedule(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    //delete
    delete(req, res, next) {
        schedule.findOneAndDelete({_id: req.params.id }, function (err, docs) {
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
        const { day,from,to } = req.body;
        const oldSchedule = await schedule.findById(id);
        if (day) oldSchedule.day = day;
        if (from) oldSchedule.from = from;
        if (to) oldSchedule.to = to;
        
        await oldSchedule.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;
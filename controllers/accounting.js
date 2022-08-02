const accounting = require('../models/accounting');
class Controller {

    // get all patients
    getAll(req, res, next) {
        accounting.find((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new accounting(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    //delete
    delete(req, res, next) {
        accounting.findOneAndDelete({_id: req.params.id }, function (err, docs) {
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
        const {total, amount,description,type,date } = req.body;
        const oldAccounting = await accounting.findById(id);
        if (total) oldAccounting.total = total;
        if (amount) oldAccounting.amount = amount;
        if (description) oldAccounting.description = description;
        if (type) oldAccounting.type = type;
        if (date) oldAccounting.date = date;

        
        await oldAccounting.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;
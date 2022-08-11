const lab = require('../models/lab');
const service = require('../models/service')
class Controller {

    // get all patients
   async getAll(req, res, next) {
        try {
            let allLab = await lab.find();
            let countLab = await lab.count({});
            
            res.status(200).json({lab:allLab,countLab});
        } catch (err) {
            res.status(404).send("error");
        }
    }
    getById(req, res, next) {
        let { id } = req.params;

        lab.findById({_id: req.params.id },(err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new lab(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
    //delete
    delete(req, res, next) {
        let {id} = req.params.id;
        lab.findByIdAndDelete(req.params.id , function (err, docs) {
            if (err){
                res.status(404).json(err)
                // console.log("Deleted price : ",err);

            }
            else{
                // lab.findOneAndDelete(req.params.id)
                service.remove({lab: req.params.id}).then((err, response) => {
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
        const { name,phone,address } = req.body;
        const oldLab = await lab.findById(id);
        if (name) oldLab.name = name;
        if (phone) oldLab.phone = phone;
        if (address) oldLab.address = address;

        
        await oldLab.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;
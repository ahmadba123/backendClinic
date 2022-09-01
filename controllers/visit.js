const visit = require('../models/visit');
function getFirstDayOfMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  
  function getLastWeeksDate() {
    const now = new Date();
  
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  }
  
  const firstDayCurrentMonth = getFirstDayOfMonth();
  const lastWeek = getLastWeeksDate();
  
  console.log("firstDayCurrentMonth:", firstDayCurrentMonth);
  console.log("week ago:", lastWeek)
class Controller {
    

    // get all visit
    async getAll(req, res, next) {
        try {
            let allvisit = await visit.find();
            let countvisit = await visit.count({});
            // const { price} = req.body;

            //     let total=0;
            //     allvisit.forEach(item => {
            //         total += item(price)
            //     });
            //     console.log(total)
            res.status(200).json({
                visit: allvisit, countvisit,
                // total
            });
        }
        catch (err) {
            res.status(404).send("error");
        }
    }

    getDailyRecord(req, res, next) {
        let date = new Date()
        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { $gte: new Date(date.setHours(0, 0, 0, 0)), $lt: new Date() }
                    }
                },
                {
                    '$lookup': {
                        'from': 'price',
                        'localField': 'price',
                        'foreignField': '_id',
                        'as': 'prices'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$prices'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$prices.amount'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
    }

    getWeeklyRecord(req, res, next) {
        let date = new Date()
        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { $gte: getLastWeeksDate(), $lt: date }
                    }
                },
                {
                    '$lookup': {
                        'from': 'price',
                        'localField': 'price',
                        'foreignField': '_id',
                        'as': 'prices'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$prices'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$prices.amount'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
    }
    getMonthlyRecord(req, res, next) {
        let date = new Date()
        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { $gte: getFirstDayOfMonth(), $lt: date }
                    }
                },
                {
                    '$lookup': {
                        'from': 'price',
                        'localField': 'price',
                        'foreignField': '_id',
                        'as': 'prices'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$prices'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$prices.amount'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
    }

    gettotalRecord(req, res, next) {
        
        // let datestr = "2020-02-02T00:00:00.000Z"
        // let date =  new Date()
        // var lastday = new Date(date.setDate(date.getDate() - 13)
        // );











        
        // console.log("gte:", date )
        // console.log("lt:", lastday )

        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { 
                            // $gte: new Date(date.setHours(0, 0, 0, 0)),
                             $lt: new Date() }
                    }
                },
                {
                    '$lookup': {
                        'from': 'price',
                        'localField': 'price',
                        'foreignField': '_id',
                        'as': 'prices'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$prices'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$prices.amount'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
    }

    getDailyRecordLab(req, res, next) {
        let date = new Date()
        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { $gte: new Date(date.setHours(0, 0, 0, 0)), $lt: new Date() }
                    }
                },
                {
                    '$lookup': {
                        'from': 'service',
                        'localField': 'service',
                        'foreignField': '_id',
                        'as': 'services'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$services'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$services.price'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
    }

    getWeeklyRecordLab(req, res, next) {
        let date = new Date()
        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { $gte: getLastWeeksDate(), $lt: date }
                }},
                {
                    '$lookup': {
                        'from': 'service',
                        'localField': 'service',
                        'foreignField': '_id',
                        'as': 'services'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$services'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$services.price'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
    }
    getMonthlyRecordLab(req, res, next) {
        let date = new Date()
        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { $gte: getFirstDayOfMonth(), $lt: date }
                    }},
                {
                    '$lookup': {
                        'from': 'service',
                        'localField': 'service',
                        'foreignField': '_id',
                        'as': 'services'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$services'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$services.price'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
    }
    gettotalRecordLab(req, res, next) {
        let date = new Date()
        visit.aggregate(
            [
                {
                    '$match': {
                        "date": { 
                            // $gte: new Date(date.setHours(0, 0, 0, 0)),
                             $lt: new Date() }
                    }
                },
                {
                    '$lookup': {
                        'from': 'service',
                        'localField': 'service',
                        'foreignField': '_id',
                        'as': 'services'
                    }
                },
                {
                    '$set': {
                        'key': 1
                    }
                },
                {
                    '$unwind': {
                        'path': '$services'
                    }
                },
                {
                    '$group': {
                        '_id': '$key',
                        'totalAmount': {
                            '$sum': '$services.price'
                        }
                    }
                }
            ],
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({
                    success: true,
                    message: "Get Records Successfully",
                    response,
                });
            }
        );
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
        visit.findOneAndDelete({ _id: req.params.id }, function (err, docs) {
            if (err) {
                res.status(404).json(err)
            }
            else {
                res.status(200).json("deleted successfully ")
                console.log("Deleted price : ", docs);
            }
        });
    }
    //update
    async update(req, res, next) {
        let { id } = req.params;
        const { description, symptoms, price, doctor, patient, lab, accounting, date } = req.body;
        const oldVisit = await visit.findById(id);
        // if (description) oldVisit.description = description;
        if (symptoms) oldVisit.symptoms = symptoms;
        if (date) oldVisit.date = date;
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
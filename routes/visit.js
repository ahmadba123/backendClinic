var express = require('express');
var router = express.Router();
const controller = require('../controllers/visit');

// routes with user
router.get('/', controller.getAll)
router.get('/records/daily', controller.getDailyRecord)
router.get('/records/total', controller.gettotalRecord)
router.get('/records/daily/lab', controller.getDailyRecordLab)
router.get('/records/weekly/lab', controller.getWeeklyRecordLab)
router.get('/records/monthly/lab', controller.getMonthlyRecordLab)


router.get('/records/total/lab', controller.gettotalRecordLab)  
router.get('/records/weekly', controller.getWeeklyRecord)   
router.get('/records/monthly', controller.getMonthlyRecord)  


router.post('/', controller.add)
// router.post('/signin', controller.signin)
router.put('/:id', controller.update)
router.delete("/:id", controller.delete);

module.exports = router;

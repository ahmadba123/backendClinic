var express = require('express');
var router = express.Router();
const controller = require('../controllers/price');

// routes with user
router.get('/', controller.getAll)
router.post('/', controller.add)
// router.post('/signin', controller.signin)
router.put('/:id', controller.update)
router.delete("/:id", controller.delete);

module.exports = router;

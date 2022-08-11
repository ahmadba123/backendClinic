var express = require('express');
var router = express.Router();
const controller = require('../controllers/lab');

// routes with user
router.get('/', controller.getAll)
router.post('/', controller.add)
router.get('/:id', controller.getById)

// router.post('/signin', controller.signin)
router.put('/:id', controller.update)
router.delete("/:id", controller.delete);

module.exports = router;


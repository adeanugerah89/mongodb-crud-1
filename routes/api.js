var express = require('express');
var router = express.Router();
var controller = require('../controllers/bookController');

/* REST API list */
router.post('/', controller.createBook);
router.get('/', controller.getAllBooks);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

module.exports = router;
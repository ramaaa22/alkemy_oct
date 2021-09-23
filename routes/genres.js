var express = require('express');
var router = express.Router();
var genresController = require('../controllers/genresController')
const validator = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields')
const {check} = require('express-validator');

/* GET users listing. */
router.get('/', genresController.getAll);
router.get('/:id',genresController.getOne);
router.post('/',[
    check('name').custom(validator.existsGenreWithName),
    validateFields
],genresController.createGenre);
router.put('/:id',[
    check('name').custom(validator.existsGenreWithName),
    validateFields
],genresController.updateGenre);

module.exports = router;

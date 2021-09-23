var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
const moviesController = require('../controllers/moviesController');
const validator = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');

router.get('/',moviesController.getAll);
router.get('/:id',moviesController.getOne);
router.post('/',[
    check('name').custom(validator.existsMovieWithName),
    check('genre_id').custom(validator.existsGenreWithId),
    check('genre','Debe tener un genero asociado').not().isEmpty(),
    validateFields
],moviesController.createMovie)

module.exports = router
var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
const moviesController = require('../controllers/moviesController');
const validator = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');
const validateJwt = require('../middlewares/validate-jwt');

router.get('/',[
    validateJwt
],moviesController.getAll);

router.get('/:id',[
    validateJwt
],moviesController.getOne);

router.post('/',[
    validateJwt,
    check('name').custom(validator.existsMovieWithName),
    check('genre_id').custom(validator.existsGenreWithId),
    validateFields
],moviesController.createMovie)

router.put('/:id',[
    validateJwt,
    check('name').custom(validator.existsMovieWithName),
    validateFields
],moviesController.updateMovie);

router.delete('/:id',[
    validateJwt
],moviesController.deleteMovie);

module.exports = router
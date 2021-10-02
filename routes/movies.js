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
    check('created_at','Debe ingresar una fecha válida').isDate(),
    check('calification','Debe ingresar un valor entre 1 y 5').isInt({min:1,max:5}),
    check('characters').custom(validator.existsCharacters),
    validateFields
],moviesController.createMovie)

router.put('/:id',[
    validateJwt,
    check('name').custom(validator.existsMovieWithName),
    check('genre_id').custom(validator.existsGenreWithId).optional(),
    check('created_at','Debe ingresar una fecha válida').optional().isDate(),
    check('calification','Debe ingresar un valor entre 1 y 5').optional().isInt({min:1,max:5}),
    check('characters').custom(validator.existsCharacters),
    validateFields
],moviesController.updateMovie);

router.delete('/:id',[
    validateJwt
],moviesController.deleteMovie);

module.exports = router
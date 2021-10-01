var express = require('express');
var router = express.Router();
var genresController = require('../controllers/genresController')
const validator = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');
const validateJwt = require('../middlewares/validate-jwt')
const {check} = require('express-validator');

/* GET users listing. */
router.get('/',[
    validateJwt
], genresController.getAll);

router.get('/:id',[
    validateJwt
],genresController.getOne);

router.post('/',[
    validateJwt,
    check('name').custom(validator.existsGenreWithName),
    validateFields
],genresController.createGenre);

router.put('/:id',[
    validateJwt,
    check('name').custom(validator.existsGenreWithName),
    validateFields
],genresController.updateGenre);

router.delete('/:id',[
    validateJwt
],genresController.deleteGenre);

module.exports = router;

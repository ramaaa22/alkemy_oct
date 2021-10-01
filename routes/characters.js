var express = require('express');
var router = express.Router();
const charactersController = require('../controllers/charactersController')
const validateJwt = require('../middlewares/validate-jwt')
const {check} = require('express-validator');
const validator = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');
router.post('/',[
    validateJwt,
    check('name','El nombre de usuario no puede ser nulo').not().isEmpty(),
    check('name').custom(validator.existsCharacterWithName),
    validateFields
],charactersController.createCharacter);

router.get('/',[
    validateJwt
],charactersController.getAll);

router.get('/:id',[
    validateJwt
],charactersController.getOne);

router.delete('/:id',[
    validateJwt
],charactersController.deleteCharacter)

router.put('/:id',[
    validateJwt
],charactersController.updateCharacter)

module.exports =router;
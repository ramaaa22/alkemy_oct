var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
var usersController = require('../controllers/usersController')
const validator = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');


router.post('/login',[
  check('email','Debe ingresar un correo electrónico').not().isEmpty(),
  check('password','Debe ingresar una contraseña').not().isEmpty(),
  validateFields
],usersController.login);
router.post('/register',[
  check('email','No es un correo electrónico válido').isEmail(),
  check('email').custom(validator.existsUserWithEmail),
  validateFields
],usersController.register)

module.exports = router;

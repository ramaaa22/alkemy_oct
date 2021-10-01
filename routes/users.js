var express = require('express');
const { check } = require('express-validator');
var router = express.Router();
var usersController = require('../controllers/usersController')
const validator = require('../helpers/db-validator');
const validateFields = require('../middlewares/validate-fields');


router.post('/login',usersController.login);
router.post('/register',[
  check('email','No es un correo electrónico válido').isEmail(),
  check('email').custom(validator.existsUserWithEmail),
  validateFields
],usersController.register)

module.exports = router;

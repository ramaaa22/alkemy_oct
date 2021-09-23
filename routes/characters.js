var express = require('express');
var router = express.Router();
const charactersController = require('../controllers/charactersController')

router.post('/',charactersController.createCharacter);
router.get('/',charactersController.getAll)

module.exports =router;
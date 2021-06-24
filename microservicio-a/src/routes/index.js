const express = require('express');
const router = express.Router();

const greetingController = require('../controllers/greetingController');

router.get('/greeting/:name?', greetingController.greeting);

module.exports = router;


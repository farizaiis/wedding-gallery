const express = require('express');
const router = express.Router();
const challenge_one = require('../controllers/challenge_one_controller');

router.get('/', challenge_one.challenge)

module.exports = router;
const express = require('express');
const router = express.Router();
const admin_wedding = require('./admin_wedding_router');
const guest_wedding = require('./guest_wedding_router');
const challenge_one = require('./challenge_one_router');

router.use('/challenge', challenge_one);
router.use('/guest', guest_wedding);
router.use('/admin', admin_wedding);
module.exports = router;
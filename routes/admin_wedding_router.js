const express = require('express');
const router = express.Router();
const admin_wedding = require('../controllers/admin_wedding_controller');
const { login_check } = require('../middlewares/authentication');

router.post('/register', admin_wedding.regist_admin)
router.post('/login', admin_wedding.login_admin);
router.post('/logout', login_check, admin_wedding.logout_admin)

module.exports = router;
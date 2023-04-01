const express = require('express');
const router = express.Router();
const guest_wedding = require('../controllers/guest_wedding_controller');
const { login_check } = require('../middlewares/authentication');

router.post('/', guest_wedding.post_notes)
router.get('/', guest_wedding.get_all_notes);
router.get('/:id', guest_wedding.detail_notes)
router.put('/:id', login_check, guest_wedding.update_notes)
router.delete('/:id', login_check, guest_wedding.delete_notes)

module.exports = router;
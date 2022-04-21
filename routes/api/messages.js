const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/api/messages');

router.get('/:sender', messagesCtrl.get);
router.delete('/:id', messagesCtrl.remove);
router.post('/', messagesCtrl.create);

module.exports = router;
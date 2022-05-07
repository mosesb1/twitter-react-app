const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/api/messages');

router.get('/:threadId', messagesCtrl.get);
router.delete('/', messagesCtrl.deleteAll);
router.delete('/:id', messagesCtrl.remove);
router.post('/:threadId', messagesCtrl.create);

module.exports = router;
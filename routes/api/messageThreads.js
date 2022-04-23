const express = require('express');
const router = express.Router();
const messageThreadsCtrl = require('../../controllers/api/messageThreads');

router.get('/', messageThreadsCtrl.index);
router.delete('/:id', messageThreadsCtrl.remove);
router.post('/:firstId/:secondId', messageThreadsCtrl.create);
router.patch('/:threadId/:messageId', messageThreadsCtrl.addMessage);
router.get('/:current/:other', messageThreadsCtrl.show);

module.exports = router;
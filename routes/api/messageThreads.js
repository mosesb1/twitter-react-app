const express = require('express');
const router = express.Router();
const messageThreadsCtrl = require('../../controllers/api/messageThreads');

router.get('/', messageThreadsCtrl.index);
router.delete('/:id', messageThreadsCtrl.remove);
router.post('/:firstId/:secondId', messageThreadsCtrl.create);
router.put('/:threadId/:messageId', messageThreadsCtrl.addMessage);
router.get('/:firstId/:secondId', messageThreadsCtrl.show);

module.exports = router;
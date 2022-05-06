const express = require('express');
const router = express.Router();
const messageThreadsCtrl = require('../../controllers/api/messageThreads');

router.get('/:userId', messageThreadsCtrl.get);
router.get('/thread/:threadId', messageThreadsCtrl.getThread);
router.delete('/:id', messageThreadsCtrl.remove);
router.post('/:firstId/:secondId', messageThreadsCtrl.create);
router.patch('/:threadId/:messageId', messageThreadsCtrl.addMessage);
router.get('/:firstId/:secondId', messageThreadsCtrl.show);

module.exports = router;
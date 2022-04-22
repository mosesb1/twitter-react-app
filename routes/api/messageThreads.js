const express = require('express');
const router = express.Router();
const messageThreadsCtrl = require('../../controllers/api/messageThreads');

router.get('/', messageThreadsCtrl.index);
router.delete('/:id', messageThreadsCtrl.remove);
router.post('/', messageThreadsCtrl.create);
router.patch('/:id', messageThreadsCtrl.addMessage);
router.get('/:current/:other', messageThreadsCtrl.show);

module.exports = router;
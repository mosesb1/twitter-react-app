const express = require('express');
const router = express.Router();
const tweetsCtrl = require('../../controllers/api/tweets');


router.get('/', tweetsCtrl.get);
router.get('/replies/:tweetId', tweetsCtrl.getReplies);
router.delete('/:id', tweetsCtrl.remove);
router.put('/:id', tweetsCtrl.update);
router.patch('/:tweetId/:userId', tweetsCtrl.like)
router.patch('/replies/:tweetId/:replyId', tweetsCtrl.removeReply)
router.post('/:tweetId', tweetsCtrl.reply);
router.post('/', tweetsCtrl.create);
router.get('/:id', tweetsCtrl.show);

module.exports = router;
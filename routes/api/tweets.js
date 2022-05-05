const express = require('express');
const router = express.Router();
const tweetsCtrl = require('../../controllers/api/tweets');


router.get('/', tweetsCtrl.get);
router.get('/replies/:tweetId', tweetsCtrl.getReplies);
router.get('/user/:userId', tweetsCtrl.getUserTweets);
router.get('/user/all/:userId', tweetsCtrl.getUserTweetsAndReplies);
router.get('/likes/:userId', tweetsCtrl.getLikes);
router.get('/home/:userId', tweetsCtrl.getHome);
router.get('/bookmark/:userId', tweetsCtrl.getBookmark);
router.delete('/:id', tweetsCtrl.remove);
router.put('/:id', tweetsCtrl.update);
router.patch('/:tweetId/:userId', tweetsCtrl.like);
router.patch('/remove/:tweetId/:userId', tweetsCtrl.removeLike);
router.patch('/replies/:tweetId/:replyId', tweetsCtrl.removeReply);
router.patch('/bookmark/:tweetId/:userId', tweetsCtrl.bookmark);
router.patch('/bookmark/remove/:tweetId/:userId', tweetsCtrl.removeBookmark);
router.post('/:tweetId', tweetsCtrl.reply);
router.post('/', tweetsCtrl.create);
router.get('/:id', tweetsCtrl.show);

module.exports = router;
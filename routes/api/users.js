const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');


router.get('/', usersCtrl.get);

router.get('/:userId', usersCtrl.getUser);

router.get('/name/:username', usersCtrl.getUserByName);

router.delete('/', usersCtrl.deleteAll);

router.delete('/:userId', usersCtrl.deleteUser);

router.patch('/username/:userId', usersCtrl.changeUsername);

router.patch('/email/:userId', usersCtrl.changeEmail);

router.patch('/image/:userId', usersCtrl.updateUserImg);

router.patch('/remove/:userId/:tweetId', usersCtrl.removeLike);

router.patch('/follow/:userId/:followId', usersCtrl.follow);

router.patch('/follow/remove/:userId/:followId', usersCtrl.removeFollow);

router.patch('/bookmark/:userId/:tweetId', usersCtrl.bookmark);

router.patch('/bookmark/remove/:userId/:tweetId', usersCtrl.removeBookmark);

router.patch('/:userId/:tweetId', usersCtrl.like);

// POST /api/users
router.post('/', usersCtrl.create);

router.post('/changepassword/:userId', usersCtrl.changePassword);
// POST /api/users/login
router.post('/login', usersCtrl.login);

module.exports = router;
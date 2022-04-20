const express = require('express');
const router = express.Router();
const tweetsCtrl = require('../../controllers/api/tweets');


router.get('/', tweetsCtrl.get);
router.delete('/:id', tweetsCtrl.remove);
router.post('/:id', tweetsCtrl.update);
router.post('/', tweetsCtrl.create);
router.get('/:id', tweetsCtrl.show);

module.exports = router;
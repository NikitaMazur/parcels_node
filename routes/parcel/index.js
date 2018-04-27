const passport = require('passport');
const { Router } = require('express');

const router = new Router();

router.get('/status', require('./getByStatus'));
router.get('/search', require('./search'));
router.put('/multi-status', passport.authMiddleware(), require('./updateStatus'));

router.get('/', passport.authMiddleware(), require('./getAll'));
router.get('/:id', require('./get'));
router.post('/', passport.authMiddleware(), require('./add'));
router.delete('/:id', passport.authMiddleware(), require('./delete'));
router.put('/:id', passport.authMiddleware(), require('./update'));

module.exports = router;
const router = require('koa-router')();
const HandleRoot = require('./handle-root');
const HandleRequestRegister = require('./handle-request-register');
const HandleRegister = require('./handle-register');
const HandleLogin = require('./handle-login');
const HandleLoginChallenge = require('./handle-login-challenge');

router.get('/', HandleRoot);

// Register routes
router.post('/request-register', HandleRequestRegister);
router.post('/register', HandleRegister);

// Authenticate routes
router.post('/login', HandleLogin);
router.post('/login-challenge', HandleLoginChallenge);

module.exports = router;

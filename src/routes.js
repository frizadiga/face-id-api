const router = require('koa-router')();
const HandleRoot = require('./handle-root');
const HandleRequestRegister = require('./handle-request-register');
const HandleRegister = require('./handle-register');
const HandleLogin = require('./handle-login');
const HandleLoginChallenge = require('./handle-login-challenge');
const HandleCheckUser = require('./handle-check-user');

router.get('/', HandleRoot);

// Auth
router.post('/check-user', HandleCheckUser);

// Register Webauthn
router.post('/request-register', HandleRequestRegister);
router.post('/register', HandleRegister);

// Authenticate Webauthn
router.post('/login', HandleLogin);
router.post('/login-challenge', HandleLoginChallenge);

module.exports = router;

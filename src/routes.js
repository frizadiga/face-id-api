const router = require('koa-router')();

const HandleRoot = require('./handle-root');
const HandleIsAuth = require('./handle-is-auth');
const HandleCheckUser = require('./handle-check-user');
const HandleSetLogin = require('./handle-set-login');
const HandleSetLogout = require('./handle-set-logout');

const HandleRequestRegister = require('./handle-request-register');
const HandleRegister = require('./handle-register');
const HandleLogin = require('./handle-login');
const HandleLoginChallenge = require('./handle-login-challenge');

router.get('/', HandleRoot);

// Auth
router.post('/is-auth', HandleIsAuth);
router.post('/check-user', HandleCheckUser);
router.post('/set-login', HandleSetLogin);
router.post('/set-logout', HandleSetLogout);

// Register Webauthn
router.post('/request-register', HandleRequestRegister);
router.post('/register', HandleRegister);

// Authenticate Webauthn
router.post('/login', HandleLogin);
router.post('/login-challenge', HandleLoginChallenge);

module.exports = router;

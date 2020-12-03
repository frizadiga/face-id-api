const router = require('koa-router')();

const HandleRoot = require('./handle-root');
const HandleIsAuth = require('./handle-is-auth');
const HandleCheckUser = require('./handle-check-user');
const HandleSetLogin = require('./handle-set-login');
const HandleSetLogout = require('./handle-set-logout');

const HandleGenerateAttestationOptions = require('./handle-generate-attestation-options');
const HandleVerifyAttestation = require('./handle-verify-attestation');

router.get('/', HandleRoot);

// Auth
router.post('/is-auth', HandleIsAuth);
router.post('/check-user', HandleCheckUser);
router.post('/set-login', HandleSetLogin);
router.post('/set-logout', HandleSetLogout);

// RegistWebauthn
router.get('/generate-attestation-options', HandleGenerateAttestationOptions);
router.post('/verify-attestation', HandleVerifyAttestation);

// Authenticate Webauthn

module.exports = router;

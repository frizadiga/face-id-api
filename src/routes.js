const router = require('koa-router')();

const HandleRoot = require('./handle-root');
const HandleIsAuth = require('./handle-is-auth');
const HandleCheckUser = require('./handle-check-user');
const HandleSetLogin = require('./handle-set-login');
const HandleSetLogout = require('./handle-set-logout');

const HandleGenerateAttestationOptions = require('./handle-generate-attestation-options');
const HandleVerifyAttestation = require('./handle-verify-attestation');
const HandleGenerateAssertionOptions = require('./handle-generate-assertion-options');
const HandleVerifyAssertion = require('./handle-verify-assertion');

router.get('/', HandleRoot);

// Auth
router.post('/is-auth', HandleIsAuth);
router.post('/check-user', HandleCheckUser);
router.post('/set-login', HandleSetLogin);
router.post('/set-logout', HandleSetLogout);

// Register Webauthn
router.get('/generate-attestation-options', HandleGenerateAttestationOptions);
router.post('/verify-attestation', HandleVerifyAttestation);

// Login Webauthn
router.get('/generate-assertion-options', HandleGenerateAssertionOptions);
router.post('/verify-assertion', HandleVerifyAssertion);

module.exports = router;

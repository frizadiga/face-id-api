const { RELYING_PARTY_ID } = require('./config');
const { generateAssertionOptions } = require('@simplewebauthn/server');

const modelUpdateUser = require('./model-user-update');
const modelFindOneUser = require('./model-user-find-one');

async function HandleGenerateAssertionOptions(ctx) {
  const { request, response } = ctx;
  const requestData = request.query;

  const resUserData = await modelFindOneUser({ id: requestData.id });

  const options = generateAssertionOptions({
    timeout: 60000,
    allowCredentials: resUserData.devices.map(item => ({
      id: item.credentialID,
      type: 'public-key',
      transports: ['usb', 'ble', 'nfc', 'internal'],
    })),
    /**
     * This optional value controls whether or not the authenticator needs be able to uniquely
     * identify the user interacting with it (via built-in PIN pad, fingerprint scanner, etc...)
     */
    userVerification: 'preferred',
    rpID: RELYING_PARTY_ID,
  });

  /**
   * The server needs to temporarily remember this value for verification, so don't lose it until
   * after you verify an authenticator response.
   */
  await modelUpdateUser(requestData.user_id, { current_challenge: options.challenge });

  return response.body = options;
}

module.exports = HandleGenerateAssertionOptions;

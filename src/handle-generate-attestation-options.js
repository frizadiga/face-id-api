const { RELYING_PARTY_ID, RELYING_PARTY_NAME, ATTESTATION_TYPE } = require('./config');
const { generateAttestationOptions } = require('@simplewebauthn/server');

const modelUpdateUser = require('./model-user-update');
const modelFindOneUser = require('./model-user-find-one');

async function HandleGenerateAttestationOptions(ctx) {
  const { request, response } = ctx;
  const requestData = request.query;
  const userId = requestData.user_id;

  const resUserData = await modelFindOneUser({ id: userId });

  const options = generateAttestationOptions({
    rpID: RELYING_PARTY_ID,
    rpName: RELYING_PARTY_NAME,
    userID: userId,
    userName: resUserData.full_name,
    timeout: 60000,
    attestationType: ATTESTATION_TYPE,
    /**
     * Passing in a user's list of already-registered authenticator IDs here prevents users from
     * registering the same device multiple times. The authenticator will simply throw an error in
     * the browser if it's asked to perform an attestation when one of these ID's already resides
     * on it.
     */
    excludeCredentials: (resUserData?.devices || []).map(item => ({
      id: item.credentialID,
      type: 'public-key',
      transports: ['usb', 'ble', 'nfc', 'internal'],
    })),
    /**
     * The optional authenticatorSelection property allows for specifying more constraints around
     * the types of authenticators that users to can use for attestation
     */
    authenticatorSelection: {
      userVerification: 'preferred',
      requireResidentKey: false,
    },
  });

  await modelUpdateUser(userId, { current_challenge: options.challenge });

  return response.body = options;
}

module.exports = HandleGenerateAttestationOptions;

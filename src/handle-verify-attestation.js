const { RELYING_PARTY_ID, EXPECTED_ORIGIN } = require('./config');
const { verifyAttestationResponse } = require('@simplewebauthn/server');

// const modelUpdateUser = require('./model-user-update');
const modelFindOneUser = require('./model-user-find-one');

async function HandleVerifyAttestation(ctx) {
  const { request, response } = ctx;
  const requestData = request.body;
  const credential = requestData.attResp;

  let verification;

  const resUserData = await modelFindOneUser({ id: requestData.id });

  try {
    verification = await verifyAttestationResponse({
      credential,
      expectedChallenge: `${resUserData.current_challenge}`,
      expectedOrigin: EXPECTED_ORIGIN,
      expectedRPID: RELYING_PARTY_ID,
    });
  } catch (error) {
    console.error(error);
    response.status = 400;
    response.body = { error: error.message };
    return;
  }

  const { verified /* authenticatorInfo */ } = verification;

  // if (verified && authenticatorInfo) {
  //   const { base64PublicKey, base64CredentialID, counter } = authenticatorInfo;

  //   const existingDevice = user.devices.find((device) => {
  //     return device.credentialID === base64CredentialID;
  //   });

  //   if (!existingDevice) {
  //     /**
  //      * Add the returned device to the user's list of devices
  //      */
  //     user.devices.push({
  //       publicKey: base64PublicKey,
  //       credentialID: base64CredentialID,
  //       counter,
  //     });
  //   }
  // }

  return response.body = { verified };
}

module.exports = HandleVerifyAttestation;

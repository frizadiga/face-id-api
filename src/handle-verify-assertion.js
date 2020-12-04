const { RELYING_PARTY_ID, EXPECTED_ORIGIN } = require('./config');
const { verifyAssertionResponse } = require('@simplewebauthn/server');

const modelUpdateUser = require('./model-user-update');
const modelFindOneUser = require('./model-user-find-one');

async function HandleVerifyAssertion(ctx) {
  const { request, response } = ctx;
  const requestData = request.body;
  const credential = requestData.assertion_response;

  const resUserData = await modelFindOneUser({ id: requestData.id });

  // "Query the DB" here for an authenticator matching `credentialID`
  const dbAuthenticator = resUserData.devices.find((item) => {
    return item.credentialID === credential.id;
  });

  if (!dbAuthenticator) {
    const errMsg = `(!dbAuthenticator): could not find authenticator matching ${credential}`;
    console.error(errMsg);
    response.status = 500;
    response.body = { error: errMsg };
    return;
  }

  let verification;

  try {
    verification = await verifyAssertionResponse({
      credential,
      authenticator: dbAuthenticator,
      expectedRPID: RELYING_PARTY_ID,
      expectedOrigin: EXPECTED_ORIGIN,
      expectedChallenge: `${resUserData.current_challenge}`,
    });
  } catch (error) {
    console.error(error);
    response.status = 400;
    response.body = { error: error.message };
    return;
  }

  const { verified, authenticatorInfo } = verification;

  if (verified) {
    // Update the authenticator's counter in the DB to the newest count in the assertion
    const { counter } = authenticatorInfo;
    dbAuthenticator.counter = counter;

    const tempExcludeDevice = resUserData.devices.filter((item) => {
      return item.credentialID !== dbAuthenticator.credentialID;
    });

    const finalDevices = [...tempExcludeDevice, dbAuthenticator];
    const setLoggedIn = () => verified === true;

    const dataToUpdate = {
      devices: finalDevices,
      is_logged_in: setLoggedIn(),
    };

    await modelUpdateUser(requestData.id, dataToUpdate);
  }


  return response.body = { verified };
}

module.exports = HandleVerifyAssertion;

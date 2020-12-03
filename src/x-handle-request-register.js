const { generateRegistrationChallenge } = require('@webauthn/server');
const createUser = require('./model-user-create');

const emitError = require('./emit-error');
const getResponseOk = require('./get-response-ok');
const getResponseError = require('./get-response-error');
const { CHALLENGE_ID, RELYING_PARTY_NAME } = require('./config');

async function HandleRequestRegister(ctx) {
  const { request, response } = ctx;
  const requestData = request.body;

  const challengeResponse = generateRegistrationChallenge({
    user: { id: CHALLENGE_ID, name: requestData.email },
    relyingParty: { name: RELYING_PARTY_NAME },
  });

  const dataToCreate = {
    ...requestData,
    challenge: challengeResponse.challenge,
  };

  try {
    const responseDB = await createUser(dataToCreate);

    if (responseDB.id) {
      const data = {
        ...requestData,
        challenge: challengeResponse.challenge,
      };

      return response.body = getResponseOk({ data, responseDB });
    }

    const errMsg = 'Failed create new user';
    return response.body = getResponseError({ message: errMsg, responseDB });
  } catch (error) {
    emitError({ error, ctx });
  }
}

module.exports = HandleRequestRegister;

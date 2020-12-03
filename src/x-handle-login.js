const { isEmpty } = require('lodash');
const { generateLoginChallenge } = require('@webauthn/server');

const findOneUser = require('./model-user-find-one');
const updateUser = require('./model-user-update');

const emitError = require('./emit-error');
const getResponseOk = require('./get-response-ok');
const getResponseError = require('./get-response-error');

async function HandleLogin(ctx) {
  const { request, response } = ctx;
  const requestData = request.body;

  try {
    // Find user by email
    const resUserByEmail = await findOneUser({ email: requestData.email });

    const userKey = resUserByEmail?.key || '';
    const assertionChallenge = generateLoginChallenge(userKey);

    if (isEmpty(resUserByEmail)) {
      const errMsg = 'Can\'t find user by email';
      return response.body = getResponseError({ message: errMsg });
    }

    if (!userKey) {
      const errMsg = 'Can\'t find user key';
      return response.body = getResponseError({ message: errMsg });
    }

    if (assertionChallenge) {
      // Update challenge
      const userId = resUserByEmail.id;
      const updateData = { challenge: assertionChallenge.challenge };
      const resUpdatedChallenge = await updateUser(userId, updateData);

      const data = {
        ...requestData,
        assertionChallenge,
      };

      const okProps = {
        data, responseDB: { resUserByEmail, resUpdatedChallenge },
      };

      return response.body = getResponseOk(okProps);
    }
  } catch (error) {
    emitError({ error, ctx });
  }
}

module.exports = HandleLogin;

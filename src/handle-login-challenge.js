const { isEmpty } = require('lodash');

const {
  parseLoginRequest,
  verifyAuthenticatorAssertion,
} = require('@webauthn/server');

const findOneUser = require('./model-user-find-one');

const emitError = require('./emit-error');
const getResponseOk = require('./get-response-ok');
const getResponseError = require('./get-response-error');

async function HandleLoginRegister(ctx) {
  const { request, response } = ctx;
  const requestData = request.body;
  const { challenge, keyId } = parseLoginRequest(requestData);

  if (!challenge) {
    const errMsg = 'Can\'t find user by challenge';
    const errorProps = {
      message: errMsg,
    };

    return response.body = getResponseError(errorProps);
  }

  try {
    // Find one user by challenge
    const _challenge = challenge;
    // const _challenge = 'hi33pDf0iq0hH10nRHmmC33309VqEVXzCl6l6uYfMk4=';
    const resOneUserByChallange = await findOneUser({ challenge: _challenge });

    if (
      isEmpty(resOneUserByChallange)
      || !resOneUserByChallange.key
      || resOneUserByChallange.key.credID !== keyId
    ) {
      const errMsg = 'Can\'t verifyAuthenticatorAssertion due to missing key';
      const errorProps = {
        message: errMsg,
        responseDB: resOneUserByChallange,
      };

      return response.body = getResponseError(errorProps);
    }

    // Verify
    const loggedIn = verifyAuthenticatorAssertion(requestData, resOneUserByChallange.key);

    // If no errors
    const data = {
      ...requestData,
      logged_in: loggedIn,
    };

    const okProps = {
      data,
      responseDB: { resOneUserByChallange },
    };

    return response.body = getResponseOk(okProps);
  } catch (error) {
    emitError({ error, ctx });
  }
}

module.exports = HandleLoginRegister;

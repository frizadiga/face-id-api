const { isEmpty } = require('lodash');
const { parseRegisterRequest } = require('@webauthn/server');

const findOneUser = require('./model-user-find-one');
const updateUser = require('./model-user-update');

const emitError = require('./emit-error');
const getResponseOk = require('./get-response-ok');
const getResponseError = require('./get-response-error');

async function HandleRegister(ctx) {
  const { request, response } = ctx;
  const requestData = request.body;

  const { key = 'DUMMY_KEY', challenge = 'DUMMY_CHALLENGE' } = parseRegisterRequest(requestData);

  try {
    // Find one user by challenge
    const _challenge = challenge;
    // const _challenge = 'hi33pDf0iq0hH10nRHmmC33309VqEVXzCl6l6uYfMk4=';
    const resOneUserByChallange = await findOneUser({ challenge: _challenge });

    if (isEmpty(resOneUserByChallange)) {
      const errMsg = 'Can\'t find user by challenge';
      const errorProps = {
        message: errMsg,
        responseDB: resOneUserByChallange,
      };

      return response.body = getResponseError(errorProps);
    }

    let resUpdatedKey = {};

    if (resOneUserByChallange.id) {
      const _key = key;
      resUpdatedKey = await updateUser(resOneUserByChallange.id, { key: _key });

      const data = {
        ...requestData,
        key,
        challenge,
        logged_in: true,
      };

      const okProps = {
        data,
        responseDB: { resUpdatedKey, resOneUserByChallange },
      };

      return response.body = getResponseOk(okProps);
    }
  } catch (error) {
    emitError({ error, ctx });
  }
}

module.exports = HandleRegister;

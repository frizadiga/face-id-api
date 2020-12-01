const { isEmpty } = require('lodash');

const findOneUser = require('./model-user-find-one');

const emitError = require('./emit-error');
const getResponseOk = require('./get-response-ok');
const getResponseError = require('./get-response-error');

async function HandleIsAuth(ctx) {
  const { request, response } = ctx;
  const requestBody = request.body;

  try {
    // Find user by email | phone | password
    const findByParams = { id: requestBody.id };

    const resFindUser = await findOneUser(findByParams);

    // Is user exist?
    if (isEmpty(resFindUser)) {
      const errMsg = 'Can\'t find user';
      return response.body = getResponseError({ message: errMsg });
    }

    // Good to go
    const data = {
      id: resFindUser.id,
      is_logged_in: resFindUser.is_logged_in,
    };

    const okProps = {
      data, responseDB: resFindUser,
    };

    return response.body = getResponseOk(okProps);
  } catch (error) {
    emitError({ error, ctx });
  }
}

module.exports = HandleIsAuth;

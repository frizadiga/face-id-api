const { isEmpty } = require('lodash');

const updateUser = require('./model-user-update');

const emitError = require('./emit-error');
const getResponseOk = require('./get-response-ok');
const getResponseError = require('./get-response-error');

async function HandleSetLogin(ctx) {
  const { request, response } = ctx;
  const requestBody = request.body;

  try {
    // Find user by id
    const userId = requestBody.id;
    const updateParams = { is_logged_in: true };

    const resUpdatedUser = await updateUser(userId, updateParams);

    // Is user exist?
    if (isEmpty(resUpdatedUser)) {
      const errMsg = 'Can\'t find user';
      return response.body = getResponseError({ message: errMsg });
    }

    // Good to go
    const data = resUpdatedUser;

    const okProps = {
      data, responseDB: resUpdatedUser,
    };

    return response.body = getResponseOk(okProps);
  } catch (error) {
    emitError({ error, ctx });
  }
}

module.exports = HandleSetLogin;

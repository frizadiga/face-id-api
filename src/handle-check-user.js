const { isEmpty } = require('lodash');

const findOneUser = require('./model-user-find-one');

const emitError = require('./emit-error');
const getResponseOk = require('./get-response-ok');
const getResponseError = require('./get-response-error');

const OTP_CODE = '1234';

const LOGIN_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
};

async function HandleCheckUser(ctx) {
  const { request, response } = ctx;
  const requestBody = request.body;

  try {
    // Find user by email | phone | password
    let findByParams = {};
    let loginType = '';

    const { email, phone, password, otp_code } = requestBody;

    console.log('now', { requestBody });

    if (phone) {
      findByParams = { phone };
      loginType = LOGIN_TYPE.PHONE;
    }

    if (email) {
      findByParams = { email };
      loginType = LOGIN_TYPE.EMAIL;
    }

    const resFindUser = await findOneUser(findByParams);

    // Is user exist?
    if (isEmpty(resFindUser)) {
      const errMsg = 'Can\'t find user';
      return response.body = getResponseError({ message: errMsg });
    }

    // Phone validation
    if (
      loginType === LOGIN_TYPE.PHONE
      && otp_code !== OTP_CODE
    ) {
      const errMsg = 'Incorrect otp code';
      return response.body = getResponseError({ message: errMsg });
    }

    // Email validation
    if (
      loginType === LOGIN_TYPE.EMAIL
      && resFindUser.password !== password
    ) {
      const errMsg = 'Incorrect password';
      return response.body = getResponseError({ message: errMsg });
    }

    // Good to go
    const data = resFindUser;

    const okProps = {
      data, responseDB: resFindUser,
    };

    return response.body = getResponseOk(okProps);
  } catch (error) {
    emitError({ error, ctx });
  }
}

module.exports = HandleCheckUser;

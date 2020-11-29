const fetch = require('node-fetch');
const { RESOURCE_USERS_ENDPOINT } = require('./config');

async function createUser(params = {}) {
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' },
  };

  const responseDB = await (await fetch(RESOURCE_USERS_ENDPOINT, fetchOptions)).json();

  return responseDB || {};
}

module.exports = createUser;

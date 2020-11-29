const fetch = require('node-fetch');
const { RESOURCE_USERS_ENDPOINT } = require('./config');

async function updateUser(id, params = {}) {
  const fetchOptions = {
    method: 'PATCH',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' },
  };

  const FINAL_URL = `${RESOURCE_USERS_ENDPOINT}/${id}`;
  const responseDB = await (await fetch(FINAL_URL, fetchOptions)).json();

  return responseDB || {};
}

module.exports = updateUser;

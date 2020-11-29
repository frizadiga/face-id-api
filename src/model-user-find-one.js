const qs = require('querystring');
const fetch = require('node-fetch');
const { RESOURCE_USERS_ENDPOINT } = require('./config');

async function findOneUser(params = {}) {
  const FINAL_URL = `${RESOURCE_USERS_ENDPOINT}?${qs.stringify(params)}`;
  const responseDB = await (await fetch(FINAL_URL)).json();

  return responseDB?.[0] || {};
}

module.exports = findOneUser;

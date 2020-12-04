require('dotenv').config();

console.log('env', { env: process.env });

const config = {
  PORT: process.env.PORT || 5000,
  API_URL: process.env.API_URL,
  DB_URL: process.env.DB_URL || 'https://frizadiga.xyz/face-id-db',
  EXPECTED_ORIGIN: process.env.EXPECTED_ORIGIN || 'http://localhost',
  RELYING_PARTY_ID: process.env.RELYING_PARTY_ID || 'localhost',
  RELYING_PARTY_NAME: process.env.RELYING_PARTY_NAME || 'tokopedia',
  SHOW_RES_DB: process.env.SHOW_RES_DB.toLowerCase() === 'true',
  ATTESTATION_TYPE: process.env.ATTESTATION_TYPE || 'none',
};

const RESOURCE_USERS_ENDPOINT = `${config.DB_URL}/users`;

module.exports = { ...config, RESOURCE_USERS_ENDPOINT };

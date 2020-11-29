require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
  API_URL: process.env.API_URL,
  DB_URL: process.env.DB_URL || 'https://frizadiga.xyz/face-id-db',
  CHALLENGE_ID: process.env.CHALLENGE_ID || 'uuid',
  RELYING_PARTY_NAME: process.env.RELYING_PARTY_NAME || 'ACME',
};

const RESOURCE_USERS_ENDPOINT = `${config.DB_URL}/users`;

module.exports = { ...config, RESOURCE_USERS_ENDPOINT };

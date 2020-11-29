const ERROR_STRUCT = {
  status: 'error',
  error: {
    message: 'Can\'t find user by challenge',
  },
  x_res_db: null,
};

function getResponseError(params) {
  const { message, responseDB } = params;

  return {
    ...ERROR_STRUCT,
    error: {
      ...ERROR_STRUCT.error,
      message,
    },
    x_res_db: responseDB,
  };
}

module.exports = getResponseError;

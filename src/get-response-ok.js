const OK_STRUCT = {
  status: 'ok',
  data: {},
  x_res_db: null,
};

function getResponseOk(params) {
  const { data, responseDB } = params;

  return {
    ...OK_STRUCT,
    data: {
      ...data,
    },
    x_res_db: responseDB,
  };
}

module.exports = getResponseOk;

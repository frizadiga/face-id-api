function RootController(ctx) {
  const { response } = ctx;

  const payload = {
    message: 'face-id hackaton api',
    routes: [
      {
        method: 'GET',
        path: '/',
      },
      {
        method: 'POST',
        path: '/request-register',
      },
      {
        method: 'POST',
        path: '/request',
      },
      {
        method: 'POST',
        path: '/login',
      },
      {
        method: 'POST',
        path: '/login-challenge',
      },
    ],
  };

  return (response.body = payload);
}

module.exports = RootController;

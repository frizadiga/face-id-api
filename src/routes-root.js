function RootController(ctx) {
  const { response } = ctx;
  const payload = { message: 'nothing here but "/" :D' };

  return (response.body = payload);
}

module.exports = RootController;

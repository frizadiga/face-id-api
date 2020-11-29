function emitError(params) {
  const { error, ctx } = params;

  const errorStatus = error.status || 500;
  ctx.status = errorStatus;
  ctx.body = { status: errorStatus, error: { message: error.message } };
  ctx.app.emit('error', error, ctx);
}

module.exports = emitError;

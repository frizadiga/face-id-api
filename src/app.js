// Import Core App
const Koa = require('koa');

const app = new Koa();

// Import Middlewares
const body = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const { PORT } = require('./config');

// Use Middlewares
app.use(cors());
app.use(body());
app.use(router.routes());
app.use(router.allowedMethods());

const fnStart = () => {
  console.log(`App running on port: ${PORT}`);
  console.log(`Server time: ${new Date().toLocaleString()}`);
};

app.listen(PORT, fnStart);

app.on('error', (err) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
  console.error('global error handler', err);
});

process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection message:', err);
  process.exit(1);
});

const router = require('koa-router')();
const RootController = require('./routes-root');

router.get('/', RootController);

module.exports = router;

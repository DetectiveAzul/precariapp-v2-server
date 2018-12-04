const Router = require('koa-router');
const router = new Router();
const app = require('../server.js');

//Importing routers
const loginRouter = require('./loginEndPoint/loginRouter.js');

//Connection to DB
require('../db/mongoDb.js')(app);

//Index Routes

// router.get('/api/v2', async ctx => {
// 	ctx.body = {
// 		status: 'success',
// 		message: 'hello, world!'
// 	};
// });

// Re-routing
router.use(loginRouter.routes());

module.exports = router;
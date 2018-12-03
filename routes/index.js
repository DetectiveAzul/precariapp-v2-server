const Router = require('koa-router');
const router = new Router();
const app = require('../server.js');
//Importing routers

//Connection to DB
// require('./db/mongo.js')(app);

//Index Routes
router.get('/api/v2', async ctx => {
	ctx.body = {
		status: 'success',
		message: 'hello, world!'
	};
});

//Re-routing
// router.use(categoryRouter.routes());
// router.use(userRouter.routes());
// router.use(customerRouter.routes());
// router.use(ticketRouter.routes());

module.exports = router;
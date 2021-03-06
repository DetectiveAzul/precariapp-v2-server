const Router = require('koa-router');
const router = new Router();
const app = require('../server.js');

//Importing routers
const loginRouter = require('./loginEndPoint/loginRouter.js');
const ticketsRouter = require('./secureEndPoints/ticketsRouter.js');

//Connection to DB
require('../db/mongoDb.js')(app);

//Index Routes

// Re-routing
router.use(loginRouter.routes());
router.use(ticketsRouter.routes());

module.exports = router;
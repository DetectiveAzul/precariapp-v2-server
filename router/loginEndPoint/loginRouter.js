const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const router = new Router();
const ObjectID = require('mongodb').ObjectID;

const app = require('../../server.js');
const jwtKey = require('../../db/config.js').jwtKey;
const BASE_URL = '/api/v2/login';

//POST /api/v2/login
router.post(`${BASE_URL}`, async ctx => {
  try {
    const credentials = ctx.request.body.credentials;
    const adminData = await app.admins
      .find({ email: credentials.email })
      .toArray();
    if (adminData && credentials.password === adminData[0].password) {
        ctx.status = 200;
        ctx.body = {
            status: 'success',
            token: jwt.sign({ role: 'admin' }, jwtKey),
            message: `User ${adminData[0].email} successfully logged in`
        }
    } else {
        ctx.status = 404;
        ctx.body = {
            status: 'error',
            message: `Email or Password are incorrect`
        }
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = router;
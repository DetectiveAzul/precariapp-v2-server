const Router = require('koa-router');
const router = new Router();
const ObjectID = require('mongodb').ObjectID;

const app = require('../../server.js');
const BASE_URL = '/api/v2/users';

//GET /api/v1/users
router.get(`${BASE_URL}`, async ctx => {
	try {
		const userData = await app.users.find().toArray();
		ctx.status = 200;
		ctx.body = {
			status: 'success',
			message: `Got ${userData.length} entries`,
			data: userData
		};
	} catch (error) {
		ctx.status = 400;
		ctx.body = {
			status: 'error',
			message: error.message || 'Sorry, an error has occurred.'
		};
	}
});

//POST /api/v1/users
router.post(`${BASE_URL}`, async ctx => {
	try {
		await app.users.insertOne(ctx.request.body.data);
		const newEntry = await app.users.findOne(ctx.request.body.data);
		ctx.status = 200;
		ctx.body = {
			status: 'success',
			message: `Posted new entry id: ${newEntry._id}`,
			data: newEntry
		};
	} catch (error) {
		ctx.status = 400;
		ctx.body = {
			status: 'error',
			message: error.message || 'Sorry, an error has ocurred.'
		};
	}
});

//GET /api/v1/users/:index
router.get(`${BASE_URL}/:index`, async ctx => {
	try {
		const userData = await app.users.find().toArray();
		if (ctx.params.index < userData.length) {
			ctx.status = 200;
			ctx.body = {
				status: 'success',
				message: `Retrieved object id: ${userData[ctx.params.index]._id}`,
				data: userData[ctx.params.index]
			};
		} else {
			ctx.status = 404;
			ctx.body = {
				status: 'error',
				message: 'That element does not exist on the collection'
			};
		}
	} catch (error) {
		ctx.status = 400;
		ctx.body = {
			status: 'error',
			message: error.message || 'Sorry, an error has ocurred.'
		};
	}
});

//GET /api/v1/users/id/:id
router.get(`${BASE_URL}/id/:id`, async ctx => {
	try {
		const id = ctx.params.id;
		const userData = await app.users
			.find({ _id: ObjectID(id) })
			.toArray();
		if (userData) {
			ctx.status = 200;
			ctx.body = {
				status: 'success',
				message: `Retrieved object id: ${id}`,
				data: userData
			};
		} else {
			ctx.status = 404;
			ctx.body = {
				status: 'error',
				message: 'That element does not exist on the collection'
			};
		}
	} catch (error) {
		ctx.status = 400;
		ctx.body = {
			status: 'error',
			message: error.message || 'Sorry, an error has ocurred.'
		};
	}
});

//PUT /api/v1/users/id/:id
router.put(`${BASE_URL}/id/:id`, async ctx => {
	try {
		const id = ctx.params.id;
		const newInfo = ctx.request.body.data;
		await app.users.updateOne(
			{ _id: ObjectID(id)},
			{ $set: newInfo },
			{ upsert: true }
		);
		const updatedUser =  await app.users.findOne({_id: ObjectID(id)});
		ctx.status = 200;
		ctx.body = {
			status: 'success',
			message: `Updated object id ${id} successfully`,
			data: updatedUser
		};
	} catch (error) {
		ctx.status = 400;
		ctx.body = {
			status: 'error',
			message: error.message || 'Sorry, an error has ocurred.'
		};
	}
});

//DELETE /api/v1/users/id/:id
router.delete(`${BASE_URL}/id/:id`, async ctx => {
	try {
		const id = ctx.params.id;
		const entryToDelete = await app.users.findOne({ _id: ObjectID(id) });
		if (entryToDelete) {
			await app.users.deleteOne(entryToDelete);
			ctx.status = 200;
			ctx.body = {
				status: 'success',
				message: `Entry id ${id} deleted`
			};
		} else {
			ctx.status = 404;
			ctx.body = {
				status: 'error',
				message: 'That element does not exist on the collection'
			};
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
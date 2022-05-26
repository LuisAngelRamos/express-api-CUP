const express = require('express');
const router = express.Router();
const UsersService = require('./../services/user.service');
const validateHandler = require('./../middlewares/validator.handler');
const {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
} = require('./../schemas/user.schema');

const service = new UsersService();

router.get('/', async (request, response, next) => {
	try {
		const users = await service.find();
		response.send(users);
	} catch (e) {
		next(e);
	}
});

router.get(
	'/:id',
	validateHandler(getUserSchema, 'params'),
	async (request, response, next) => {
		try {
			const { id } = request.params;
			const user = await service.findOne(id);

			response.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	validateHandler(createUserSchema, 'body'),
	async (request, response, next) => {
		try {
			const body = request.body;
			const newUser = await service.create(body);

			response.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	'/:id',
	validateHandler(getUserSchema, 'params'),
	validateHandler(updateUserSchema, 'body'),
	async (request, response, next) => {
		try {
			const body = request.body;
			const { id } = request.params;
			const user = await service.update(id, body);
			response.json(user);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	validateHandler(getUserSchema, 'params'),
	async (request, response, next) => {
		try {
			const { id } = request.params;
			const user = await service.delete(id);
			response.json(user);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;

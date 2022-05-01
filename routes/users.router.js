const express = require('express');
const router = express.Router();
const UsersService = require('./../services/user.service');
const validateHandler = require('./../middlewares/validator.handler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema');


const service = new UsersService();

router.get('/',
	async(request, response) => {

		const user = service.find();
		response.send(user);
	}
);

router.get('/:id',
	validateHandler(getUserSchema, 'params'),
	async(request, response) => {
		const { id } = request.params;
		const user = service.findOne(id);

		response.status(200).json(user);
	}
);

router.post('/',
	validateHandler(createUserSchema, 'body'),
	async(request, response) => {
		const body = request.body;
		const newUser = service.create(body);

		response.status(201).json(newUser);
	}
);

router.patch('/:id',
	validateHandler(getUserSchema, 'params'),
	validateHandler(updateUserSchema, 'body'),
	async (request, response) => {
		const body = request.body;
		const { id } = request.params;
		const user = service.update(id, body);
		response.json(user);
}
);

router.delete('/:id',
	validateHandler(getUserSchema, 'params'),
	async(request, response) => {
		const { id } = request.params;
		const user = service.delete(id);
		response.json(user);
	}
);

module.exports = router;

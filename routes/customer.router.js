const express = require('express');
const router = express.Router();

const CustomerService = require('./../services/customer.service');

const validateHandler = require('./../middlewares/validator.handler');
const {
	createCustomerSchema,
	getCustomerSchema,
	updateCustomerSchema,
} = require('../schemas/customer.schema');

const service = new CustomerService();

router.get('/', async (request, response, next) => {
	try {
		const categories = await service.find();

		response.status(200).json(categories);
	} catch (err) {
		next(err);
	}
});

router.get(
	'/:id',
	validateHandler(getCustomerSchema, 'params'),
	async (request, response, next) => {
		try {
			const { id } = request.params;
			const categorie = service.findOne(id);

			response.status(200).json(categorie);
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	'/',
	validateHandler(createCustomerSchema, 'body'),
	async (request, response, next) => {
		try {
			const body = request.body;
			const categorie = await service.create(body);

			response.status(200).json(categorie);
		} catch (err) {
			next(err);
		}
	}
);

router.patch(
	'/',
	validateHandler(createCustomerSchema, 'params'),
	validateHandler(updateCustomerSchema, 'body'),
	async (request, response, next) => {
		try {
			const body = request.body;
			const { id } = request.params;
			const categorie = service.update(id, body);

			response.status(200).json(categorie);
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;

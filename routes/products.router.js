const express = require('express');
const ProductsService = require('./../services/product.service');
const validateHandler = require('./../middlewares/validator.handler');
const {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (request, response) => {
	const products = await service.find();
	response.json(products);
});

router.get('/filter', async (request, response) => {
	response.send('Filter');
});

router.get(
	'/:id',
	validateHandler(getProductSchema, 'params'),
	async (request, response, next) => {
		try {
			const { id } = request.params;
			const product = await service.findOne(id);

			response.status(200).json(product);
		} catch (e) {
			next(e);
		}
	}
);

router.post(
	'/',
	validateHandler(createProductSchema, 'body'),
	async (request, response) => {
		const body = request.body;
		const newProduct = await service.create(body);

		response.status(201).json(newProduct);
	}
);

router.patch(
	'/:id',
	validateHandler(getProductSchema, 'params'),
	validateHandler(updateProductSchema, 'body'),
	async (request, response) => {
		try {
			const body = request.body;
			const { id } = request.params;
			const product = await service.update(id, body);
			response.json(product);
		} catch (e) {
			next(e);
		}
	}
);

router.delete(
	'/:id',
	validateHandler(getProductSchema, 'params'),
	async (request, response) => {
		const { id } = request.params;
		const product = await service.delete(id);
		response.json(product);
	}
);

module.exports = router;

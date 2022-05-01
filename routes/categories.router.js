const express = require('express');
const CategoriesService = require('./../services/categorie.service');

const validateHandler = require('./../middlewares/validator.handler')
const { createCategorieSchema, updateCategorieSchema, getCategorieSchema } = require('./../schemas/categorie.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', (request, response) => {
	const categories = service.find();

	response.send(categories);
});

router.get('/:categorieId/categories/:productId', (request, response) => {
	const { categorieId } = request.params;
	const { productId } = request.params;

	const categories = service.find(categorieId, categorieId);

	response.status(200).json(categories);
});

router.get('/:id',
	validateHandler(getCategorieSchema, 'params'),
	async(request, response) => {
		const { id } = request.params;
		const categorie = service.findOne(id);

		response.status(200).json(categorie);
}
);

router.post('/',
	validateHandler(createCategorieSchema, 'body'),
	async(request, response) => {
		const body = request.body;
		const newcategorie = service.create(body);

		response.status(201).json(newcategorie);
	}
);

router.patch('/:id',
	validateHandler(getCategorieSchema, 'params'),
	validateHandler(updateCategorieSchema, 'body'),
	async(request, response) => {
		const body = request.body;
		const { id } = request.params;
		const categorie = service.update(id, body);
		response.json(categorie);
	}
);

router.delete('/:id',
	validateHandler(getCategorieSchema, 'params'),
	async(request, response) => {
		const { id } = request.params;
		const categorie = service.delete(id);
		response.json(categorie);
	}
);

module.exports = router;

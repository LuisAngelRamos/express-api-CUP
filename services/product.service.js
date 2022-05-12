const faker = require('faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

class ProductsService {

	constructor() {
		this.products = [];
		this.generate();
	}

	async generate() {
		const limit = 100;

		for (let index = 0; index < limit; index++) {
			this.products.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price(), 10),
				image: faker.image.imageUrl(),
				isBlock: faker.datatype.boolean()
			});
		}
	}

	async create(body) {
		const new_product = {
			id: faker.datatype.uuid(),
			...body
		};
		this.products.push(new_product);
		return(new_product);
	}

	async find() {
		const query = 'SELECT * FROM tasks';
		const [ data ] = await sequelize.query(query);
		return data;
	}

	async findOne(id) {
		const product = this.products.find(item => item.id === id);
		if(!product) {
			throw boom.notFound('Product not found');
		}
		if(product.isBlock) {
			throw boom.conflict('Product blocked');
		}
		return product;
	}

	async update(id, body) {
		const index = this.products.findIndex(item => item.id === id);
		if(index === -1) {
			throw boom.notFound('Product not found');
		}
		const product = this.products[index];
		this.products[index] = {
			...product,
			...body
		};

		return this.products[index];
	}

	async delete(id) {
		const index = this.products.findIndex(item => item.id === id);
		if(index === -1) {
			throw boom.notFound('Product not found');
		}
		this.products.splice(index, 1);

		return {id};
	}

}

module.exports = ProductsService;

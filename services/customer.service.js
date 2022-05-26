const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class customerService {
	async find() {
		const data = await models.Customer.findAll();
		return data;
	}

	async findOne(id) {
		const customer = await models.Customer.findByPk(id);
		if (!customer) {
			throw boom.notFound('customer not found');
		}
		return customer;
	}

	async update(id, body) {
		const customer = await this.findOne(id);
		console.log(customer);
		const customerUpdate = await models.Customer.update(body, {
			where: { id },
		});
		return customerUpdate;
	}

	async create(body) {
		const customer = await models.Customer.create(body);
		return customer;
	}

	async delete(id) {
		const customer = await this.findOne(id);
		console.log(customer);
		const customerUpdate = await models.Customer.destroy({
			where: { id },
		});
		return customerUpdate;
	}
}

module.exports = customerService;

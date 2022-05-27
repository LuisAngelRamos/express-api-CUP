const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
	async find() {
		const data = await models.User.findAll({
			include: ['customer'],
		});
		return data;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound('user not found');
		}
		return user;
	}

	async create(body) {
		const newUser = await models.User.create(body);
		return newUser;
	}

	async delete(id) {
		const user = await this.findOne(id);
		console.log(user);
		const rta = await models.User.destroy({
			where: { id },
		});

		return rta;
	}

	async update(id, body) {
		const user = await this.findOne(id);
		console.log(user);
		const rta = await models.User.update(body, {
			where: { id },
		});

		return rta;
	}
}

module.exports = UsersService;

const pool = require('../libs/postgres.pool');

class UsersService {

	constructor() {
		this.users = [];
		this.pool = pool;
		this.pool.on('error', (err) => console.error(err));
	}

	async find() {
		const query = 'SELECT * FROM tasks';
		const rta = await this.pool.query(query);
		return rta.rows;
	}

	async findOne(id) {
		return this.users.find(item => item.id === id);;
	}

	async create(body) {
		let newUser = {
			id: '1',
			...body
		};

		this.users.push(newUser);

		return newUser;
	}

	async delete(id) {
		let index = this.users.findIndex(item => item.id === id);

		if(index === -1) {
			throw new Error('Product not found');
		}

		this.users.splice(index, 1);

		return {id};
	}

	async update(id, body) {
		let index = this.users.findIndex(item => item.id === id);

		if(index === -1) {
			throw new Error('Product not found');
		}

		const user = this.users[index];

		this.users[index] = {
			...user,
			...body
		};

		return this.users[index];

	}
}

module.exports = UsersService;

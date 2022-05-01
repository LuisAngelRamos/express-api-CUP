class UsersService {

	constructor() {
		this.users = [];
	}

	find() {
		return this.users;
	}

	findOne(id) {
		return this.users.find(item => item.id === id);;
	}

	create(body) {
		let newUser = {
			id: '1',
			...body
		};

		this.users.push(newUser);

		return newUser;
	}

	delete(id) {
		let index = this.users.findIndex(item => item.id === id);

		if(index === -1) {
			throw new Error('Product not found');
		}

		this.users.splice(index, 1);

		return {id};
	}

	update(id, body) {
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

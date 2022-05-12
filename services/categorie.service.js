const pool = require('../libs/postgres.pool');

class CategoriesService {

	constructor() {
		this.categories = [];
		this.pool = pool;
		this.pool.on('error', (err) => console.error(err));
	}

	async find() {
		const query = 'SELECT * FROM tasks';
		const rta = await this.pool.query(query);
		return rta.rows;
	}

	create(body) {
		const new_categorie = {
			id: "1",
			...body
		};
		this.categories.push(new_categorie);
		return(new_categorie);
	}

	findOne(id) {
		return this.categories.find(item => item.id === id);;
	}

	update(id, body) {
		const index = this.categories.findIndex(item => item.id === id);

		if(index === -1) {
			throw new Error('Categorie not found');
		}

		let categorie = this.categories[index];
		this.categories[index] = {
			...categorie,
			...body
		};

		return this.categories[index];
	}

	delete(id) {
		const index = this.categories.findIndex(item => item.id === id);

		if(index === -1) {
			throw new Error('Categorie not found');
		}

		this.categories.slice(index, 1);

		return {id};
	}
}

module.exports = CategoriesService;

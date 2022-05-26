'use strict';
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn(CUSTOMER_TABLE, 'user');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn(CUSTOMER_TABLE, 'user');
	},
};

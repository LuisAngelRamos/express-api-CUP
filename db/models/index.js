const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize) {
	// Se incializan los modelos
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));

	// Despues de generar los modelos se generan las asociones
	Customer.associate(sequelize.models);
	User.associate(sequelize.models);
}

module.exports = setupModels;

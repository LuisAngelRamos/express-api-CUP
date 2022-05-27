const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const userId = Joi.number().integer();
const lastName = Joi.string();
const phone = Joi.string();
const email = Joi.string().email();
const password = Joi.string();

const createCustomerSchema = Joi.object({
	name: name.required(),
	lastName: lastName.required(),
	phone: phone.required(),
	user: Joi.object({
		email: email.required(),
		password: password.required(),
	}),
});
const updateCustomerSchema = Joi.object({
	name,
	userId,
	lastName,
	phone,
});

const getCustomerSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCustomerSchema,
	getCustomerSchema,
	updateCustomerSchema,
};

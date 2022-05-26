const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const userId = Joi.number().integer();
const lastName = Joi.string();
const phone = Joi.string();

const createCustomerSchema = Joi.object({
	name: name.required(),
	userId: userId.required(),
	lastName: lastName.required(),
	phone: phone.required(),
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

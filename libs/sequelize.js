const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

console.log(config);
const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log(URI);
const sequelize = new Sequelize(URI, {
	dialect: 'postgres',
	// dialect: 'mysql',
	logging: true,
});

setupModels(sequelize);

// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log(
// 			'Connection to database has been established successfully.'
// 		);
// 	})
// 	.catch((err) => {
// 		console.error('Unable to connect to database:', err);
// 	});

// sequelize.sync(); // => Esto sirve para crear las tablas que aun no existan e iniciar la conexion

module.exports = sequelize;

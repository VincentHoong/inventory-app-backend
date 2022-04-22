const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Stock = sequelize.define('stocks', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	sku: {
		type: DataTypes.STRING,
		allowNull: false
	},
	model: {
		type: DataTypes.STRING,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.DECIMAL(11, 2),
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false
	},
	soldAt: {
		type: 'TIMESTAMP',
		allowNull: true,
	},
});

module.exports = Stock;
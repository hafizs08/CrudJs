'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Transaction, { foreignKey: 'customer_id' });
  };

  return Customer;
};

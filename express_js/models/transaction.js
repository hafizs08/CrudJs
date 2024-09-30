'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'Customer' });
    Transaction.belongsTo(models.Food, { foreignKey: 'food_id', as: 'Food' });
  };

  return Transaction;
};
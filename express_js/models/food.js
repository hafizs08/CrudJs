'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    food_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  });

  Food.associate = function(models) {
    Food.hasMany(models.Transaction, { foreignKey: 'food_id' });
  };

  return Food;
};
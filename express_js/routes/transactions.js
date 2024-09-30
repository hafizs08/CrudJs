const express = require('express');
const router = express.Router();

const { Customer, Food, Transaction } = require('../models');  // Pastikan Customer, Food, dan Transaction diimpor di sini

// Get all transactions
router.get('/', async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        include: [
          {
            model: Customer,
            as: 'Customer', // Pastikan alias sesuai
            attributes: ['id', 'name', 'phone', 'address'] // Sertakan 'id'
          },
          {
            model: Food,
            as: 'Food', // Pastikan alias sesuai
            attributes: ['id', 'food_name', 'price', 'stock'] // Sertakan 'id'
          }
        ]
      });
  
      res.status(200).json({
        codeStatus: 200,
        message: "Transactions retrieved successfully",
        data: transactions
      });
    } catch (error) {
      res.status(500).json({
        codeStatus: 500,
        message: "Error retrieving transactions",
        error: error.message
      });
    }
  });

// Get transaction by ID
router.get('/:id', async (req, res) => {
  const transaction = await Transaction.findByPk(req.params.id);
  if (!transaction) {
    return res.status(404).json({
      codeStatus: 404,
      message: "Transaction not found"
    });
  }
  res.status(200).json({
    codeStatus: 200,
    message: "Transaction retrieved successfully",
    data: transaction
  });
});

// Create new transaction
router.post('/', async (req, res) => {
  const transaction = await Transaction.create(req.body);
  res.status(201).json({
    codeStatus: 201,
    message: "Transaction created successfully",
    data: transaction
  });
});

// Update transaction by ID
router.put('/:id', async (req, res) => {
  const transaction = await Transaction.findByPk(req.params.id);
  if (!transaction) {
    return res.status(404).json({
      codeStatus: 404,
      message: "Transaction not found"
    });
  }
  await transaction.update(req.body);
  res.status(200).json({
    codeStatus: 200,
    message: "Transaction updated successfully",
    data: transaction
  });
});

// Delete transaction by ID
router.delete('/:id', async (req, res) => {
  const transaction = await Transaction.findByPk(req.params.id);
  if (!transaction) {
    return res.status(404).json({
      codeStatus: 404,
      message: "Transaction not found"
    });
  }
  await transaction.destroy();
  res.status(200).json({
    codeStatus: 200,
    message: "Transaction deleted successfully"
  });
});

module.exports = router;

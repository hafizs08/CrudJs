const express = require('express');
const router = express.Router();
const { Customer } = require('../models');

// Get all customers
router.get('/', async (req, res) => {
  const customers = await Customer.findAll();
  res.status(200).json({
    codeStatus: 200,
    message: "Customers retrieved successfully",
    data: customers
  });
});

// Get customer by ID
router.get('/:id', async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({
        codeStatus: 404,
      message: "Customer not found"
    });
  }
  res.status(200).json({
    success: true,
    message: "Customer retrieved successfully",
    data: customer
  });
});

// Create customer
router.post('/', async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({
    codeStatus: 201,
    message: "Customer created successfully",
    data: customer
  });
});

// Update customer
router.put('/:id', async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({
        codeStatus: 404,
      message: "Customer not found"
    });
  }
  await customer.update(req.body);
  res.status(200).json({
    codeStatus: 200,
    message: "Customer updated successfully",
    data: customer
  });
});

// Delete customer
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) {
    return res.status(404).json({
        codeStatus: 404,
      message: "Customer not found"
    });
  }
  await customer.destroy();
  res.status(200).json({
    codeStatus: 200,
    message: "Customer deleted successfully"
  });
});

module.exports = router;

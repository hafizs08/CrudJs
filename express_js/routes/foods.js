const express = require('express');
const router = express.Router();
const { Food } = require('../models');

// Get all foods
router.get('/', async (req, res) => {
  const foods = await Food.findAll();
  res.status(200).json({
    codeStatus: 200,
    message: "Foods retrieved successfully",
    data: foods
  });
});

// Get food by ID
router.get('/:id', async (req, res) => {
  const food = await Food.findByPk(req.params.id);
  if (!food) {
    return res.status(404).json({
      codeStatus: 404,
      message: "Food not found"
    });
  }
  res.status(200).json({
    codeStatus: 200,
    message: "Food retrieved successfully",
    data: food
  });
});

// Create new food
router.post('/', async (req, res) => {
  const food = await Food.create(req.body);
  res.status(201).json({
    codeStatus: 201,
    message: "Food created successfully",
    data: food
  });
});

// Update food by ID
router.put('/:id', async (req, res) => {
  const food = await Food.findByPk(req.params.id);
  if (!food) {
    return res.status(404).json({
      codeStatus: 404,
      message: "Food not found"
    });
  }
  await food.update(req.body);
  res.status(200).json({
    codeStatus: 200,
    message: "Food updated successfully",
    data: food
  });
});

// Delete food by ID
router.delete('/:id', async (req, res) => {
  const food = await Food.findByPk(req.params.id);
  if (!food) {
    return res.status(404).json({
      codeStatus: 404,
      message: "Food not found"
    });
  }
  await food.destroy();
  res.status(200).json({
    codeStatus: 200,
    message: "Food deleted successfully"
  });
});

module.exports = router;

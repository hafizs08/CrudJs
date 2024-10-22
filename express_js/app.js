const express = require('express');
const app = express();
const cors = require('cors');
const customersRouter = require('./routes/customers');
const foodsRouter = require('./routes/foods');
const transactionsRouter = require('./routes/transactions');

// Enable CORS for all routes
app.use(cors());

// Middleware untuk menguraikan JSON
app.use(express.json());

// Gunakan router untuk rute customers, foods, dan transactions
app.use('/customers', customersRouter);
app.use('/foods', foodsRouter);
app.use('/transactions', transactionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

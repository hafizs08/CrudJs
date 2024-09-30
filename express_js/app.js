const express = require('express');
const app = express();
const customersRouter = require('./routes/customers');
const foodsRouter = require('./routes/foods');
const transactionsRouter = require('./routes/transactions');

app.use(express.json());

app.use('/customers', customersRouter);
app.use('/foods', foodsRouter);
app.use('/transactions', transactionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getTransactions = () => api.get('/transactions');
export const createTransaction = (data) => api.post('/transactions', data);
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);


// Foods API
export const createFood = (data) => api.post('/foods', data);
export const updateFood = (id, data) => api.put(`/foods/${id}`, data);
export const deleteFood = (id) => api.delete(`/foods/${id}`);
export const getFoods = () => api.get('/foods');

// Customers API
export const createCustomer = (data) => api.post('/customers', data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);
export const getCustomers = () => api.get('/customers');
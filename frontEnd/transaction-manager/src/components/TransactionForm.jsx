import { useEffect, useState } from 'react';
import { createTransaction, getCustomers, getFoods } from '../api';

function TransactionForm({ refreshData }) {
  const [customers, setCustomers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({ customer_id: '', food_id: '', qty: 1,total_price: '', transaction_date: '' });

  useEffect(() => {
    getCustomers().then(response => setCustomers(response.data.data));
    getFoods().then(response => setFoods(response.data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTransaction(formData);
    refreshData();
    setFormData({ customer_id: '', food_id: '', qty: 1,total_price: '', transaction_date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Customer</label>
        <select className="form-select" value={formData.customer_id} onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}>
          <option value="">Select Customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Food</label>
        <select className="form-select" value={formData.food_id} onChange={(e) => setFormData({ ...formData, food_id: e.target.value })}>
          <option value="">Select Food</option>
          {foods.map(food => (
            <option key={food.id} value={food.id}>{food.food_name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Quantity</label>
        <input type="number" className="form-control" value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: e.target.value })} />
      </div><div className="mb-3">
        <label>total price</label>
        <input type="number" className="form-control" value={formData.total_price} onChange={(e) => setFormData({ ...formData, total_price: e.target.value })} />
      </div>
      <div className="mb-3">
        <label>Date</label>
        <input type="date" className="form-control" value={formData.transaction_date} onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })} />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default TransactionForm;

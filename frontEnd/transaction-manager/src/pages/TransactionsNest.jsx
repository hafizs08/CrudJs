import { useEffect, useState } from 'react';
import { createTransaction, deleteTransaction, getCustomers, getFoods, getTransactions, updateTransaction } from '../ApiNest';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({ customer: '', food: '', qty: '', total_price: '', transaction_date: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch transactions, customers, and foods data
  const refreshData = () => {
    getTransactions().then(response => setTransactions(response.data));
    getCustomers().then(response => setCustomers(response.data));
    getFoods().then(response => setFoods(response.data));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateTransaction(editingId, formData);
    } else {
      await createTransaction(formData);
    }
    refreshData();
    setFormData({ customer: '', food: '', qty: '', total_price: '', transaction_date: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (transaction) => {
    setFormData({
      customer: transaction.customer ? transaction.customer.customer_id : '',
      food: transaction.food ? transaction.food.food_id : '',
      qty: transaction.qty || '',
      total_price: transaction.total_price || '',
      transaction_date: transaction.transaction_date ? transaction.transaction_date.split('T')[0] : '' // Format the date for the form
    });
    setEditingId(transaction.transaction_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    refreshData();
  };

  const handleAdd = () => {
    setFormData({ customer: '', food: '', qty: '', total_price: '', transaction_date: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h2>Manage Transactions</h2>

      {!showForm && (
        <button className="btn btn-success mb-3" onClick={handleAdd}>
          Add Transaction
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label>Customer</label>
            <select className="form-select" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} required>
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.customer_id} value={customer.customer_id}>{customer.name || 'Unknown'}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Food</label>
            <select className="form-select" value={formData.food} onChange={(e) => setFormData({ ...formData, food: e.target.value })} required>
              <option value="">Select Food</option>
              {foods.map(food => (
                <option key={food.food_id} value={food.food_id}>{food.food_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Quantity</label>
            <input type="number" className="form-control" value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label>Total Price</label>
            <input type="number" className="form-control" value={formData.total_price} onChange={(e) => setFormData({ ...formData, total_price: e.target.value })} />
          </div>
          <div className="mb-3">
            <label>Transaction Date</label>
            <input type="date" className="form-control" value={formData.transaction_date} onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update' : 'Add'} Transaction
          </button>
          <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}

      {!showForm && (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Food</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.transaction_id}>
                <td>{index + 1}</td>
                <td>{transaction.customer ? transaction.customer.name : 'Unknown'}</td>
                <td>{transaction.food ? transaction.food.food_name : 'Unknown'}</td>
                <td>{transaction.qty || 'N/A'}</td>
                <td>{transaction.total_price || 'N/A'}</td>
                <td>{transaction.transaction_date ? transaction.transaction_date.split('T')[0] : 'N/A'}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(transaction)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(transaction.transaction_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transactions;

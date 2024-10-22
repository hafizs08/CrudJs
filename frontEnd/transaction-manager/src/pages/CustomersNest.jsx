import { useEffect, useState } from 'react';
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '../ApiNest';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const refreshData = () => {
    getCustomers().then(response => setCustomers(response.data));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCustomer(editingId, formData);
    } else {
      await createCustomer(formData);
    }
    refreshData();
    setFormData({ name: '', phone: '', address: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (customer) => {
    setFormData({ name: customer.name, phone: customer.phone, address: customer.address });
    setEditingId(customer.customer_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    refreshData();
  };

  const handleAdd = () => {
    setFormData({ name: '', phone: '', address: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h2>Manage Customers</h2>
      {!showForm && (
        <button className="btn btn-success mb-3" onClick={handleAdd}>
          Add Customer
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label>Customer Name</label>
            <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input type="text" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input type="text" className="form-control" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update' : 'Add'} Customer
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
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.customer_id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(customer)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(customer.customer_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customers;

import { useEffect, useState } from 'react';
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '../Api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);  // State untuk mengontrol visibilitas form

  const refreshData = () => {
    getCustomers().then(response => setCustomers(response.data.data));
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
    setShowForm(false);  // Tutup form setelah submit
  };

  const handleEdit = (customer) => {
    setFormData({ 
      name: customer.name || '',  // Mengatasi nilai null dengan default ''
      phone: customer.phone || '', 
      address: customer.address || '' 
    });
    setEditingId(customer.id);
    setShowForm(true);  // Buka form ketika mengedit
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    refreshData();
  };

  const handleAdd = () => {
    setFormData({ name: '', phone: '', address: '' });
    setEditingId(null);
    setShowForm(true);  // Buka form untuk menambah data baru
  };

  const handleCancel = () => {
    setShowForm(false);  // Tutup form ketika klik Cancel
  };

  return (
    <div>
      <h2>Manage Customers</h2>

      {!showForm && (  // Tombol Add muncul jika form tidak sedang tampil
        <button className="btn btn-success mb-3" onClick={handleAdd}>
          Add Customer
        </button>
      )}

      {showForm && (  // Form hanya muncul ketika showForm true
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

      {/* Tabel hanya muncul ketika form tidak ditampilkan */}
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
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>{customer.name || '-'}</td> {/* Tampilkan '-' jika name null */}
                <td>{customer.phone || '-'}</td> {/* Tampilkan '-' jika phone null */}
                <td>{customer.address || '-'}</td> {/* Tampilkan '-' jika address null */}
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(customer)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(customer.id)}>Delete</button>
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

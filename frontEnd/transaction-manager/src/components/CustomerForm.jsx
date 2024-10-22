import { useState } from 'react';
import { createCustomer, updateCustomer } from '../api';

function CustomerForm({ editingCustomer, refreshData }) {
  const [formData, setFormData] = useState(
    editingCustomer || { name: '', phone: '', address: '' }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, formData);
    } else {
      await createCustomer(formData);
    }
    refreshData();
    setFormData({ name: '', phone: '', address: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editingCustomer ? 'Update' : 'Add'} Customer
      </button>
    </form>
  );
}

export default CustomerForm;

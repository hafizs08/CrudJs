import { useEffect, useState } from 'react';
import { createFood, deleteFood, getFoods, updateFood } from '../Api';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({ food_name: '', price: '', stock: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);  // State untuk mengontrol visibilitas form

  const refreshData = () => {
    getFoods().then(response => setFoods(response.data.data));
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateFood(editingId, formData);
    } else {
      await createFood(formData);
    }
    refreshData();
    setFormData({ food_name: '', price: '', stock: '' });
    setEditingId(null);
    setShowForm(false);  // Tutup form setelah submit
  };

  const handleEdit = (food) => {
    setFormData({ food_name: food.food_name, price: food.price, stock: food.stock });
    setEditingId(food.id);
    setShowForm(true);  // Buka form ketika mengedit
  };

  const handleDelete = async (id) => {
    await deleteFood(id);
    refreshData();
  };

  const handleAdd = () => {
    setFormData({ food_name: '', price: '', stock: '' });
    setEditingId(null);
    setShowForm(true);  // Buka form untuk menambah data baru
  };

  const handleCancel = () => {
    setShowForm(false);  // Tutup form ketika klik Cancel
  };

  return (
    <div>
      <h2>Manage Foods</h2>

      {!showForm && (  // Tombol Add muncul jika form tidak sedang tampil
        <button className="btn btn-success mb-3" onClick={handleAdd}>
          Add Food
        </button>
      )}

      {showForm && (  // Form hanya muncul ketika showForm true
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label>Food Name</label>
            <input type="text" className="form-control" value={formData.food_name} onChange={(e) => setFormData({ ...formData, food_name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input type="number" className="form-control" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label>Stock</label>
            <input type="number" className="form-control" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update' : 'Add'} Food
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
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={food.id}>
                <td>{index + 1}</td>
                <td>{food.food_name}</td>
                <td>{food.price}</td>
                <td>{food.stock}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(food)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(food.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Foods;

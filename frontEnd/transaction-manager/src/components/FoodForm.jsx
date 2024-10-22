import { useEffect, useState } from 'react';
import { createFood, updateFood } from '../api';

function FoodForm({ editingFood, refreshData }) {
  const [formData, setFormData] = useState(
    editingFood || { food_name: '', price: '', stock: '' }
  );

  useEffect(() => {
    if (editingFood) {
      setFormData(editingFood);
    }
  }, [editingFood]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingFood) {
      await updateFood(editingFood.id, formData);
    } else {
      await createFood(formData);
    }
    refreshData();
    setFormData({ food_name: '', price: '', stock: '' });
  };

  return (
    <div>
      <h2>Manage Foods</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label>Food Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.food_name}
            onChange={(e) => setFormData({ ...formData, food_name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Stock</label>
          <input
            type="number"
            className="form-control"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingFood ? 'Update' : 'Add'} Food
        </button>
      </form>
    </div>
  );
}

export default FoodForm;

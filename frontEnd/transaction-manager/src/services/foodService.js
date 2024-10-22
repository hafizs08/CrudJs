// src/services/foodService.js
export const getFoods = async () => {
    const response = await fetch('http://localhost:3000/foods'); // Ganti dengan URL API Anda
    const result = await response.json();
    return result.data;
  };
  
  export const createFood = async (food) => {
    const response = await fetch('http://localhost:3000/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(food),
    });
    const result = await response.json();
    return result.data;
  };
  
  export const deleteFood = async (id) => {
    await fetch(`http://localhost:3000/foods/${id}`, {
      method: 'DELETE',
    });
  };
  
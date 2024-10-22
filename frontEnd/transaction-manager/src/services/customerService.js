// src/services/customerService.js
export const getCustomers = async () => {
    const response = await fetch('http://localhost:3000/customers'); // Ganti dengan URL API Anda
    const result = await response.json();
    return result.data;
  };
  
  export const createCustomer = async (customer) => {
    const response = await fetch('http://localhost:3000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    const result = await response.json();
    return result.data;
  };
  
  export const deleteCustomer = async (id) => {
    await fetch(`http://localhost:3000/customers/${id}`, {
      method: 'DELETE',
    });
  };
  
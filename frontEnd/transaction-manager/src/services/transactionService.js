// src/services/transactionService.js
export const getTransactions = async () => {
    const response = await fetch('http://localhost:3000/transactions'); // Ganti dengan URL API Anda
    const result = await response.json();
    return result.data;
  };
  
  export const createTransaction = async (transaction) => {
    const response = await fetch('http://localhost:3000/transactionss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    const result = await response.json();
    return result.data;
  };
  
  export const deleteTransaction = async (id) => {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'DELETE',
    });
  };
  
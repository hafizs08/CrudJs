import { useEffect, useState } from 'react';
import { deleteTransaction, getTransactions } from '../api';

function TransactionList({ refreshData }) {
  const [transactions, setTransactions] = useState([]);

  const refreshTransactionData = () => {
    getTransactions().then(response => setTransactions(response.data.data));
  };

  useEffect(() => {
    refreshTransactionData();
  }, [refreshData]);

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    refreshTransactionData();
  };

  return (
    <div>
      <h3>Transaction List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.customer_name}</td>
              <td>{transaction.food_name}</td>
              <td>{transaction.qty}</td>
              <td>{transaction.transaction_date}</td>
              <td>{transaction.total_price}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
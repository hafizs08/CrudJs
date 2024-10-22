import { deleteTransaction } from '../api';

function TransactionItem({ transaction, index, refreshData }) {
  const handleDelete = async () => {
    await deleteTransaction(transaction.id);
    refreshData();
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{transaction.Customer.name}</td>
      <td>{transaction.Food.food_name}</td>
      <td>{transaction.qty}</td>
      <td>{transaction.total_price}</td>
      <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default TransactionItem;

import { useEffect, useState } from 'react';
import { getCustomers } from '../api';
import CustomerForm from './CustomerForm';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const refreshData = () => {
    getCustomers().then(response => setCustomers(response.data.data));
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div>
      <CustomerForm customerData={selectedCustomer} refreshData={refreshData} onClose={() => setSelectedCustomer(null)} />
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.name} - {customer.address}
            <button onClick={() => setSelectedCustomer(customer)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;

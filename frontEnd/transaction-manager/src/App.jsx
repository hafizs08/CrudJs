import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Customers from './pages/Customers';
import CustomersN from './pages/CustomersNest';
import Foods from './pages/Foods';
import FoodsN from './pages/FoodsNest';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import TransactionsN from './pages/TransactionsNest';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers-nest" element={<CustomersN />} />
        <Route path="/foods-nest" element={<FoodsN />} />
        <Route path="/transactions-nest" element={<TransactionsN />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

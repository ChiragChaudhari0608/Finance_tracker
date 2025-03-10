import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { transactions } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction._id}>
            {transaction.text}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

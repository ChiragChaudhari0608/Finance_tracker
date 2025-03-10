import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import TransactionItem from '../TransactionItem/TransactionItem';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Transactions() {
  const { transactions, getTransactions, deleteTransaction } = useGlobalContext();
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    getTransactions();
  }, []);

  const filterByDate = (transactions) => {
    const now = new Date();
    switch (dateFilter) {
      case 'last-day':
        return transactions.filter(transaction => new Date(transaction.date) >= new Date(now.setDate(now.getDate() - 1)));
      case 'last-week':
        return transactions.filter(transaction => new Date(transaction.date) >= new Date(now.setDate(now.getDate() - 7)));
      case 'last-month':
        return transactions.filter(transaction => new Date(transaction.date) >= new Date(now.setMonth(now.getMonth() - 1)));
      case 'selected-month':
        if (selectedMonth) {
          const startOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
          const endOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
          return transactions.filter(transaction => new Date(transaction.date) >= startOfMonth && new Date(transaction.date) <= endOfMonth);
        }
        return transactions;
      default:
        return transactions;
    }
  };

  const filteredTransactions = filterByDate(transactions).filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  }).sort((a, b) => sortOrder === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)); // Sort transactions by date based on sortOrder

  return (
    <TransactionsStyled>
      <InnerLayout>
        <div className="header">
          <h1>Transactions</h1>
          <div className="filter-container">
            <label htmlFor="filter">Type:</label>
            <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <label htmlFor="dateFilter">Date:</label>
            <select id="dateFilter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="last-day">Last Day</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="selected-month">Selected Month</option>
            </select>
            {dateFilter === 'selected-month' && (
              <DatePicker
                selected={selectedMonth}
                onChange={(date) => setSelectedMonth(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Select Month"
              />
            )}
            <label htmlFor="sortOrder">Sort by:</label>
            <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="transactions">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionItem
                key={transaction._id}
                id={transaction._id}
                title={transaction.text}
                amount={`${transaction.amount}`}
                date={transaction.date}
                category={transaction.category}
                description={transaction.description}
                type={transaction.type} // Ensure the type is passed correctly
                deleteItem={deleteTransaction}
              />
            ))
          ) : (
            <p>No transactions to display</p>
          )}
        </div>
      </InnerLayout>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  width: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    h1 {
      margin: 0;
      color: ${props => props.theme.color};
    }
    .filter-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      label {
        font-size: 1rem;
        color: ${props => props.theme.color};
      }
      select, .react-datepicker-wrapper {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid ${props => props.theme.cardBorder};
        background: ${props => props.theme.cardBackground};
        color: ${props => props.theme.color};
      }
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 1.5rem;
    width: 100%; /* Ensure the transactions section spans the entire width */
    max-height: 77vh; /* Adjust as needed */
    overflow-y: auto; /* Add vertical scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }
  }
`;

export default Transactions;

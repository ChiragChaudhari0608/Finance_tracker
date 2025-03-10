import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';
import TransactionItem from '../TransactionItem/TransactionItem';

function Dashboard() {
    const { transactions, fetchTransactions } = useContext(AuthContext);
    const { getIncomes, getExpenses, deleteTransaction, totalIncome, totalExpenses, totalBalance } = useGlobalContext();

    useEffect(() => {
        fetchTransactions();
        getIncomes();
        getExpenses();
    }, []);

    const minIncome = () => {
        const incomes = transactions.filter(transaction => transaction.type === 'income').map(item => item.amount);
        if (incomes.length === 0) return 0;
        const minIncomeValue = Math.min(...incomes);
        console.log('Min Income:', minIncomeValue); // Add logging
        return minIncomeValue;
    };

    const maxIncome = () => {
        const incomes = transactions.filter(transaction => transaction.type === 'income').map(item => item.amount);
        if (incomes.length === 0) return 0;
        const maxIncomeValue = Math.max(...incomes);
        console.log('Max Income:', maxIncomeValue); // Add logging
        return maxIncomeValue;
    };

    const minExpense = () => {
        const expenses = transactions.filter(transaction => transaction.type === 'expense').map(item => item.amount);
        if (expenses.length === 0) return 0;
        const minExpenseValue = Math.min(...expenses);
        console.log('Min Expense:', minExpenseValue); // Add logging
        return minExpenseValue;
    };

    const maxExpense = () => {
        const expenses = transactions.filter(transaction => transaction.type === 'expense').map(item => item.amount);
        if (expenses.length === 0) return 0;
        const maxExpenseValue = Math.max(...expenses);
        console.log('Max Expense:', maxExpenseValue); // Add logging
        return maxExpenseValue;
    };

    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="header">
                    <h1>All Transactions</h1>
                    <h2>Recent Transactions</h2>
                </div>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p className="income-amount">
                                    ₹{totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p className="expense-amount">
                                    ₹{totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p className="balance-amount">
                                    ₹{totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <div className="transactions">
                            {transactions
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 3) // Show only the most recent three transactions
                                .map((transaction) => (
                                    <div key={transaction._id} className="transaction-item">
                                        <h3>{transaction.text}</h3>
                                        <p className={transaction.type === 'income' ? 'income' : 'expense'}>
                                            {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                                        </p>
                                    </div>
                                ))}
                        </div>
                        <h2 className="salary-title">Min <span>Income</span>Max</h2>
                        <div className="salary-item">
                            <p className="min-income">
                                ₹{minIncome()}
                            </p>
                            <p className="max-income">
                                ₹{maxIncome()}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p className="min-expense">
                                ₹{minExpense()}
                            </p>
                            <p className="max-expense">
                                ₹{maxExpense()}
                            </p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
  gap:0.5rem;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15rem;
    h1, h2 {
      margin: 0;
      color: ${props => props.theme.mode === 'dark' ? '#fff' : props.theme.color}; /* White color in dark mode */
    }
  }
  .stats-con{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4rem;
    .chart-con{
      grid-column: 1 / 4;
      height: 400px;
      .amount-con{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 1rem;
        .income, .expense{
          grid-column: span 2;
        }
        .income, .expense, .balance{
          display: flex;
          flex-direction: column;
          justify-content: centre;
          align-items: center;
          background: ${props => props.theme.cardBackground};
          border: 2px solid ${props => props.theme.cardBorder};
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 0.5rem;
          p{
            font-size: 2rem;
            font-weight: 500;
          }
        }

        .income-amount {
          color: ${props => props.theme.incomeColor}; /* Green for total income */
        }

        .expense-amount {
          color: ${props => props.theme.expenseColor}; /* Red for total expense */
        }

        .balance-amount {
          color: ${props => props.theme.balanceColor}; /* Blue for total balance */
        }

        .balance{
          grid-column: span 4; /* Ensure the balance spans across all columns */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p{
            opacity: 0.6;
            font-size: 2rem;
          }
        }
      }
    }

    .history-con{
      width: 24vw;
      grid-column: 4 / -1;
      margin-top: 0; /* Align with All Transactions heading */
      .transactions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
        .transaction-item {
          display: flex;
          justify-content: space-between;
          background: ${props => props.theme.cardBackground};
          border: 2px solid ${props => props.theme.cardBorder};
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          h3 {
            font-size: 1.2rem;
            color: ${props => props.theme.mode === 'dark' ? '#fff' : props.theme.color}; /* White color in dark mode */
          }
          p {
            font-size: 1rem;
            font-weight: bold;
          }
          .income {
            color: green;
          }
          .expense {
            color: red;
          }
        }
      }
      .salary-title{
        font-size: 1.2rem;justify-content: space-between;
        align-items: center;
        display: flex;
        span{
          font-size: 1.8rem;
        }
      }
      .salary-item{
        background: ${props => props.theme.cardBackground};
        border: 2px solid ${props => props.theme.cardBorder};
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
          font-weight: 600;
          font-size: 1.6rem;
          color: ${props => props.theme.mode === 'dark' ? '#fff' : props.theme.color}; /* White color for min/max income/expense in dark mode */
        }
      }
    }
  }
  @media (max-width: 1024px) {
    .stats-con {
      grid-template-columns: 1fr;
      .chart-con {
        grid-column: 1 / -1;
        .amount-con {
          grid-template-columns: 1fr;
          .income, .expense, .balance {
            grid-column: span 1;
          }
        }
      }
      .history-con {
        grid-column: 1 / -1;
      }
    }
  }
`;

export default Dashboard;
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import ExpenseItem from '../ExpenseItem/ExpenseItem';

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1 className="title">Expenses</h1>
        <h2 className="total-expenses">Total Expenses: <span>₹{totalExpenses()}</span></h2>
        <div className="expenses-content">
          <div className="form-container">
            <Form type="expense" />
          </div>
          <div className="expenses">
            {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map((expense) => (
              <ExpenseItem
                key={expense._id}
                id={expense._id}
                title={expense.text}
                amount={expense.amount}
                date={expense.date}
                description={expense.description}
                deleteItem={deleteExpense}
              />
            ))}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
}

const ExpensesStyled = styled.div`
  display: flex;
  flex-direction: column; /* Ensure the content is stacked vertically */
  width: 100%;
  height: 100vh; /* Ensure the component takes up the full height of the viewport */
  overflow: hidden; /* Prevent scrolling */
  .bimyGK {
    padding: 0.5rem 1.5rem;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0rem;
  }
  .jriFEe { /*heading*/
    padding: 0rem 1.5rem;
    width: 100%;
  }
  .cMxXyM {
    padding: 2rem 1.5rem;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0rem;
  }
  .total-expenses {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 0.5rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: .5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: #FF6F61; /* Lighter shade of red */
    }
  }
  .expenses-content {
    display: flex;
    gap: 2rem;
    flex: 1; /* Ensure the content takes up the remaining space */
    overflow-y: auto; /* Add vertical scrolling for the content */
    .expenses {
      flex: 1;
      overflow-y: auto;
      max-height: 70vh; /* Adjust as needed */
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
  }
  .expenses {
    height: 95%;
    padding: 0 1rem;
  }
  .cgxihZ {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .title, .total-expenses {
    color: ${props => props.theme.mode === 'dark' ? '#fff' : '#222260'}; /* White color in dark mode */
  }
`;

export default Expenses;
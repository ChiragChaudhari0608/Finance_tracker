import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { trash, calender, bitcoin, book, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, tv, users, yt } from '../../utils/Icons';
import Tooltip from '../Tooltip/Tooltip';

function TransactionItem({ id, title, amount, date, category, description, type, deleteItem }) {
  const categoryIcon = () => {
    switch (category) {
      case 'salary':
        return money;
      case 'freelancing':
        return freelance;
      case 'investments':
        return stocks;
      case 'stocks':
        return users;
      case 'bitcoin':
        return bitcoin;
      case 'bank':
        return card;
      case 'youtube':
        return yt;
      case 'education':
        return book;
      case 'groceries':
        return food;
      case 'health':
        return medical;
      case 'subscriptions':
        return tv;
      case 'takeaways':
        return takeaway;
      case 'clothing':
        return clothing;
      case 'travelling':
        return freelance;
      case 'other':
        return piggy;
      default:
        return circle;
    }
  };

  const handleDelete = () => {
    if(window.confirm(`Are you sure you want to delete this ${type}?`)) {
      deleteItem(id);
    }
  };

  return (
    <TransactionItemStyled type={type}>
      <div className="icon">
        {categoryIcon()}
      </div>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="amount">
        <p className={type === 'income' ? 'income' : 'expense'}>
          {type === 'income' ? '+' : '-'}₹{amount}
        </p>
      </div>
      <div className="date">
        <p>{calender} {format(new Date(date), 'dd/MM/yyyy')}</p>
      </div>
      <div className="description-icon">
        {description && (
          <Tooltip 
            icon={comment} 
            content={description} 
          />
        )}
      </div>
      <div className="actions">
        <button onClick={handleDelete}>{trash}</button>
      </div>
    </TransactionItemStyled>
  );
}

const TransactionItemStyled = styled.div`
  display: grid;
  grid-template-columns: 80px 20% 5% 15% 20% 5% auto;
  align-items: center;
  background: var(--card-background);
  border: 2px solid var(--card-border);
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 20px;
    background: var(--card-background);
    border: 2px solid var(--card-border);
    font-size: 1.5rem;
    color: var(--text-color);
  }
  
  .title h3 {
    font-size: 1.2rem;
    color: var(--text-color);
    position: relative;
    padding-left: 1.5rem;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: .8rem;
      height: .8rem;
      border-radius: 50%;
      background: ${props => (props.type === 'income' ? 'var(--color-green)' : 'var(--color-red)')};
    }
  }
  
  .amount {
    grid-column: 4;
    
    p {
      font-weight: bold;
      color: ${props => props.type === 'income' ? 'var(--color-green)' : 'var(--color-red)'};
    }
  }
  
  .date {
    grid-column: 5;
    display: flex;
    align-items: center;
    
    p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-color-secondary);
    }
  }
  
  .description-icon {
    grid-column: 6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    
    svg {
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0.8;
      
      &:hover {
        opacity: 1;
      }
    }
  }
  
  .actions {
    grid-column: 7;
    display: flex;
    justify-content: flex-end;
    
    button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-color);
      font-size: 1.2rem;
      opacity: 0.8;
      
      &:hover {
        opacity: 1;
        color: var(--color-delete);
      }
    }
  }
`;

export default TransactionItem;

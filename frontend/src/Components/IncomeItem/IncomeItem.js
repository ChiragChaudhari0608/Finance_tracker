import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
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
            case 'other':
                return piggy;
            default:
                return circle;
        }
    }

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this income?')) {
            deleteItem(id);
        }
    }

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {categoryIcon()}
            </div>
            <div className="title">
                <h5>{title}</h5>
            </div>
            <div className="amount">
                <p>₹{amount}</p>
            </div>
            <div className="date">
                <p>{calender} {dateFormat(date)}</p>
            </div>
            <div className="description">
                {description && (
                    <Tooltip 
                        icon={comment} 
                        content={description} 
                    />
                )}
            </div>
            <div className="btn-con">
                <Button 
                    icon={trash}
                    bPad={'1rem'}
                    bRad={'50%'}
                    bg={'var(--primary-color'}
                    color={'#fff'}
                    iColor={'#fff'}
                    hColor={'var(--color-green)'}
                    onClick={handleDelete}
                />
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    display: grid;
    grid-template-columns: 80px 20% 5% 15% 20% 5% auto;
    align-items: center;
    background: var(--card-background);
    border: 2px solid var(--card-border);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    
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

    .title h5 {
        font-size: 1.3rem;
        padding-left: 2rem;
        position: relative;
        color: var(--text-color);
        
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            background: ${props => props.indicator};
        }
    }
    
    .amount {
        grid-column: 4; /* Explicitly set column position */
        
        p {
            font-weight: bold;
            color: var(--text-color);
        }
    }
    
    .date {
        grid-column: 5; /* Explicitly set column position */
        display: flex;
        align-items: center;
        
        p {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-color-secondary);
        }
    }
    
    .description {
        grid-column: 6; /* Explicitly set column position */
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
    
    .btn-con {
        grid-column: 7; /* Explicitly set column position */
        display: flex;
        justify-content: flex-end;
    }
`;

export default IncomeItem
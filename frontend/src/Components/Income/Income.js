import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()

    useEffect(() => {
        getIncomes()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1 className="title">Incomes</h1>
                <h2 className="total-income">Total Income: <span>₹{totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form type="income" />
                    </div>
                    <div className="incomes">
                        {incomes.sort((a, b) => new Date(b.date) - new Date(a.date)).map((income) => {
                            const { _id, text, amount, date, category, description, type } = income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={text}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column; /* Ensure the content is stacked vertically */
    width: 100%;
    height: 100vh; /* Ensure the component takes up the full height of the viewport */
    gap: 0rem;
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
    .total-income{
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
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        flex: 1; /* Ensure the content takes up the remaining space */
        overflow-y: auto; /* Add vertical scrolling for the content */
        .incomes{
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
    .incomes {
        height:95%;
        padding: 0 1rem;
    }
    
    .cgxihZ {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .title, .total-income {
        color: ${props => props.theme.mode === 'dark' ? '#fff' : '#222260'}; /* White color in dark mode */
    }
`;

export default Income
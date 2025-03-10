import React, { useContext } from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'
import { ThemeContext } from '../../context/ThemeContext';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

const Chart = () => {
    const { incomes, expenses } = useGlobalContext();
    const { theme } = useContext(ThemeContext);

    // Sort incomes and expenses by date
    const sortedIncomes = [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = {
        labels: sortedIncomes.map((inc) => {
            const { date } = inc;
            return dateFormat(date);
        }),
        datasets: [
            {
                label: 'Income',
                data: sortedIncomes.map((income) => {
                    const { amount } = income;
                    return amount;
                }),
                backgroundColor: theme === 'light' ? '#42AD00' : '#42AD00', // Green for both themes
                borderColor: theme === 'light' ? '#42AD00' : '#42AD00', // Green for both themes
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: sortedExpenses.map((expense) => {
                    const { amount } = expense;
                    return amount;
                }),
                backgroundColor: theme === 'light' ? '#dc3545' : '#FF6F61',
                borderColor: theme === 'light' ? '#dc3545' : '#FF6F61',
                tension: 0.2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: theme === 'light' ? '#222260' : '#f0f2f5',
                },
            },
            x: {
                ticks: {
                    color: theme === 'light' ? '#222260' : '#f0f2f5',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: theme === 'light' ? '#222260' : '#f0f2f5',
                },
            },
        },
    };

    return (
        <ChartStyled theme={theme}>
            <Line data={data} options={options} />
        </ChartStyled>
    );
};

const ChartStyled = styled.div`
    background: ${props => props.theme === 'light' ? '#FCF6F9' : '#2e2e2e'};
    border: 2px solid ${props => props.theme === 'light' ? '#FFFFFF' : '#444444'};
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 70%;
`;

export default Chart;
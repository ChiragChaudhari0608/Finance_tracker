import { dashboard, dollar, expenses, transactions } from './Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        path: '/dashboard'
    },
    {
        id: 2,
        title: 'Income',
        icon: dollar,
        path: '/income'
    },
    {
        id: 3,
        title: 'Expense',
        icon: expenses,
        path: '/expenses'
    },
    {
        id: 4,
        title: 'Transactions',
        icon: transactions,
        path: '/transactions'
    }
];
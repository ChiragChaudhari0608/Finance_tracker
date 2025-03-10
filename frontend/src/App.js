import React, { useMemo, useContext, useState } from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import Transactions from './Components/Transactions/Transactions';
import { useGlobalContext } from './context/globalContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Login from './Components/login';
import Register from './Components/register';
import PrivateRoute from './Components/PrivateRoute';
import ErrorBoundary from './Components/ErrorBoundary';

const lightTheme = {
  background: '#f0f2f5',
  color: '#222260',
  cardBackground: '#FCF6F9',
  cardBorder: '#FFFFFF',
  chartBackground: '#FFFFFF',
  chartBorder: '#222260',
  incomeColor: '#42AD00', // Green for total income
  expenseColor: '#dc3545', // Red for total expense
  balanceColor: '#007bff', // Blue for total balance
};

const darkTheme = {
  background: '#1e1e1e',
  color: '#f0f2f5',
  cardBackground: '#2e2e2e',
  cardBorder: '#444444',
  chartBackground: '#2e2e2e',
  chartBorder: '#f0f2f5',
  incomeColor: '#42AD00', // Green for total income
  expenseColor: '#FF6F61', // Red for total expense
  balanceColor: '#007bff', // Blue for total balance
};

function App() {
  const { theme } = useContext(ThemeContext);
  const [active, setActive] = useState(1); // Define the active state

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <AuthProvider>
          <AppStyled bg={bg} className="App">
            {orbMemo}
            <ErrorBoundary>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<MainLayout><Navigation active={active} setActive={setActive} /><Dashboard /></MainLayout>} />
                  <Route path="/dashboard" element={<MainLayout><Navigation active={active} setActive={setActive} /><Dashboard /></MainLayout>} />
                  <Route path="/income" element={<MainLayout><Navigation active={active} setActive={setActive} /><Income /></MainLayout>} />
                  <Route path="/expenses" element={<MainLayout><Navigation active={active} setActive={setActive} /><Expenses /></MainLayout>} />
                  <Route path="/transactions" element={<MainLayout><Navigation active={active} setActive={setActive} /><Transactions /></MainLayout>} />
                </Route>
              </Routes>
            </ErrorBoundary>
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={true}
              draggable={true}
              pauseOnHover={true}
              theme={theme === 'light' ? 'light' : 'dark'}
            />
          </AppStyled>
        </AuthProvider>
      </Router>
    </StyledThemeProvider>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.background}; /* Ensure background color changes with theme */
  color: ${props => props.theme.color};
  main {
    flex: 1;
    background: ${props => props.theme.cardBackground};
    border: 3px solid ${props => props.theme.cardBorder};
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
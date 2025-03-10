import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Navigation({ active, setActive }) {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate(); // Use navigate hook

    const handleNavigation = (path, id) => {
        setActive(id);
        navigate(path);
    };

    return (
        <NavStyled>
            <div className="user-con">
                <div className="text">
                    <h2>{user ? user.name : 'Guest'}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => handleNavigation(item.path, item.id)}
                            className={active === item.id ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="bottom-nav">
                <li onClick={logout}>
                    {signout} Sign Out
                </li>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                </button>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: ${props => props.theme.cardBackground};
    border: 3px solid ${props => props.theme.cardBorder};
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        .text{
            h2{
                color: ${props => props.theme.color};
            }
            p{
                color: ${props => props.theme.color};
                opacity: 0.6;
            }
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: ${props => props.theme.color};
            opacity: 0.6;
            padding-left: 1rem;
            position: relative;
            i{
                color: ${props => props.theme.color};
                opacity: 0.6;
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: ${props => props.theme.color} !important;
        i{
            color: ${props => props.theme.color} !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: ${props => props.theme.chartBorder};
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav{
        li{
            display: flex;
            align-items: center;
            cursor: pointer;
            color: ${props => props.theme.color};
            opacity: 0.6;
            transition: all .4s ease-in-out;
            i{
                margin-right: 0.5rem;
            }
            &:hover{
                color: ${props => props.theme.color};
                opacity: 1;
            }
        }
        button {
            background: none;
            border: none;
            color: ${props => props.theme.color};
            cursor: pointer;
            margin-top: 1rem;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export default Navigation;
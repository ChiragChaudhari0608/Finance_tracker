import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root{
        /* Base colors */
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
        --color-red: rgb(233, 99, 112);
        
        /* Theme-specific variables (default to light theme) */
        --text-color: rgba(34, 34, 96, 0.9);
        --text-color-secondary: rgba(34, 34, 96, 0.6);
        --background-color: #f0f2f5;
        --card-background: #FCF6F9;
        --card-border: #FFFFFF;
        
        /* Tooltip specific variables */
        --tooltip-bg: #FCF6F9;
        --tooltip-color: rgba(34, 34, 96, 0.9);
        --tooltip-border: #e0e0e0;
        --tooltip-shadow: rgba(0, 0, 0, 0.1);
    }

    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: var(--text-color-secondary);
        background-color: var(--background-color);
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--text-color);
    }

    input, textarea, select {
        color: var(--text-color);
    }

    input::placeholder, textarea::placeholder {
        color: var(--text-color-secondary);
    }

    /* DatePicker custom styles */
    .react-datepicker-wrapper input {
        color: var(--text-color) !important;
    }

    .react-datepicker-wrapper input::placeholder {
        color: var(--text-color-secondary) !important;
    }

    /* Error message styles */
    .error{
        color: var(--color-red);
        background: ${props => props.theme === 'dark' ? 'rgba(233, 99, 112, 0.1)' : 'rgba(233, 99, 112, 0.05)'};
        padding: 0.5rem;
        border-radius: 5px;
        border-left: 3px solid var(--color-red);
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }

    /* Dark mode specific styles */
    [data-theme="dark"] {
        --text-color: rgba(255, 255, 255, 0.9);
        --text-color-secondary: rgba(255, 255, 255, 0.6);
        --background-color: #1e1e1e;
        --card-background: #2e2e2e;
        --card-border: #444444;
        
        /* Dark mode tooltip variables */
        --tooltip-bg: #2e2e2e;
        --tooltip-color: rgba(255, 255, 255, 0.9);
        --tooltip-border: #444444;
        --tooltip-shadow: rgba(0, 0, 0, 0.3);
    }
`;
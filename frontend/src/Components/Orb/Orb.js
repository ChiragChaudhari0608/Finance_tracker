import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';
import { ThemeContext } from '../../context/ThemeContext';

function Orb() {
    const { width, height } = useWindowSize();
    const { theme } = useContext(ThemeContext);

    const moveOrb = keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(${width}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
    `;

    const OrbStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: ${props => props.theme === 'light' ? 'linear-gradient(180deg, #F56692 0%, #F2994A 100%)' : 'linear-gradient(180deg,rgb(42, 17, 20) 0%,rgb(42, 21, 9) 100%)'};
        filter: blur(400px);
        animation: ${moveOrb} 35s alternate linear infinite;
    `;

    return (
        <OrbStyled theme={theme}></OrbStyled>
    );
}

export default Orb;
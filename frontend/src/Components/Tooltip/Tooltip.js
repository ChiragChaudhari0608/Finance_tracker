import React, { useState } from 'react';
import styled from 'styled-components';

const Tooltip = ({ icon, content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TooltipContainer 
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <IconWrapper>
        {icon}
      </IconWrapper>
      {showTooltip && content && (
        <TooltipContent>
          {content}
        </TooltipContent>
      )}
    </TooltipContainer>
  );
};

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TooltipContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--tooltip-bg);
  color: var(--tooltip-color);
  border: 1px solid var(--tooltip-border);
  padding: 8px 12px;
  border-radius: 4px;
  width: max-content;
  max-width: 250px;
  box-shadow: 0 2px 5px var(--tooltip-shadow);
  z-index: 1000;
  font-size: 0.9rem;
  margin-bottom: 8px;
  
  word-wrap: break-word;
  white-space: pre-wrap;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--tooltip-border) transparent transparent transparent;
  }
`;

export default Tooltip; 
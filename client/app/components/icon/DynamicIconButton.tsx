import styled from '@emotion/styled';
import React from 'react';

interface Props {
  size: number;
  isActive: boolean;
  onClick?: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

function DynamicIconButton({ size, isActive, onClick, activeIcon, inactiveIcon }: Props) {
  return (
    <StyledButton onClick={onClick} size={size}>
      {isActive ? (
        <IconWrapper>{activeIcon}</IconWrapper>
      ) : (
        <IconWrapper>{inactiveIcon}</IconWrapper>
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ size: number }>`
  padding: 0;
  border: none;
  background: none;
  position: relative;
  display: inline-flex;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const IconWrapper = styled.span`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

export default DynamicIconButton;

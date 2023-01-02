import React from 'react';
import styled from '@emotion/styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

function MenuExpander({ isOpen, children }: Props) {
  if (!isOpen) return <></>;

  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  right: 0;
  margin-top: 1rem;
  border-radius: 10px;
  background: white;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

export default MenuExpander;

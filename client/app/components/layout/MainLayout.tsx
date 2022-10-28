import styled from '@emotion/styled';
import React from 'react';
import Header from '../base/Header';

interface Props {
  children: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
  padding: 1rem;
`;

export default MainLayout;

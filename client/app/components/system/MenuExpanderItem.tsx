import React from 'react';
import styled from '@emotion/styled';
import { black, personal } from '../../lib/styles/palette';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

function MenuExpanderItem({ title, onClick }: Props) {
  return <Item onClick={onClick}>{title}</Item>;
}

const Item = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${black[800]};
  cursor: pointer;
  padding: 0.5rem 3rem;
  text-align: center;

  :hover {
    color: ${personal[900]};
  }
`;

export default MenuExpanderItem;

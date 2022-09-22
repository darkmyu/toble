import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { black, personal } from '../../lib/styles/palette';

interface Props {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function HeaderMenuItem({ href, onClick, children }: Props) {
  if (href) {
    return (
      <Block>
        <Link href={href}>
          <Anchor>{children}</Anchor>
        </Link>
      </Block>
    );
  }

  return (
    <Block onClick={onClick}>
      <Anchor>{children}</Anchor>
    </Block>
  );
}

const Block = styled.div`
  font-size: 0.875rem;
  color: ${black[800]};
  cursor: pointer;

  :hover {
    color: ${personal[900]};
  }
`;

const Anchor = styled.a`
  text-decoration: none;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

export default HeaderMenuItem;

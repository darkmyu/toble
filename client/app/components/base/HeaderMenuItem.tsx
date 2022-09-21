import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { black, personal } from '../../lib/styles/palette';

interface Props {
  href?: string;
  onClickLogout?: () => void;
  children: React.ReactNode;
}

function HeaderMenuItem({ href, onClickLogout, children }: Props) {
  if (href) {
    return (
      <Block>
        <Link href={href}>
          <Anchor>{children}</Anchor>
        </Link>
      </Block>
    );
  }

  return <Block onClick={onClickLogout}>{children}</Block>;
}

const Block = styled.div`
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: ${black[800]};
  cursor: pointer;

  :hover {
    color: ${personal[900]};
  }
`;

const Anchor = styled.a`
  text-decoration: none;
`;

export default HeaderMenuItem;

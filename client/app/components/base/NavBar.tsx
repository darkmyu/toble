import styled from '@emotion/styled';
import Image from 'next/image';

function NavBar() {
  return (
    <Block>
      <Responsive>
        <Image src='/assets/menu.svg' alt='menu' width='32' height='32' />
        <Image src='/assets/search.svg' alt='search' width='32' height='32' />
      </Responsive>
    </Block>
  );
}

const Block = styled.nav`
  padding-top: 6rem;
  padding-bottom: 0.625rem;

  img {
    cursor: pointer;
  }
`;

const Responsive = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
`;

export default NavBar;

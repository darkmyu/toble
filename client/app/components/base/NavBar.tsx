import styled from '@emotion/styled';
import MenuIcon from '../../assets/menu.svg';
import SearchIcon from '../../assets/search.svg';

function NavBar() {
  return (
    <Block>
      <Responsive>
        <MenuIcon />
        <SearchIcon />
      </Responsive>
    </Block>
  );
}

const Block = styled.nav`
  padding-top: 6rem;
  padding-bottom: 0.625rem;

  svg {
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

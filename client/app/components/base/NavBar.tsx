import styled from '@emotion/styled';
import MenuIcon from '../../assets/menu.svg';
import SearchIcon from '../../assets/search.svg';
import { ResponsiveParent } from '../../lib/styles/media';

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
  margin-top: 6rem;

  svg {
    cursor: pointer;
  }
`;

const Responsive = styled(ResponsiveParent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default NavBar;

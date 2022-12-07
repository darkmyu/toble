import styled from '@emotion/styled';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';
import { MenuIcon, SearchIcon } from '../icon/vector';

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
  margin-top: 2rem;
  margin-bottom: 1rem;

  svg {
    color: ${black[800]};
    cursor: pointer;
  }
`;

const Responsive = styled(ResponsiveParent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default NavBar;

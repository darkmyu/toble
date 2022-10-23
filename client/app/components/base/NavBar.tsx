import styled from '@emotion/styled';
import { ResponsiveParent } from '../../lib/styles/media';
import { black } from '../../lib/styles/palette';
import { Menu, Search } from '../icon/vector';

function NavBar() {
  return (
    <Block>
      <Responsive>
        <Menu />
        <Search />
      </Responsive>
    </Block>
  );
}

const Block = styled.nav`
  margin-top: 6rem;

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

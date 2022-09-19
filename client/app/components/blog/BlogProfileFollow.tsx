import styled from '@emotion/styled';
import { black } from '../../lib/styles/palette';

interface Props {
  favoritesCount: number;
  followersCount: number;
}

function BlogProfileFollow({ favoritesCount, followersCount }: Props) {
  return (
    <Wrapper>
      <Block>
        <Count>{favoritesCount}</Count>
        <Text>팔로우 중</Text>
      </Block>
      <Block>
        <Count>{followersCount}</Count>
        <Text>팔로워</Text>
      </Block>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding-top: 0.75rem;
  padding-bottom: 1.75rem;
  font-weight: bold;
  font-size: 0.875rem;
`;

const Block = styled.div`
  :nth-child(1) {
    margin-right: 1rem;
  }
`;

const Count = styled.span`
  color: ${black[700]};
  margin-right: 0.125rem;
`;

const Text = styled.span`
  color: ${black[500]};
`;

export default BlogProfileFollow;

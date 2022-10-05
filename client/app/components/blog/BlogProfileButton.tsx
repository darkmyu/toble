import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authModalState } from '../../atoms/authModalState';
import { userState } from '../../atoms/userState';
import { checkFollow, createFollow, deleteFollow } from '../../lib/api/followApi';
import { media } from '../../lib/styles/media';
import { personal } from '../../lib/styles/palette';

interface Props {
  bloggerId: number;
}

function BlogProfileButton({ bloggerId }: Props) {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const setAuthModal = useSetRecoilState(authModalState);
  const [following, setFollowing] = useState(false);

  useQuery(['checkFollow', bloggerId], () => checkFollow(bloggerId), {
    enabled: !!user,
    onSuccess: data => {
      setFollowing(data);
    },
  });

  const onClickFollow = () => {
    createFollow(bloggerId).then(() => {
      setFollowing(true);
    });
  };

  const onClickCancelFollow = () => {
    deleteFollow(bloggerId).then(() => setFollowing(false));
  };

  if (!user) {
    return <Button onClick={() => setAuthModal(true)}>팔로우</Button>;
  }

  if (user.id === bloggerId) {
    return <Button onClick={() => router.push('/settings')}>정보 수정</Button>;
  }

  if (following) {
    return <Button onClick={onClickCancelFollow}>팔로우 중</Button>;
  }

  return <Button onClick={onClickFollow}>팔로우</Button>;
}

const Button = styled.button`
  width: 120px;
  height: 32px;
  font-size: 0.875rem;
  font-weight: bold;
  border: none;
  color: white;
  background: ${personal[800]};
  border-radius: 20px;
  padding: 0.5rem 2rem;
  margin-left: 2.625rem;
  margin-right: 2.625rem;
  cursor: pointer;

  ${media.tablet} {
    margin-left: 0;
    margin-right: 0;
  }
`;

export default BlogProfileButton;

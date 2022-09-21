import styled from '@emotion/styled';
import Image from 'next/image';

interface Props {
  profileImageUrl: string;
  onClickDropdown: () => void;
}

function HeaderAvatar({ profileImageUrl, onClickDropdown }: Props) {
  return (
    <Avatar onClick={onClickDropdown}>
      <Image src={profileImageUrl} width={32} height={32} alt='profile' />
    </Avatar>
  );
}

const Avatar = styled.div`
  cursor: pointer;

  img {
    border-radius: 50%;
  }
`;

export default HeaderAvatar;

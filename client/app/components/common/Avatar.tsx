import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  src: string;
  href: string;
  size: number;
}

function Avatar({ src, href, size }: Props) {
  return (
    <Link href={href}>
      <Anchor>
        <Image src={src} width={size} height={size} objectFit='cover' alt='avatar' />
      </Anchor>
    </Link>
  );
}

const Anchor = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    border-radius: 50%;
  }
`;

export default Avatar;

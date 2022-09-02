import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AppleIcon from '../../assets/apple.svg';
import FacebookIcon from '../../assets/facebook.svg';
import GoogleIcon from '../../assets/google.svg';
import { black, social } from '../../lib/styles/palette';

interface Props {
  provider: 'facebook' | 'google' | 'apple';
}

function AuthSocialButton({ provider }: Props) {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  const path = `${host}/api/v1/auth/oauth/${provider}`;
  const color = social[provider];
  const providerIcons = {
    facebook: {
      icon: FacebookIcon,
    },
    google: {
      icon: GoogleIcon,
    },
    apple: {
      icon: AppleIcon,
    },
  };

  const { icon: Icon } = providerIcons[provider];

  return (
    <Block provider={provider} background={color}>
      <Anchor href={path}>
        <Icon />
      </Anchor>
    </Block>
  );
}

const Block = styled.div<{ provider: string; background: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.background};

  ${props =>
    props.provider === 'google' &&
    css`
      border: 1px solid ${black[50]};
    `}
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;
`;

export default AuthSocialButton;

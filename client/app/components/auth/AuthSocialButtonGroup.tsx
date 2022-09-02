import styled from '@emotion/styled';
import { black } from '../../lib/styles/palette';
import AuthSocialButton from './AuthSocialButton';

function AuthSocialButtonGroup() {
  return (
    <>
      <Title>SNS 로그인</Title>
      <Block>
        <AuthSocialButton provider='facebook' />
        <AuthSocialButton provider='google' />
        <AuthSocialButton provider='apple' />
      </Block>
    </>
  );
}

const Title = styled.h3`
  margin: 0;
  margin-top: 4.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: ${black[500]};
  text-align: center;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.75rem;

  div:nth-of-type(2) {
    margin-left: 4.5rem;
    margin-right: 4.5rem;
  }
`;

export default AuthSocialButtonGroup;

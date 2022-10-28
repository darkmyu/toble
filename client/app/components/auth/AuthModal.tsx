import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import CancelIcon from '../../assets/cancel.svg';
import { authModalState } from '../../atoms/authModalState';
import { black } from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import AuthSocialButtonGroup from './AuthSocialButtonGroup';

function AuthModal() {
  const [isActive, setActive] = useRecoilState(authModalState);

  if (!isActive) return <></>;

  return (
    <>
      <Block />
      <Wrapper isActive>
        <Box>
          <Top>
            <h1>Toble</h1>
            <button onClick={() => setActive(false)}>
              <CancelIcon />
            </button>
          </Top>
          <Title>나만의 블로그 이야기, 토블</Title>
          <AuthSocialButtonGroup />
        </Box>
      </Wrapper>
    </>
  );
}

const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: black;
  z-index: 200;
`;

const Wrapper = styled.div<{ isActive: boolean }>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 200;
  animation: ${props =>
    props.isActive &&
    css`
      ${transitions.popInUp} 0.5s forwards ease-in-out
    `};
`;

const Box = styled.div`
  width: 530px;
  height: 400px;
  background: white;
  border-radius: 20px;
  position: relative;
`;

const Top = styled.div`
  h1 {
    color: ${black[900]};
    text-align: center;
    margin: 0;
    font-size: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  button {
    position: absolute;
    top: 2%;
    right: 0;
    border: none;
    background: none;
    padding: 1rem;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin-bottom: 0;
  margin-top: 4.25rem;
  font-size: 1.5rem;
  text-align: center;
  color: ${black[800]};
`;

export default AuthModal;

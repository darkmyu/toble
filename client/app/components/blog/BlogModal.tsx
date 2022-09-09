import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CancelIcon from '../../assets/cancel.svg';
import { black, personal } from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import BlogModalChild from './BlogModalChild';
import { useBlogModal } from './hooks/useBlogModal';

function BlogModal() {
  const { isActive, setActive, inputs, onChangeInputs, onSubmitInputs } = useBlogModal();

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
          <Form onSubmit={onSubmitInputs}>
            <BlogModalChild
              name='url'
              title='블로그 주소'
              description='https://toble.com/blog/{블로그 주소}'
              value={inputs.url}
              onChangeInputs={onChangeInputs}
            />
            <BlogModalChild
              name='name'
              title='블로그 이름'
              description='블로그 이름은 언제든지 설정에서 변경할 수 있어요'
              value={inputs.name}
              onChangeInputs={onChangeInputs}
            />
            <Bottom>
              <Button>생성</Button>
            </Bottom>
          </Form>
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
  z-index: 100;
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
  height: 500px;
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

const Form = styled.form`
  padding-top: 6rem;
  margin-left: 5rem;
  margin-right: 5rem;

  div:nth-of-type(2) {
    margin-top: 2.25rem;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 2.25rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 96px;
  height: 32px;
  background: ${personal[900]};
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
`;

export default BlogModal;

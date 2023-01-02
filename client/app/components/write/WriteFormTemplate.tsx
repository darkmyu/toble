import React from 'react';
import styled from '@emotion/styled';
import { ResponsiveParent } from '../../lib/styles/media';
import { black, personal } from '../../lib/styles/palette';
import { useRouter } from 'next/router';

interface Props {
  buttonText: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function WriteFormTemplate({ buttonText, children, onSubmit }: Props) {
  const router = useRouter();

  const handleClickExit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Responsive>
        <Wrapper>
          {children}
          <ButtonGroup>
            <Button onClick={handleClickExit} exit>
              나가기
            </Button>
            <Button>{buttonText}</Button>
          </ButtonGroup>
        </Wrapper>
      </Responsive>
    </Form>
  );
}

const Form = styled.form`
  padding: 6.25rem 1rem;
  height: 100%;
`;

const Responsive = styled(ResponsiveParent)`
  max-width: 768px;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ButtonGroup = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  gap: 0.875rem;
  background: whitesmoke;
`;

const Button = styled.button<{ exit?: boolean }>`
  background: ${props => (props.exit ? black[400] : personal[800])};
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

export default WriteFormTemplate;

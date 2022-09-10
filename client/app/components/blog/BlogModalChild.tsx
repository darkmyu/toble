import styled from '@emotion/styled';
import React from 'react';
import { black, personal } from '../../lib/styles/palette';

interface Props {
  title: string;
  description: string;
  name: string;
  value: string;
  onChangeInputs: React.ChangeEventHandler<HTMLInputElement>;
}

function BlogModalChild({ title, description, name, value, onChangeInputs }: Props) {
  return (
    <Wrapper>
      <h1 className='title'>{title}</h1>
      <h1 className='description'>{description}</h1>
      <Input name={name} value={value} onChange={onChangeInputs} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-weight: bold;

  .title {
    margin: 0;
    font-size: 1rem;
    color: ${black[800]};
  }

  .description {
    margin: 0;
    font-size: 0.875rem;
    color: ${black[500]};
    margin-top: 0.25rem;
  }
`;

const Input = styled.input`
  margin: 0;
  margin-top: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: none;
  border-bottom: 2px solid ${black[200]};
  width: 100%;
  height: 2rem;
  font-weight: bold;
  color: ${black[700]};

  :focus {
    outline: none;
    border-bottom: 2px solid ${personal[900]};
  }
`;

export default BlogModalChild;

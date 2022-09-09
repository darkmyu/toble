import styled from '@emotion/styled';
import React from 'react';
import { black } from '../../lib/styles/palette';

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
    padding-left: 0.5rem;
    font-size: 1rem;
    color: ${black[800]};
  }

  .description {
    margin: 0;
    padding-left: 0.5rem;
    font-size: 0.875rem;
    color: ${black[500]};
    margin-top: 0.25rem;
  }
`;

const Input = styled.input`
  margin: 0;
  margin-top: 0.5rem;
  padding: 1rem;
  border: none;
  background: ${black[50]};
  width: 100%;
  border-radius: 10px;
  height: 2rem;
`;

export default BlogModalChild;

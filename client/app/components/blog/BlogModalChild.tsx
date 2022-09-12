import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { black, personal } from '../../lib/styles/palette';

interface Props {
  title: string;
  description: string;
  placeholder: string;
  errorMessage: string | null;
}

const BlogModalChild = forwardRef<HTMLInputElement, Props>(
  ({ title, description, placeholder, errorMessage, ...rest }: Props, ref) => {
    return (
      <Wrapper>
        <h1 className='title'>{title}</h1>
        <h1 className='description'>{description}</h1>
        <Input placeholder={placeholder} {...rest} ref={ref} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Wrapper>
    );
  }
);

BlogModalChild.displayName = 'BlogModalChild';

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

  ::placeholder {
    color: ${black[400]};
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.875rem;
  color: #d65d5d;
  margin-top: 0.5rem;
`;

export default BlogModalChild;

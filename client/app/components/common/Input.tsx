import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { black, personal } from '../../lib/styles/palette';

interface Props {
  placeholder: string;
  errorMessage: string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, errorMessage, ...rest }: Props, ref) => {
    return (
      <>
        <StyledInput placeholder={placeholder} ref={ref} {...rest} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </>
    );
  }
);

Input.displayName = 'Input';

const StyledInput = styled.input`
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

export default Input;

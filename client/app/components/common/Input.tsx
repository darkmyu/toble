import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { black, personal } from '../../lib/styles/palette';

interface Props {
  label?: string;
  placeholder: string;
  errorMessage: string | null;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder, errorMessage, ...rest }: Props, ref) => {
    return (
      <Wrapper>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledInput placeholder={placeholder} ref={ref} {...rest} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Wrapper>
    );
  }
);

Input.displayName = 'Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: ${black[800]};
`;

const StyledInput = styled.input`
  margin: 0;
  width: 100%;
  padding: 1rem 0.875rem;
  font-size: 1rem;
  border: 1px solid ${black[500]};
  border-radius: 4px;
  outline-color: ${personal[800]};

  ::placeholder {
    color: ${black[500]};
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.875rem;
  color: #d65d5d;
`;

export default Input;

import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { Topic } from '../../lib/api/types';

interface Props {
  topics: Topic[] | null;
  errorMessage: string | null;
}

const BlogModalSelect = forwardRef<HTMLSelectElement, Props>(
  ({ topics, errorMessage, ...rest }: Props, ref) => {
    return (
      <>
        <StyledSelect ref={ref} {...rest}>
          <option value=''>선택</option>
          {topics?.map(topic => (
            <option value={topic.id} key={topic.id}>
              {topic.name}
            </option>
          ))}
        </StyledSelect>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </>
    );
  }
);

BlogModalSelect.displayName = 'BlogModalSelect';

const StyledSelect = styled.select`
  margin-top: 1rem;
  padding: 0.5rem 0.25rem;
  width: 100%;
`;

const ErrorMessage = styled.div`
  font-size: 0.875rem;
  color: #d65d5d;
  margin-top: 0.5rem;
`;

export default BlogModalSelect;
